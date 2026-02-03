import { ConferenceDay } from '@/consts'
import { Host, Picker, Text } from '@expo/ui/swift-ui'
import { pickerStyle, tag } from '@expo/ui/swift-ui/modifiers'
import { GlassView } from 'expo-glass-effect'
import { View } from 'react-native'

interface DayPickerProps {
  selectedDay: ConferenceDay
  onSelectDay: (day: ConferenceDay) => void
}

const options = ['Day 1', 'Day 2']

export function DayPicker({ selectedDay, onSelectDay }: DayPickerProps) {
  return (
    <View style={{ paddingBottom: 24 }}>
      <GlassView
        style={{
          borderRadius: 80,
          height: 32,
          marginHorizontal: 16,
          marginTop: 16,
          width: 'auto'
        }}
      >
        <Host
          matchContents
          style={{
            height: 31 // fixed height to prevent jumping
          }}
        >
          <Picker
            modifiers={[pickerStyle('segmented')]}
            selection={selectedDay === ConferenceDay.One ? 0 : 1}
            onSelectionChange={selection => {
              onSelectDay(
                selection === 0 ? ConferenceDay.One : ConferenceDay.Two
              )
            }}
          >
            {options.map((option, index) => (
              <Text key={option} modifiers={[tag(index)]}>
                {option}
              </Text>
            ))}
          </Picker>
        </Host>
      </GlassView>
    </View>
  )
}
