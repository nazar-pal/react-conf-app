import { useBookmark } from '@/hooks/useBookmark'
import { Session } from '@/types'
import { frame } from '@expo/ui/swift-ui/modifiers'
import { isLiquidGlassAvailable } from 'expo-glass-effect'
import * as Haptics from 'expo-haptics'
import { useMemo } from 'react'
import { Platform, StyleProp, ViewStyle } from 'react-native'
import { useCSSVariable, useUniwind } from 'uniwind'
import { BaseBookmark } from './BaseBookmark'
import { HeaderButton } from './header-button'

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

  const [tintColor, whiteColor, greyColor, backgroundLight] = useCSSVariable([
    '--color-react-blue',
    '--color-white',
    '--color-grey',
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
  const backgroundColor = theme === 'dark' ? '#646469' : backgroundLight

  const imageColor = useMemo(() => {
    if (isLiquidGlassAvailable()) {
      return bookmarked ? whiteColor : notSelectedIconColor
    }
    return tintColor
  }, [tintColor, bookmarked, whiteColor, notSelectedIconColor])

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
        color: bookmarked ? tintColor : imageColor,
        ...(size === 'small' && {
          size: isLiquidGlassAvailable() ? 16 : 24,
          modifiers: [frame({ height: 20, width: 10 })]
        })
      }}
    />
  )
}
