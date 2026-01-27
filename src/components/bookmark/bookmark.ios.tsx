import { useBookmark } from '@/hooks'
import { Session } from '@/types'
import { frame } from '@expo/ui/swift-ui/modifiers'
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

function GlassBookmark({ session, size = 'large', style }: BookmarkProps) {
  const { toggleBookmark, isBookmarked } = useBookmark()
  const { theme } = useUniwind()

  const [accentColor, whiteColor, greyColor, backgroundColor] = useCSSVariable([
    '--color-accent',
    '--color-white',
    '--color-gray-400',
    '--color-background'
  ]) as [string, string, string, string]

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

  let imageColor = accentColor
  if (isLiquidGlassAvailable())
    imageColor = bookmarked ? whiteColor : notSelectedIconColor

  return (
    <HeaderButton
      buttonProps={{
        onPress: handlePress,
        variant: 'glassProminent',
        color: theme === 'dark' ? 'transparent' : backgroundColor
      }}
      style={style}
      imageProps={{
        systemName: bookmarked ? 'bookmark.fill' : 'bookmark',
        color: bookmarked ? accentColor : imageColor,
        ...(size === 'small' && {
          size: isLiquidGlassAvailable() ? 16 : 24,
          modifiers: [frame({ height: 20, width: 10 })]
        })
      }}
    />
  )
}
