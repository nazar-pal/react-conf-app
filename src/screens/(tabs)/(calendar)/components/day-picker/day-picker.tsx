import { GlassView } from '@/components/styled/expo-glass-effect'
import { ConferenceDay } from '@/consts'
import { SegmentedControl } from '@expo/ui/community/segmented-control'
import { Platform, useWindowDimensions, View } from 'react-native'
import { useCSSVariable } from 'uniwind'

interface DayPickerProps {
  selectedDay: ConferenceDay
  onSelectDay: (day: ConferenceDay) => void
}

const values = ['Day 1', 'Day 2']

export function DayPicker({ selectedDay, onSelectDay }: DayPickerProps) {
  const accentColor = useCSSVariable('--color-accent') as string
  const width = useWindowDimensions().width
  const selectedIndex = selectedDay === ConferenceDay.One ? 0 : 1

  const handleValueChange = (value: string) =>
    onSelectDay(value === 'Day 1' ? ConferenceDay.One : ConferenceDay.Two)

  if (Platform.OS === 'ios') {
    return (
      <View className="pb-6">
        <GlassView className="mx-4 mt-4 h-8 w-auto rounded-[80px]">
          <SegmentedControl
            values={values}
            selectedIndex={selectedIndex}
            onValueChange={handleValueChange}
            style={{ height: 31 }}
          />
        </GlassView>
      </View>
    )
  }

  return (
    <View className="bg-background py-3">
      <SegmentedControl
        values={values}
        selectedIndex={selectedIndex}
        onValueChange={handleValueChange}
        tintColor={accentColor}
        style={{ alignSelf: 'center', width: width - 24 * 2 }}
      />
      {/* Prevents onPress events from being triggered in components behind the picker */}
      <View className="absolute h-12.5 w-full" pointerEvents="none" />
    </View>
  )
}
