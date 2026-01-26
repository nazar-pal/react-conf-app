import { useReactConfStore } from '@/store/reactConfStore'
import { Image as ExpoImage } from 'expo-image'
import { Text, View } from 'react-native'
import { useCSSVariable, useUniwind, withUniwind } from 'uniwind'
import { Button } from './button'

const Image = withUniwind(ExpoImage)

export function NotFound({ message }: { message: string }) {
  const refetch = useReactConfStore(state => state.refreshData)
  const isRefetching = useReactConfStore(state => state.isRefreshing)
  const { theme } = useUniwind()
  const [colorGrey, colorWhite] = useCSSVariable([
    '--color-grey',
    '--color-white'
  ]) as [string, string]
  const iconColor = theme === 'dark' ? colorWhite : colorGrey

  return (
    <View className="bg-background flex-1 items-center justify-center p-6">
      <Text className="text-text mb-6 text-2xl font-bold">{message}</Text>
      <Image
        tintColor={iconColor}
        source={require('@/assets/images/not-found.svg')}
        className="mb-12 size-[100px]"
      />

      <Button title="Refetch" onPress={refetch} isLoading={isRefetching} />
    </View>
  )
}
