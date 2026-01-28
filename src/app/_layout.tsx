import { RootStack } from '@/components/root-stack'
import { useAutoRefreshData, useNotificationNavigation } from '@/hooks'
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider
} from '@react-navigation/native'
import * as NavigationBar from 'expo-navigation-bar'
import * as Notifications from 'expo-notifications'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { setBackgroundColorAsync } from 'expo-system-ui'
import { useEffect } from 'react'
import { Platform } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaListener } from 'react-native-safe-area-context'
import { Uniwind, useCSSVariable, useUniwind } from 'uniwind'
import '../global.css'

SplashScreen.setOptions({ duration: 200, fade: true })

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true
  })
})

export default function Layout() {
  const { theme } = useUniwind()

  useEffect(() => {
    if (Platform.OS === 'android')
      NavigationBar.setButtonStyleAsync(theme === 'light' ? 'dark' : 'light')
  }, [theme])

  // Keep the root view background color in sync with the current theme
  const tabBarBackgroundColor = useCSSVariable('--color-background') as string
  useEffect(() => {
    setBackgroundColorAsync(tabBarBackgroundColor)
  }, [theme, tabBarBackgroundColor])

  useNotificationNavigation()
  useAutoRefreshData()

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaListener
        onChange={({ insets }) => {
          Uniwind.updateInsets(insets)
        }}
      >
        <ThemeProvider value={theme === 'dark' ? DarkTheme : DefaultTheme}>
          <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
          <RootStack />
        </ThemeProvider>
      </SafeAreaListener>
    </GestureHandlerRootView>
  )
}
