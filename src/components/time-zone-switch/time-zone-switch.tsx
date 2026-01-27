import { useReactConfStore } from '@/store'
import { getCurrentTimezone } from '@/utils/formatDate'
import * as Haptics from 'expo-haptics'
import { Pressable, Text } from 'react-native'

export function TimeZoneSwitch() {
  const shouldUseLocalTz = useReactConfStore(state => state.shouldUseLocalTz)
  const toggleLocalTz = useReactConfStore(state => state.toggleLocalTz)

  const handleToggleLocalTz = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    toggleLocalTz()
  }

  return (
    <Pressable
      className="bg-background-secondary h-8 justify-center self-end rounded-[40px] px-4"
      onPress={handleToggleLocalTz}
    >
      <Text className="text-foreground text-xs font-semibold">
        {shouldUseLocalTz ? getCurrentTimezone() : 'PDT'}
      </Text>
    </Pressable>
  )
}
