import { ActivityIndicator, Text } from 'react-native'
import { Pressable } from 'react-native-gesture-handler'
import { useCSSVariable, withUniwind } from 'uniwind'

const StyledPressable = withUniwind(Pressable)

export function Button({
  title,
  onPress,
  isLoading
}: {
  title: string
  onPress: () => void
  isLoading?: boolean
}) {
  const indicatorColor = useCSSVariable('--color-background') as string

  return (
    <StyledPressable
      onPress={onPress}
      className="bg-foreground min-h-[40px] w-full min-w-[150px] items-center justify-center rounded-[34px] px-6 py-2"
    >
      {isLoading ? (
        <ActivityIndicator color={indicatorColor} />
      ) : (
        <Text className="text-background text-base font-semibold">{title}</Text>
      )}
    </StyledPressable>
  )
}
