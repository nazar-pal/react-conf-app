import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import * as Linking from 'expo-linking'
import { StyleSheet } from 'react-native'
import { Button } from './Button'
import { ThemedText, ThemedView, useThemeColor } from './Themed'

import { theme } from '@/theme'

export function DiscordInfo() {
  const handlePress = () => {
    Linking.openURL('https://discord.gg/reactconf')
  }

  const iconColor = useThemeColor({
    light: theme.color.textSecondary.light,
    dark: theme.colorWhite
  })

  return (
    <ThemedView style={styles.container} color={theme.color.backgroundElement}>
      <MaterialIcons name="discord" size={42} color={iconColor} />
      <ThemedText style={styles.text} color={theme.color.textSecondary}>
        Chat with other folks at the conference via the dedicated Discord
        server. Fun activities? Ridesharing?
      </ThemedText>
      <Button onPress={handlePress} title="Join us on Discord" />
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: 32,
    gap: 16,
    marginBottom: 16,
    marginHorizontal: 16,
    padding: 24
  },
  text: {
    marginBottom: 8,
    textAlign: 'center'
  }
})
