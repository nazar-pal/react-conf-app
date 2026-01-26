import * as Application from 'expo-application'
import * as Haptics from 'expo-haptics'
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
  Easing,
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'
import { scheduleOnRN } from 'react-native-worklets'
import { HolographicGradient } from './HolographicGradient'

const CONTAINER_SIZE = 160
const SHADER_SIZE = 140
const LOGO_SIZE = 120
const FLIPPED_CONTENT_SIZE = 60

const SHADER_OFFSET = (CONTAINER_SIZE - SHADER_SIZE) / 2
const LOGO_OFFSET = (CONTAINER_SIZE - LOGO_SIZE) / 2
const BORDER_RADIUS = SHADER_SIZE / 2

interface GestureContainerProps {
  children: React.ReactNode
  width: number
  height: number
  maxAngle?: number
  onFlip?: () => void
}

function GestureContainer({
  children,
  width,
  height,
  maxAngle = 10,
  onFlip
}: GestureContainerProps) {
  const rotateX = useSharedValue(0)
  const rotateY = useSharedValue(0)
  const flipRotation = useSharedValue(0)
  const isFlipped = useSharedValue(false)

  const triggerHeavyHaptic = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
  }

  const handleFlip = () => {
    'worklet'
    isFlipped.value = !isFlipped.value
    flipRotation.value = withTiming(isFlipped.value ? 360 : 0, {
      duration: 600,
      easing: Easing.inOut(Easing.cubic)
    })
    if (onFlip) {
      scheduleOnRN(onFlip)
    }
    scheduleOnRN(triggerHeavyHaptic)
  }

  const interpolateRotation = (
    value: number,
    size: number,
    isReverse = false
  ) => {
    'worklet'
    return interpolate(
      value,
      [0, size],
      isReverse ? [maxAngle, -maxAngle] : [-maxAngle, maxAngle],
      Extrapolation.CLAMP
    )
  }

  // Double-tap gesture for flip animation
  const doubleTapGesture = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => {
      handleFlip()
    })

  const panGesture = Gesture.Pan()
    .onBegin(event => {
      const x = event.x || 0
      const y = event.y || 0
      rotateX.value = withTiming(interpolateRotation(y, height, true))
      rotateY.value = withTiming(interpolateRotation(x, width))
    })
    .onUpdate(event => {
      const x = event.x || 0
      const y = event.y || 0
      rotateX.value = interpolateRotation(y, height, true)
      rotateY.value = interpolateRotation(x, width)
    })
    .onFinalize(() => {
      rotateX.value = withTiming(0)
      rotateY.value = withTiming(0)
    })

  // Combine gestures
  const gesture = Gesture.Simultaneous(doubleTapGesture, panGesture)

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { perspective: 300 },
        { rotateX: `${rotateX.value}deg` },
        { rotateY: `${rotateY.value + flipRotation.value}deg` }
      ]
    }
  })

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        className="bg-transparent"
        style={[{ height, width }, rStyle]}
      >
        {children}
      </Animated.View>
    </GestureDetector>
  )
}

export function PoweredByExpo() {
  const [isFlipped, setIsFlipped] = React.useState(false)
  const overlayOpacity = useSharedValue(0)

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
    overlayOpacity.value = withTiming(isFlipped ? 0 : 1, {
      duration: 300,
      easing: Easing.inOut(Easing.cubic)
    })
  }

  const overlayAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: overlayOpacity.value
    }
  })

  return (
    <View className="z-1 flex-1 items-center justify-center bg-transparent">
      <GestureContainer
        width={CONTAINER_SIZE}
        height={CONTAINER_SIZE}
        maxAngle={15}
        onFlip={handleFlip}
      >
        <View className="relative h-[160px] w-[160px] items-center justify-center bg-transparent">
          <View
            className="absolute items-center justify-center"
            style={{ height: CONTAINER_SIZE, width: CONTAINER_SIZE }}
          >
            <View
              className="absolute overflow-hidden border-2 border-black"
              style={{
                borderRadius: BORDER_RADIUS,
                height: SHADER_SIZE,
                left: SHADER_OFFSET,
                top: SHADER_OFFSET,
                width: SHADER_SIZE
              }}
            >
              <HolographicGradient />
            </View>
            <Image
              source={require('@/assets/images/sub-expo.png')}
              style={{
                resizeMode: 'contain',
                height: LOGO_SIZE,
                left: LOGO_OFFSET,
                position: 'absolute',
                top: LOGO_OFFSET,
                width: LOGO_SIZE
              }}
            />
          </View>
          <Animated.View
            className="items-center justify-center"
            style={[overlayAnimatedStyle, StyleSheet.absoluteFillObject]}
          >
            <View
              className="items-center justify-center bg-black"
              style={{
                borderRadius: FLIPPED_CONTENT_SIZE / 2,
                height: FLIPPED_CONTENT_SIZE,
                width: FLIPPED_CONTENT_SIZE
              }}
            >
              <Text className="text-center text-sm font-semibold text-white">
                v{Application.nativeApplicationVersion} (
                {Application.nativeBuildVersion}23)
              </Text>
            </View>
          </Animated.View>
        </View>
      </GestureContainer>
    </View>
  )
}
