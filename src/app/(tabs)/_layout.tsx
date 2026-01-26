import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import {
  Badge,
  Icon,
  Label,
  NativeTabs,
  VectorIcon
} from 'expo-router/unstable-native-tabs'
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
import { useCSSVariable, useUniwind } from 'uniwind'

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
  const { theme } = useUniwind()
  const [tintColor, blackColor, whiteColor] = useCSSVariable([
    '--color-react-blue',
    '--color-black',
    '--color-white'
  ]) as [string, string, string]
  const inactiveTintColor = theme === 'dark' ? '#FFFFFF90' : '#00000090'

  const labelSelectedStyle =
    Platform.OS === 'ios' ? { color: tintColor } : undefined

  return (
    <NativeTabs
      badgeBackgroundColor={tintColor}
      labelStyle={{
        color:
          Platform.OS === 'ios' && isLiquidGlassAvailable()
            ? DynamicColorIOS({
                light: blackColor,
                dark: whiteColor
              })
            : inactiveTintColor
      }}
      iconColor={
        Platform.OS === 'ios' && isLiquidGlassAvailable()
          ? DynamicColorIOS({
              light: blackColor,
              dark: whiteColor
            })
          : inactiveTintColor
      }
      tintColor={
        Platform.OS === 'ios'
          ? DynamicColorIOS({
              light: tintColor,
              dark: tintColor
            })
          : inactiveTintColor
      }
      labelVisibilityMode="labeled"
      indicatorColor={tintColor + '25'}
      disableTransparentOnScrollEdge={true} // Used to prevent transparent background on iOS 18 and older
    >
      <NativeTabs.Trigger name="(calendar)">
        {Platform.select({
          ios: <Icon sf="calendar" />,
          android: (
            <Icon
              src={
                <VectorIcon
                  family={MaterialCommunityIcons as VectorIconFamily}
                  name="calendar-blank"
                />
              }
              selectedColor={tintColor}
            />
          )
        })}
        <Label selectedStyle={labelSelectedStyle}>Calendar</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="bookmarks">
        {Platform.select({
          ios: <Icon sf="bookmark" selectedColor={tintColor} />,
          android: (
            <Icon
              src={
                <VectorIcon
                  family={MaterialCommunityIcons as VectorIconFamily}
                  name="bookmark"
                />
              }
              selectedColor={tintColor}
            />
          )
        })}
        <Label selectedStyle={labelSelectedStyle}>Bookmarked</Label>
        {hasBookmarks && !isLiquidGlassAvailable() && (
          <Badge>{bookmarks.length.toString()}</Badge>
        )}
      </NativeTabs.Trigger>
      <NativeTabs.Trigger
        name="speakers"
        role={isLiquidGlassAvailable() ? 'search' : undefined}
      >
        {Platform.select({
          ios: <Icon sf="person.2" />,
          android: (
            <Icon
              src={
                <VectorIcon
                  family={MaterialCommunityIcons as VectorIconFamily}
                  name="account-multiple"
                />
              }
              selectedColor={tintColor}
            />
          )
        })}
        <Label selectedStyle={labelSelectedStyle}>Speakers</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="info">
        {Platform.select({
          ios: <Icon sf="map" selectedColor={tintColor} />,
          android: (
            <Icon
              src={
                <VectorIcon
                  family={MaterialCommunityIcons as VectorIconFamily}
                  name="map-outline"
                />
              }
              selectedColor={tintColor}
            />
          )
        })}
        <Label selectedStyle={labelSelectedStyle}>Info</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  )
}
