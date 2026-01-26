import { RootStack } from '@/components/RootStack'
import { useReactConfStore } from '@/store/reactConfStore'
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider
} from '@react-navigation/native'
import { differenceInMinutes } from 'date-fns'
import * as NavigationBar from 'expo-navigation-bar'
import * as Notifications from 'expo-notifications'
import { usePathname, useRouter } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { setBackgroundColorAsync } from 'expo-system-ui'
import { useEffect } from 'react'
import { Platform } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useCSSVariable, useUniwind, withUniwind } from 'uniwind'
import '../global.css'

const StyledGestureHandlerRootView = withUniwind(GestureHandlerRootView)

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
  const router = useRouter()
  const pathName = usePathname()
  const { theme } = useUniwind()

  const { refreshData, lastRefreshed } = useReactConfStore()

  const tabBarBackgroundColor = useCSSVariable('--color-background') as string

  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setButtonStyleAsync(theme === 'light' ? 'dark' : 'light')
    }
  }, [theme])

  // Keep the root view background color in sync with the current theme
  useEffect(() => {
    setBackgroundColorAsync(tabBarBackgroundColor)
  }, [theme, tabBarBackgroundColor])

  const lastNotificationResponse = Notifications.useLastNotificationResponse()
  useEffect(() => {
    if (
      lastNotificationResponse &&
      lastNotificationResponse.actionIdentifier ===
        Notifications.DEFAULT_ACTION_IDENTIFIER
    ) {
      try {
        const url = lastNotificationResponse.notification.request.content.data
          .url as string
        if (url && pathName !== url) {
          router.push(url)
        }
      } catch {}
    }
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastNotificationResponse])

  useEffect(() => {
    const fetchData = async () => {
      if (
        !lastRefreshed ||
        differenceInMinutes(new Date(), new Date(lastRefreshed)) > 5
      ) {
        await refreshData()
      }
    }

    fetchData()
  }, [lastRefreshed, refreshData])

  return (
    <StyledGestureHandlerRootView className="flex-1">
      <ThemeProvider value={theme === 'dark' ? DarkTheme : DefaultTheme}>
        <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
        <RootStack />
      </ThemeProvider>
    </StyledGestureHandlerRootView>
  )
}
