import { isLiquidGlassAvailable } from 'expo-glass-effect'
import { Stack } from 'expo-router'
import { Platform, Text } from 'react-native'
import { useCSSVariable } from 'uniwind'

export default function Layout() {
  const tabBarBackgroundColor = useCSSVariable('--color-background') as string

  return (
    <Stack
      screenOptions={{
        headerLargeTitle: true,
        headerLargeTitleShadowVisible: false
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Info',
          headerTitle: () =>
            Platform.OS === 'android' ? (
              <Text className="text-foreground text-xl font-bold">Info</Text>
            ) : undefined,

          headerStyle: {
            backgroundColor: isLiquidGlassAvailable()
              ? 'transparent'
              : tabBarBackgroundColor
          }
        }}
      />
    </Stack>
  )
}
