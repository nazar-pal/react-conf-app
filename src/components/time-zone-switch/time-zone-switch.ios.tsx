import { useReactConfStore } from '@/store'
import { getCurrentTimezone } from '@/utils/formatDate'
import { Button, Host, Menu } from '@expo/ui/swift-ui'
import {
  buttonStyle,
  controlSize,
  foregroundStyle
} from '@expo/ui/swift-ui/modifiers'
import { isLiquidGlassAvailable } from 'expo-glass-effect'
import * as Haptics from 'expo-haptics'

const options = ['PDT (Venue)', `${getCurrentTimezone()} (Local)`]

export function TimeZoneSwitch() {
  const shouldUseLocalTz = useReactConfStore(state => state.shouldUseLocalTz)
  const toggleLocalTz = useReactConfStore(state => state.toggleLocalTz)

  const selectedIndex = shouldUseLocalTz ? 1 : 0

  const handleToggleLocalTz = (newIndex: number) => {
    if (selectedIndex !== newIndex) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
      toggleLocalTz()
    }
  }

  return (
    <Host style={{ height: 34, width: 94 }}>
      <Menu
        modifiers={[
          ...(isLiquidGlassAvailable() ? [] : [buttonStyle('bordered')]),
          controlSize('mini'),
          foregroundStyle({ type: 'hierarchical', style: 'primary' })
        ]}
        label={shouldUseLocalTz ? getCurrentTimezone().slice(0, 3) : 'PDT'}
        systemImage="chevron.down"
      >
        <Button
          systemImage={selectedIndex === 0 ? 'checkmark' : undefined}
          onPress={() => handleToggleLocalTz(0)}
          label={options[0]}
        />
        <Button
          systemImage={selectedIndex === 1 ? 'checkmark' : undefined}
          onPress={() => handleToggleLocalTz(1)}
          label={options[1]}
        />
      </Menu>
    </Host>
  )
}
