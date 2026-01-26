import { ActivityIndicator, Text } from 'react-native'
import { Pressable } from 'react-native-gesture-handler'
import { useCSSVariable, useUniwind, withUniwind } from 'uniwind'
import { cn } from '../utils/cn'

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
  const { theme } = useUniwind()
  const [whiteColor, blackColor] = useCSSVariable([
    '--color-white',
    '--color-black'
  ]) as [string, string]
  const indicatorColor = theme === 'dark' ? blackColor : whiteColor

  return (
    <StyledPressable
      onPress={onPress}
      className={cn(
        'min-h-[40px] w-full min-w-[150px] items-center justify-center rounded-[34px] px-6 py-2',
        'bg-black dark:bg-white'
      )}
    >
      {isLoading ? (
        <ActivityIndicator color={indicatorColor} />
      ) : (
        <Text className="text-base font-semibold text-white dark:text-black">
          {title}
        </Text>
      )}
    </StyledPressable>
  )
}
