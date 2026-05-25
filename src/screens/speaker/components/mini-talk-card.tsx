import { Bookmark } from '@/components/bookmark'
import { Pressable } from '@/components/styled'
import { useReactConfStore } from '@/store'
import { formatSessionTime } from '@/utils/formatDate'
import { Link } from 'expo-router'
import { Text, View } from 'react-native'

export function MiniTalkCard({ sessionId }: { sessionId: string | number }) {
  const shouldUseLocalTz = useReactConfStore(state => state.shouldUseLocalTz)
  const { dayOne, dayTwo } = useReactConfStore(state => state.schedule)

  const { talk, isDayOne } = (() => {
    const dayOneTalk = dayOne.find(session => session.id === String(sessionId))
    if (dayOneTalk) {
      return { talk: dayOneTalk, isDayOne: true }
    }
    const dayTwoTalk = dayTwo.find(session => session.id === String(sessionId))
    if (dayTwoTalk) {
      return { talk: dayTwoTalk, isDayOne: false }
    }
    return { talk: null, isDayOne: null }
  })()

  if (!talk) {
    return null
  }

  return (
    <Link
      push
      href={{
        pathname: '/talk/[speaker]',
        params: { speaker: talk.id }
      }}
      asChild
    >
      <Pressable className="active:bg-overlay transition-colors duration-150">
        <View className="bg-background mb-6 flex-row items-center justify-between rounded-[10px] p-6">
          <View className="shrink gap-1">
            <Text className="text-base font-semibold">{talk.title}</Text>
            <Text className="text-muted mb-2 text-sm">
              {formatSessionTime(talk, shouldUseLocalTz)}
              {` `}({isDayOne ? 'Day 1' : 'Day 2'})
            </Text>
          </View>
          <Bookmark session={talk} size="small" inline />
        </View>
      </Pressable>
    </Link>
  )
}
