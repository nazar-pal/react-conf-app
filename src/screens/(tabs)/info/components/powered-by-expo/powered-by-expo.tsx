import * as Application from 'expo-application'
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'
import { GestureContainer } from './gesture-container'
import { HolographicGradient } from './holographic-gradient'

const CONTAINER_SIZE = 160
const SHADER_SIZE = 140
const LOGO_SIZE = 120
const FLIPPED_CONTENT_SIZE = 60

const SHADER_OFFSET = (CONTAINER_SIZE - SHADER_SIZE) / 2
const LOGO_OFFSET = (CONTAINER_SIZE - LOGO_SIZE) / 2
const BORDER_RADIUS = SHADER_SIZE / 2

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
