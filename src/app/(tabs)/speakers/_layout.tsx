import { isLiquidGlassAvailable } from 'expo-glass-effect'
import { Stack, useRouter } from 'expo-router'
import { Platform, Text } from 'react-native'
import { useCSSVariable } from 'uniwind'

export default function Layout() {
  const router = useRouter()
  const [tabBarBackgroundColor, tabBarTintColor] = useCSSVariable([
    '--color-background',
    '--color-foreground'
  ]) as [string, string]

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
              <Text className="text-xl font-bold">Speakers</Text>
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
