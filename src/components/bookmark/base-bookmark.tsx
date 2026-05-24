import { MaterialCommunityIcons, SymbolView } from '@/components/styled'
import { useBookmark } from '@/hooks'
import { Session } from '@/types'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming
} from 'react-native-reanimated'

export function BaseBookmark({ session }: { session: Session }) {
  const { toggleBookmark, isBookmarked } = useBookmark()
  const scale = useSharedValue(1)

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }]
  }))

  const handlePress = async () => {
    // eslint-disable-next-line react-hooks/immutability -- reanimated shared value
    scale.value = withSequence(
      withTiming(0.8, { duration: 100 }),
      withTiming(1, { duration: 100 })
    )
    await toggleBookmark(session)
  }

  const tapGesture = Gesture.Tap()
    .onStart(() => {
      handlePress()
    })
    .runOnJS(true)

  const bookmarked = isBookmarked(session.id)
  const bookmarkColorClassName = bookmarked ? 'accent-accent' : 'accent-muted'

  return (
    <GestureDetector gesture={tapGesture}>
      <Animated.View style={animatedStyle} className="-m-2 p-2">
        <SymbolView
          name={bookmarked ? 'bookmark.fill' : 'bookmark'}
          tintColorClassName={bookmarkColorClassName}
          fallback={
            <MaterialCommunityIcons
              name={bookmarked ? 'bookmark' : 'bookmark-outline'}
              size={28}
              colorClassName={bookmarkColorClassName}
            />
          }
        />
      </Animated.View>
    </GestureDetector>
  )
}
