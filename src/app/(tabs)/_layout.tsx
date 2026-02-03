import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { NativeTabs } from 'expo-router/unstable-native-tabs'
import React from 'react'
import {
  ColorValue,
  // eslint-disable-next-line react-native/split-platform-components
  DynamicColorIOS,
  ImageSourcePropType,
  Platform
} from 'react-native'

import { useBookmarkStore } from '@/store'
import { isLiquidGlassAvailable } from 'expo-glass-effect'
import { useCSSVariable } from 'uniwind'

// Todo (betomoedano): In the future we can remove this type. Learn more: https://exponent-internal.slack.com/archives/C0447EFTS74/p1758042759724779?thread_ts=1758039375.241799&cid=C0447EFTS74
type VectorIconFamily = {
  getImageSource: (
    name: string,
    size: number,
    color: ColorValue
  ) => Promise<ImageSourcePropType>
}

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
      disableTransparentOnScrollEdge={true} // Used to prevent transparent background on iOS 18 and older
    >
      <NativeTabs.Trigger name="(calendar)">
        {Platform.select({
          ios: <NativeTabs.Trigger.Icon sf="calendar" />,
          android: (
            <NativeTabs.Trigger.Icon
              src={
                <NativeTabs.Trigger.VectorIcon
                  family={MaterialCommunityIcons as VectorIconFamily}
                  name="calendar-blank"
                />
              }
              selectedColor={accentColor}
            />
          )
        })}
        <NativeTabs.Trigger.Label selectedStyle={labelSelectedStyle}>
          Calendar
        </NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="bookmarks">
        {Platform.select({
          ios: (
            <NativeTabs.Trigger.Icon
              sf="bookmark"
              selectedColor={accentColor}
            />
          ),
          android: (
            <NativeTabs.Trigger.Icon
              src={
                <NativeTabs.Trigger.VectorIcon
                  family={MaterialCommunityIcons as VectorIconFamily}
                  name="bookmark"
                />
              }
              selectedColor={accentColor}
            />
          )
        })}
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
        {Platform.select({
          ios: <NativeTabs.Trigger.Icon sf="person.2" />,
          android: (
            <NativeTabs.Trigger.Icon
              src={
                <NativeTabs.Trigger.VectorIcon
                  family={MaterialCommunityIcons as VectorIconFamily}
                  name="account-multiple"
                />
              }
              selectedColor={accentColor}
            />
          )
        })}
        <NativeTabs.Trigger.Label selectedStyle={labelSelectedStyle}>
          Speakers
        </NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="info">
        {Platform.select({
          ios: <NativeTabs.Trigger.Icon sf="map" selectedColor={accentColor} />,
          android: (
            <NativeTabs.Trigger.Icon
              src={
                <NativeTabs.Trigger.VectorIcon
                  family={MaterialCommunityIcons as VectorIconFamily}
                  name="map-outline"
                />
              }
              selectedColor={accentColor}
            />
          )
        })}
        <NativeTabs.Trigger.Label selectedStyle={labelSelectedStyle}>
          Info
        </NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  )
}
