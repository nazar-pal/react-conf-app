import { Button } from '@/components/button'
import { MaterialIcons } from '@/components/styled'
import * as Linking from 'expo-linking'
import { Text, View } from 'react-native'

export function DiscordInfo() {
  const handlePress = () => {
    Linking.openURL('https://discord.gg/reactconf')
  }

  return (
    <View className="bg-overlay mx-4 mb-4 items-center gap-4 rounded-[32px] p-6">
      <MaterialIcons
        name="discord"
        size={42}
        colorClassName="accent-info-emphasis"
      />
      <Text className="text-muted mb-2 text-center text-base font-medium">
        Chat with other folks at the conference via the dedicated Discord
        server. Fun activities? Ridesharing?
      </Text>
      <Button onPress={handlePress} title="Join us on Discord" />
    </View>
  )
}
