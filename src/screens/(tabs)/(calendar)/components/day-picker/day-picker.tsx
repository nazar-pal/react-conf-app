import { ConferenceDay } from '@/consts'
import { Platform, useWindowDimensions, View, Pressable, Text } from 'react-native'
import { useCSSVariable } from 'uniwind'

interface DayPickerProps {
  selectedDay: ConferenceDay
  onSelectDay: (day: ConferenceDay) => void
}

export function DayPicker({ selectedDay, onSelectDay }: DayPickerProps) {
  const [
    backgroundColor,
    accentColor,
    textColor,
    inactiveColorText,
    backgroundSecondary
  ] = useCSSVariable([
    '--color-background',
    '--color-accent',
    '--color-foreground',
    '--color-muted',
    '--color-surface'
  ]) as [string, string, string, string, string]
  const width = useWindowDimensions().width

  // Platform-specific text color logic
  const activeContentColor = Platform.select({
    ios: textColor,
    android: backgroundColor
  })

  // Web fallback - use simple segmented control
  if (Platform.OS === 'web') {
    return (
      <View className="bg-background py-1">
        <View 
          style={{
            alignSelf: 'center',
            height: 40,
            paddingVertical: 24,
            width: width - 24 * 2,
            flexDirection: 'row',
            gap: 8
          }}
        >
          <Pressable
            onPress={() => onSelectDay(ConferenceDay.One)}
            style={{
              flex: 1,
              backgroundColor: selectedDay === ConferenceDay.One ? accentColor : backgroundSecondary,
              borderRadius: 8,
              justifyContent: 'center',
              alignItems: 'center',
              height: 40
            }}
          >
            <Text style={{ 
              color: selectedDay === ConferenceDay.One ? backgroundColor : inactiveColorText,
              fontWeight: '600'
            }}>
              Day 1
            </Text>
          </Pressable>
          <Pressable
            onPress={() => onSelectDay(ConferenceDay.Two)}
            style={{
              flex: 1,
              backgroundColor: selectedDay === ConferenceDay.Two ? accentColor : backgroundSecondary,
              borderRadius: 8,
              justifyContent: 'center',
              alignItems: 'center',
              height: 40
            }}
          >
            <Text style={{ 
              color: selectedDay === ConferenceDay.Two ? backgroundColor : inactiveColorText,
              fontWeight: '600'
            }}>
              Day 2
            </Text>
          </Pressable>
        </View>
      </View>
    )
  }

  // Native implementation
  const { Host, Picker } = require('@expo/ui/jetpack-compose')
  
  return (
    <View className="bg-background py-1">
      <Host
        style={{
          alignSelf: 'center',
          height: 40,
          paddingVertical: 24,
          width: width - 24 * 2
        }}
      >
        <Picker
          options={['Day 1', 'Day 2']}
          selectedIndex={selectedDay === ConferenceDay.One ? 0 : 1}
          onOptionSelected={({ nativeEvent: { index } }) => {
            onSelectDay(index === 0 ? ConferenceDay.One : ConferenceDay.Two)
          }}
          color={backgroundColor}
          elementColors={{
            activeContainerColor: accentColor,
            activeContentColor,
            activeBorderColor: 'transparent',
            inactiveContainerColor: backgroundSecondary,
            inactiveContentColor: inactiveColorText,
            inactiveBorderColor: 'transparent'
          }}
          variant="segmented"
        />
      </Host>

      {/* Used to prevent onPress events from being triggered in components behind the picker */}
      <View className="absolute h-[50px] w-full" pointerEvents="none" />
    </View>
  )
}
