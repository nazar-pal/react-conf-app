import { isLiquidGlassAvailable } from 'expo-glass-effect'
import { Stack, useRouter } from 'expo-router'
import { Platform, Text } from 'react-native'
import { useCSSVariable, useUniwind } from 'uniwind'

export default function Layout() {
  const router = useRouter()
  const [tabBarBackgroundColor, blackColor, whiteColor] = useCSSVariable([
    '--color-background',
    '--color-black',
    '--color-white'
  ]) as [string, string, string]

  const { theme } = useUniwind()
  const tabBarTintColor = theme === 'dark' ? whiteColor : blackColor // Will be theme-aware via CSS variable

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerStyle: {
            backgroundColor: isLiquidGlassAvailable()
              ? 'transparent'
              : tabBarBackgroundColor
          },
          headerLargeTitle: true,
          title: 'Speakers',
          headerTitle: () =>
            Platform.OS === 'android' ? (
              <Text className="text-foreground text-xl font-bold">
                Speakers
              </Text>
            ) : undefined,

          headerSearchBarOptions: {
            headerIconColor: tabBarTintColor,
            tintColor: tabBarTintColor,
            textColor: tabBarTintColor,
            hintTextColor: tabBarTintColor,
            placeholder: 'Search speakers',
            onChangeText: event => {
              router.setParams({
                q: event.nativeEvent.text
              })
            }
          }
        }}
      />
    </Stack>
  )
}
