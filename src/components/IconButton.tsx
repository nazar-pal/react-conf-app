import { StyleSheet } from 'react-native'

import { Pressable } from 'react-native-gesture-handler'
import { ThemedView, useThemeColor } from './Themed'

import { theme } from '@/theme'
import * as Haptics from 'expo-haptics'

export function IconButton({
  onPress,
  children,
  isActive
}: {
  onPress: () => void
  children: React.ReactElement
  isActive?: boolean
}) {
  const backgroundColor = useThemeColor({
    light: theme.colorWhite,
    dark: `rgba(255, 255, 255, 0.15)`
  })
  const backgroundColorActive = useThemeColor(theme.color.reactBlue)
  const shadow = useThemeColor({ light: theme.dropShadow, dark: undefined })

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    onPress()
  }

  return (
    <Pressable onPress={handlePress}>
      <ThemedView
        style={[
          styles.button,
          shadow,
          {
            backgroundColor: isActive ? backgroundColorActive : backgroundColor
          }
        ]}
      >
        {children}
      </ThemedView>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 6,
    marginHorizontal: 8,
    padding: 12
  }
})
