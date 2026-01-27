import { cn } from '@/utils/cn'
import * as Haptics from 'expo-haptics'
import { View } from 'react-native'
import { Pressable } from 'react-native-gesture-handler'

export function IconButton({
  onPress,
  children,
  isActive
}: {
  onPress: () => void
  children: React.ReactElement
  isActive?: boolean
}) {
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    onPress()
  }

  return (
    <Pressable onPress={handlePress}>
      <View
        className={cn(
          'mx-2 rounded-md p-3',
          isActive ? 'bg-accent' : 'bg-white dark:bg-[rgba(255,255,255,0.15)]',
          'shadow-[0_2px_4px_0_rgba(0,0,0,0.1)] dark:shadow-none'
        )}
      >
        {children}
      </View>
    </Pressable>
  )
}
