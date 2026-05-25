import { Pressable } from '@/components/styled'
import { ActivityIndicator, Text } from 'react-native'

export function Button({
  title,
  onPress,
  isLoading
}: {
  title: string
  onPress: () => void
  isLoading?: boolean
}) {
  return (
    <Pressable
      onPress={onPress}
      className="bg-foreground min-h-[40px] w-full min-w-[150px] items-center justify-center rounded-[34px] px-6 py-2"
    >
      {isLoading ? (
        <ActivityIndicator colorClassName="accent-background" />
      ) : (
        <Text className="text-background text-base font-semibold">{title}</Text>
      )}
    </Pressable>
  )
}
