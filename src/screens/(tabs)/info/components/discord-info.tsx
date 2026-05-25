import { Button } from '@/components/button'
import { MaterialIcons } from '@/components/styled/react-native-vector-icons-material-icons'
import * as Linking from 'expo-linking'
import { Text, View } from 'react-native'

export function DiscordInfo() {
  const handlePress = () => {
    Linking.openURL('https://discord.gg/reactconf')
  }

  return (
    <View className="bg-overlay mx-4 mb-4 items-center gap-4 rounded-4xl p-6">
      <MaterialIcons
        name="discord"
        size={42}
        colorClassName="accent-info-emphasis"
      />
      <Text className="text-muted mb-2 text-center text-base">
        Chat with other folks at the conference via the dedicated Discord
        server. Fun activities? Ridesharing?
      </Text>
      <Button onPress={handlePress} title="Join us on Discord" />
    </View>
  )
}
