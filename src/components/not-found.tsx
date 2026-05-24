import { useReactConfStore } from '@/store'
import { Text, View } from 'react-native'
import { Button } from './button'
import { Image } from './styled'

export function NotFound({ message }: { message: string }) {
  const refetch = useReactConfStore(state => state.refreshData)
  const isRefetching = useReactConfStore(state => state.isRefreshing)

  return (
    <View className="bg-background flex-1 items-center justify-center p-6">
      <Text className="mb-6 text-2xl font-bold">{message}</Text>
      <Image
        tintColorClassName="accent-info-emphasis"
        source={require('@/assets/images/not-found.svg')}
        className="mb-12 size-[100px]"
      />

      <Button title="Refetch" onPress={refetch} isLoading={isRefetching} />
    </View>
  )
}
