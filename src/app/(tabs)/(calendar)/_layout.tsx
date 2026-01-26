import { TimeZoneSwitch } from '@/components/TimeZoneSwitch'
import { isLiquidGlassAvailable } from 'expo-glass-effect'
import { Image } from 'expo-image'
import { Stack } from 'expo-router'
import { Platform, useColorScheme } from 'react-native'
import { useCSSVariable } from 'uniwind'

const lightImageSource = require('@/assets/images/conf.png')
const darkImageSource = require('@/assets/images/conf-dark.png')

export default function Layout() {
  const tabBarBackgroundColor = useCSSVariable('--color-background') as string
  const isDarkMode = useColorScheme() === 'dark'
  const imageSource = isDarkMode ? darkImageSource : lightImageSource
  return (
    <Stack
      screenOptions={{
        headerLargeTitle: true,
        headerLargeTitleShadowVisible: false,
        headerShadowVisible: false
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: Platform.OS === 'ios' ? 'Calendar' : '',
          headerStyle: {
            backgroundColor: isLiquidGlassAvailable()
              ? 'transparent'
              : tabBarBackgroundColor
          },
          headerLeft: () => (
            <Image source={imageSource} style={{ height: 20, width: 72 }} />
          ),
          headerRight: () => <TimeZoneSwitch />
        }}
      />
    </Stack>
  )
}
