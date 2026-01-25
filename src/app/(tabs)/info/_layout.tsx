import { ThemedText, useThemeColor } from '@/components/Themed'
import { theme } from '@/theme'
import { isLiquidGlassAvailable } from 'expo-glass-effect'
import { Stack } from 'expo-router'
import { Platform } from 'react-native'

export default function Layout() {
  const tabBarBackgroundColor = useThemeColor(theme.color.background)

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
              <ThemedText className="text-xl font-bold">Info</ThemedText>
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
