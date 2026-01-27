import { ConferenceDay } from '@/consts'
import { Picker } from '@expo/ui/jetpack-compose'
import { Platform, useWindowDimensions, View } from 'react-native'
import { useCSSVariable } from 'uniwind'

interface DayPickerProps {
  selectedDay: ConferenceDay
  onSelectDay: (day: ConferenceDay) => void
}

export function DayPicker({ selectedDay, onSelectDay }: DayPickerProps) {
  const [
    backgroundColor,
    tintColor,
    textColor,
    textReverseColor,
    inactiveColorText,
    backgroundSecondary
  ] = useCSSVariable([
    '--color-background',
    '--color-react-blue',
    '--color-foreground',
    '--color-text-reverse',
    '--color-text-secondary',
    '--color-background-secondary'
  ]) as [string, string, string, string, string, string]
  const width = useWindowDimensions().width

  // Platform-specific text color logic
  const colorText = Platform.select({
    ios: textColor,
    android: textReverseColor
  })

  return (
    <View className="bg-background py-1">
      <Picker
        options={['Day 1', 'Day 2']}
        selectedIndex={selectedDay === ConferenceDay.One ? 0 : 1}
        onOptionSelected={({ nativeEvent: { index } }) => {
          onSelectDay(index === 0 ? ConferenceDay.One : ConferenceDay.Two)
        }}
        color={backgroundColor}
        elementColors={{
          activeContainerColor: tintColor,
          activeContentColor: colorText,
          activeBorderColor: 'transparent',
          inactiveContainerColor: backgroundSecondary,
          inactiveContentColor: inactiveColorText,
          inactiveBorderColor: 'transparent'
        }}
        variant="segmented"
        style={{
          alignSelf: 'center',
          height: 40,
          paddingVertical: 24,
          width: width - 24 * 2
        }}
      />

      {/* Used to prevent onPress events from being triggered in components behind the picker */}
      <View className="absolute h-[50px] w-full" pointerEvents="none" />
    </View>
  )
}
