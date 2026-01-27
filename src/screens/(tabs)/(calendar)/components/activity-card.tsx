import { useReactConfStore } from '@/store'
import { Session } from '@/types'
import { formatSessionTime } from '@/utils/formatDate'
import { Text, View } from 'react-native'

type Props = {
  session: Session
}

export function ActivityCard({ session }: Props) {
  const shouldUseLocalTz = useReactConfStore(state => state.shouldUseLocalTz)

  return (
    <View className="mx-6 mb-4 gap-2 rounded-[10px]">
      <Text className="text-text-secondary ml-6 text-sm font-medium">
        {formatSessionTime(session, shouldUseLocalTz)}
      </Text>
      <View className="bg-background-tertiary justify-center rounded-xl p-6">
        <View className="flex-row items-center justify-between">
          <Text className="text-foreground text-lg font-semibold">
            {session.title}
          </Text>
          <Text className="text-foreground text-sm font-light">
            {session.room}
          </Text>
        </View>
      </View>
    </View>
  )
}
