import MaterialCommunityIcons from '@react-native-vector-icons/material-design-icons/static'
import { Pressable } from 'react-native-gesture-handler'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'
import { useCSSVariable } from 'uniwind'
import type { HeaderButtonProps } from './types'

const sfToMaterialIcon: Record<string, string> = {
  xmark: 'close',
  'bookmark.fill': 'bookmark',
  bookmark: 'bookmark-outline'
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

export function HeaderButton({ imageProps, buttonProps }: HeaderButtonProps) {
  const scale = useSharedValue(1)
  const mutedColor = useCSSVariable('--color-muted') as string

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }]
  }))

  return (
    <AnimatedPressable
      hitSlop={20}
      onPress={buttonProps?.onPress}
      onPressIn={() => {
        // eslint-disable-next-line react-hooks/immutability -- reanimated shared value
        scale.value = withTiming(0.8)
      }}
      onPressOut={() => {
        // eslint-disable-next-line react-hooks/immutability -- reanimated shared value
        scale.value = withTiming(1)
      }}
      style={animatedStyle}
    >
      <MaterialCommunityIcons
        name={
          (sfToMaterialIcon[imageProps?.systemName ?? ''] ?? 'close') as any
        }
        size={24}
        color={imageProps?.color || mutedColor}
      />
    </AnimatedPressable>
  )
}
