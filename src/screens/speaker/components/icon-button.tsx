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
          isActive ? 'bg-accent' : 'bg-white dark:bg-white/15',
          'shadow-sm dark:shadow-none'
        )}
      >
        {children}
      </View>
    </Pressable>
  )
}
