import { useReactConfStore } from '@/store/reactConfStore'
import { getCurrentTimezone } from '@/utils/formatDate'
import {
  ContextMenu,
  Host,
  HStack,
  Image,
  Picker,
  Text
} from '@expo/ui/swift-ui'
import { buttonStyle, frame } from '@expo/ui/swift-ui/modifiers'
import { isLiquidGlassAvailable } from 'expo-glass-effect'
import * as Haptics from 'expo-haptics'
import { StyleSheet, useColorScheme } from 'react-native'

const options = ['PDT (Venue)', `${getCurrentTimezone()} (Local)`]

export function TimeZoneSwitch() {
  const shouldUseLocalTz = useReactConfStore(state => state.shouldUseLocalTz)
  const toggleLocalTz = useReactConfStore(state => state.toggleLocalTz)
  const isDarkMode = useColorScheme() === 'dark'

  const selectedIndex = shouldUseLocalTz ? 1 : 0

  const handleToggleLocalTz = (newIndex: number) => {
    if (selectedIndex !== newIndex) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
      toggleLocalTz()
    }
  }

  return (
    <Host style={styles.container}>
      <ContextMenu
        modifiers={[
          buttonStyle(isLiquidGlassAvailable() ? 'glass' : 'bordered')
        ]}
      >
        <ContextMenu.Items>
          <Picker
            selectedIndex={selectedIndex}
            options={options}
            onOptionSelected={({ nativeEvent: { index } }) =>
              handleToggleLocalTz(index)
            }
          />
        </ContextMenu.Items>
        <ContextMenu.Trigger>
          <HStack modifiers={[frame({ width: 50 })]} spacing={8}>
            <Text
              weight="semibold"
              size={10}
              color={
                isLiquidGlassAvailable()
                  ? 'primary'
                  : isDarkMode
                    ? 'white'
                    : 'black'
              }
            >
              {shouldUseLocalTz ? getCurrentTimezone().slice(0, 3) : 'PDT'}
            </Text>
            <Image
              systemName="chevron.down"
              size={10}
              color={isLiquidGlassAvailable() ? 'primary' : 'gray'}
            />
          </HStack>
        </ContextMenu.Trigger>
      </ContextMenu>
    </Host>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 34,
    width: 94
  }
})
