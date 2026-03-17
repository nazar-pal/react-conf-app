import { useBookmark } from '@/hooks'
import { Session } from '@/types'
import { isLiquidGlassAvailable } from 'expo-glass-effect'
import * as Haptics from 'expo-haptics'
import { Platform, StyleProp, ViewStyle } from 'react-native'
import { useCSSVariable, useUniwind } from 'uniwind'
import { HeaderButton } from '../header-button'
import { BaseBookmark } from './base-bookmark'

type BookmarkProps = {
  session: Session
  size?: 'small' | 'large'
  style?: StyleProp<ViewStyle>
}

export function Bookmark(props: BookmarkProps) {
  if (isLiquidGlassAvailable()) {
    return <GlassBookmark {...props} />
  }
  return <BaseBookmark {...props} />
}

function GlassBookmark({ session, style }: BookmarkProps) {
  const { toggleBookmark, isBookmarked } = useBookmark()
  const { theme } = useUniwind()

  const [accentColor, whiteColor, greyColor] = useCSSVariable([
    '--color-accent',
    '--color-white',
    '--color-gray-400'
  ]) as [string, string, string]

  const notSelectedIconColor = theme === 'dark' ? whiteColor : greyColor

  const handlePress = async () => {
    if (Platform.OS === 'ios') {
      if (isBookmarked(session.id)) {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning)
      } else {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
      }
    }

    await toggleBookmark(session)
  }

  const bookmarked = isBookmarked(session.id)

  return (
    <HeaderButton
      buttonProps={{
        onPress: handlePress,
        modifiers: []
      }}
      style={style}
      imageProps={{
        systemName: bookmarked ? 'bookmark.fill' : 'bookmark',
        color: bookmarked ? accentColor : notSelectedIconColor
      }}
    />
  )
}
