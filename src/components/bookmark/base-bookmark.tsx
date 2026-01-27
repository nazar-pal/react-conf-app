import { useBookmark } from '@/hooks'
import { Session } from '@/types'
import MaterialCommunityIcons from '@expo/vector-icons/build/MaterialCommunityIcons'
import { SymbolView } from 'expo-symbols'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming
} from 'react-native-reanimated'
import { useCSSVariable } from 'uniwind'

export function BaseBookmark({ session }: { session: Session }) {
  const { toggleBookmark, isBookmarked } = useBookmark()
  const scale = useSharedValue(1)
  const [reactBlueLight, greyColor] = useCSSVariable([
    '--color-react-blue',
    '--color-gray-400'
  ]) as [string, string]

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }]
  }))

  const handlePress = async () => {
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
  const bookmarkColor = bookmarked ? reactBlueLight : greyColor

  return (
    <GestureDetector gesture={tapGesture}>
      <Animated.View style={animatedStyle} className="-m-2 p-2">
        <SymbolView
          name={bookmarked ? 'bookmark.fill' : 'bookmark'}
          tintColor={bookmarkColor}
          fallback={
            <MaterialCommunityIcons
              name={bookmarked ? 'bookmark' : 'bookmark-outline'}
              size={28}
              color={bookmarkColor}
            />
          }
        />
      </Animated.View>
    </GestureDetector>
  )
}
