import { useReactConfStore } from '@/store'
import { getCurrentTimezone } from '@/utils/formatDate'
import {
  Button,
  ContextMenu,
  Host,
  HStack,
  Image,
  Text
} from '@expo/ui/swift-ui'
import { buttonStyle, frame } from '@expo/ui/swift-ui/modifiers'
import { isLiquidGlassAvailable } from 'expo-glass-effect'
import * as Haptics from 'expo-haptics'
import { useUniwind } from 'uniwind'

const options = ['PDT (Venue)', `${getCurrentTimezone()} (Local)`]

export function TimeZoneSwitch() {
  const shouldUseLocalTz = useReactConfStore(state => state.shouldUseLocalTz)
  const toggleLocalTz = useReactConfStore(state => state.toggleLocalTz)
  const { theme } = useUniwind()

  const selectedIndex = shouldUseLocalTz ? 1 : 0

  const handleToggleLocalTz = (newIndex: number) => {
    if (selectedIndex !== newIndex) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
      toggleLocalTz()
    }
  }

  return (
    <Host style={{ height: 34, width: 94 }}>
      <ContextMenu
        modifiers={[
          buttonStyle(isLiquidGlassAvailable() ? 'glass' : 'bordered')
        ]}
      >
        <ContextMenu.Items>
          <Button
            systemImage={selectedIndex === 0 ? 'checkmark' : undefined}
            onPress={() => handleToggleLocalTz(0)}
          >
            {options[0]}
          </Button>
          <Button
            systemImage={selectedIndex === 1 ? 'checkmark' : undefined}
            onPress={() => handleToggleLocalTz(1)}
          >
            {options[1]}
          </Button>
        </ContextMenu.Items>
        <ContextMenu.Trigger>
          <HStack modifiers={[frame({ width: 50 })]} spacing={8}>
            <Text
              weight="semibold"
              size={10}
              color={
                isLiquidGlassAvailable()
                  ? 'primary'
                  : theme === 'dark'
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
