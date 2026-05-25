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
        data-active={isActive}
        className="bg-surface data-[active=true]:bg-accent mx-2 rounded-md p-3 shadow-sm transition-colors duration-150 dark:shadow-none"
      >
        {children}
      </View>
    </Pressable>
  )
}
