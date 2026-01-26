import * as Haptics from 'expo-haptics'
import React from 'react'
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

interface GestureContainerProps {
  children: React.ReactNode
  width: number
  height: number
  maxAngle?: number
  onFlip?: () => void
}

export function GestureContainer({
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
