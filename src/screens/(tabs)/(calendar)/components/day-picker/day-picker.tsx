import { ConferenceDay } from '@/consts'
import {
  Host,
  SegmentedButton,
  SingleChoiceSegmentedButtonRow,
  Text
} from '@expo/ui/jetpack-compose'
import { useWindowDimensions, View } from 'react-native'
import { useCSSVariable } from 'uniwind'

interface DayPickerProps {
  selectedDay: ConferenceDay
  onSelectDay: (day: ConferenceDay) => void
}

export function DayPicker({ selectedDay, onSelectDay }: DayPickerProps) {
  const [backgroundColor, accentColor, inactiveColorText, backgroundSecondary] =
    useCSSVariable([
      '--color-background',
      '--color-accent',
      '--color-muted',
      '--color-surface'
    ]) as [string, string, string, string]
  const width = useWindowDimensions().width

  return (
    <View className="bg-background py-3">
      <Host
        matchContents={{ vertical: true }}
        style={{
          alignSelf: 'center',
          width: width - 24 * 2
        }}
      >
        <SingleChoiceSegmentedButtonRow>
          {['Day 1', 'Day 2'].map((label, index) => (
            <SegmentedButton
              key={label}
              selected={
                selectedDay ===
                (index === 0 ? ConferenceDay.One : ConferenceDay.Two)
              }
              onClick={() =>
                onSelectDay(index === 0 ? ConferenceDay.One : ConferenceDay.Two)
              }
              colors={{
                activeContainerColor: accentColor,
                activeContentColor: backgroundColor,
                activeBorderColor: 'transparent',
                inactiveContainerColor: backgroundSecondary,
                inactiveContentColor: inactiveColorText,
                inactiveBorderColor: 'transparent'
              }}
            >
              <SegmentedButton.Label>
                <Text>{label}</Text>
              </SegmentedButton.Label>
            </SegmentedButton>
          ))}
        </SingleChoiceSegmentedButtonRow>
      </Host>

      {/* Used to prevent onPress events from being triggered in components behind the picker */}
      <View className="absolute h-[50px] w-full" pointerEvents="none" />
    </View>
  )
}
