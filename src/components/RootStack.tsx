import { isLiquidGlassAvailable } from 'expo-glass-effect'
import { Stack } from 'expo-router/stack'
import { Platform, Text } from 'react-native'
import { useCSSVariable, useUniwind } from 'uniwind'

export function RootStack() {
  const { theme } = useUniwind()
  const tabBarBackgroundColor = useCSSVariable('--color-background') as string

  return (
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
  )
}
