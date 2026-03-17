import { NativeTabs } from 'expo-router/unstable-native-tabs'
import {
  // eslint-disable-next-line react-native/split-platform-components
  DynamicColorIOS,
  Platform
} from 'react-native'

import { useBookmarkStore } from '@/store'
import { isLiquidGlassAvailable } from 'expo-glass-effect'
import { useCSSVariable } from 'uniwind'

export default function TabLayout() {
  const bookmarks = useBookmarkStore(state => state.bookmarks)
  const hasBookmarks = bookmarks.length > 0
  const [accentColor, blackColor, whiteColor, accentSoftColor, bgColor] =
    useCSSVariable([
      '--color-accent',
      '--color-black',
      '--color-white',
      '--color-accent-soft',
      '--color-background'
    ]) as [string, string, string, string, string]

  const labelSelectedStyle =
    Platform.OS === 'ios' ? { color: accentColor } : undefined

  return (
    <NativeTabs
      backgroundColor={Platform.OS === 'android' ? bgColor : undefined}
      badgeBackgroundColor={accentColor}
      labelStyle={{
        color:
          Platform.OS === 'ios' && isLiquidGlassAvailable()
            ? DynamicColorIOS({
                light: blackColor,
                dark: whiteColor
              })
            : accentSoftColor
      }}
      iconColor={
        Platform.OS === 'ios' && isLiquidGlassAvailable()
          ? DynamicColorIOS({
              light: blackColor,
              dark: whiteColor
            })
          : accentSoftColor
      }
      tintColor={Platform.OS === 'ios' ? accentColor : accentSoftColor}
      labelVisibilityMode="labeled"
      indicatorColor={accentColor + '25'}
      disableTransparentOnScrollEdge={true}
      minimizeBehavior="onScrollDown"
    >
      <NativeTabs.Trigger name="(calendar)">
        <NativeTabs.Trigger.Icon
          sf="calendar"
          md="calendar_today"
          selectedColor={accentColor}
        />
        <NativeTabs.Trigger.Label selectedStyle={labelSelectedStyle}>
          Calendar
        </NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="bookmarks" role="bookmarks">
        <NativeTabs.Trigger.Icon
          sf={{ default: 'bookmark', selected: 'bookmark.fill' }}
          md="bookmark"
          selectedColor={accentColor}
        />
        <NativeTabs.Trigger.Label selectedStyle={labelSelectedStyle}>
          Bookmarked
        </NativeTabs.Trigger.Label>
        {hasBookmarks && !isLiquidGlassAvailable() && (
          <NativeTabs.Trigger.Badge>
            {bookmarks.length.toString()}
          </NativeTabs.Trigger.Badge>
        )}
      </NativeTabs.Trigger>
      <NativeTabs.Trigger
        name="speakers"
        role={isLiquidGlassAvailable() ? 'search' : undefined}
      >
        <NativeTabs.Trigger.Icon
          sf="person.2"
          md="people"
          selectedColor={accentColor}
        />
        <NativeTabs.Trigger.Label selectedStyle={labelSelectedStyle}>
          Speakers
        </NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="info">
        <NativeTabs.Trigger.Icon
          sf="map"
          md="map"
          selectedColor={accentColor}
        />
        <NativeTabs.Trigger.Label selectedStyle={labelSelectedStyle}>
          Info
        </NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  )
}
