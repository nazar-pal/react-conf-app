import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider
} from '@react-navigation/native'
import { differenceInMinutes } from 'date-fns'
import { isLiquidGlassAvailable } from 'expo-glass-effect'
import * as NavigationBar from 'expo-navigation-bar'
import * as Notifications from 'expo-notifications'
import { usePathname, useRouter } from 'expo-router'
import { Stack } from 'expo-router/stack'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { setBackgroundColorAsync } from 'expo-system-ui'
import { useEffect } from 'react'
import { Platform, Text } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useCSSVariable, useUniwind, withUniwind } from 'uniwind'

import '../global.css'

import { useReactConfStore } from '@/store/reactConfStore'

const StyledGestureHandlerRootView = withUniwind(GestureHandlerRootView)

SplashScreen.setOptions({
  duration: 200,
  fade: true
})

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

        <Stack>
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="talk/[talkId]"
            options={{
              headerTransparent: Platform.OS === 'ios' ? true : false,
              headerLargeTitle: false,
              title: '',
              presentation:
                Platform.OS === 'ios'
                  ? isLiquidGlassAvailable()
                    ? 'formSheet'
                    : 'modal'
                  : 'modal',
              sheetGrabberVisible: true,
              sheetAllowedDetents: [0.8],
              sheetInitialDetentIndex: 0,
              contentStyle: {
                backgroundColor: isLiquidGlassAvailable()
                  ? 'transparent'
                  : tabBarBackgroundColor
              },
              headerStyle: {
                backgroundColor:
                  Platform.OS === 'ios' ? 'transparent' : tabBarBackgroundColor
              },
              headerBlurEffect: isLiquidGlassAvailable()
                ? undefined
                : theme === 'dark'
                  ? 'dark'
                  : 'light'
            }}
          />
          <Stack.Screen
            name="speaker/[speakerId]"
            options={{
              presentation: 'modal',
              headerStyle: {
                backgroundColor:
                  Platform.OS === 'ios' ? 'transparent' : tabBarBackgroundColor
              },
              headerTransparent: Platform.OS === 'ios' ? true : false,
              headerTitleAlign: 'center',
              headerBlurEffect: isLiquidGlassAvailable()
                ? undefined
                : theme === 'dark'
                  ? 'dark'
                  : 'light',
              headerTitle: Platform.select({
                android: props => (
                  <Text className="text-text text-2xl font-bold">
                    {props.children}
                  </Text>
                ),
                default: undefined
              })
            }}
          />
        </Stack>
      </ThemeProvider>
    </StyledGestureHandlerRootView>
  )
}
