import { ConferenceDay } from '@/consts'
import { useReactConfStore } from '@/store'
import { Session } from '@/types'
import { getCurrentConferenceDay } from '@/utils/formatDate'
import { useEffect, useReducer } from 'react'
import { Pressable, Text, View } from 'react-native'

export type CurrentlyLiveSession = {
  session: Session
  day: ConferenceDay
  sessionIndex: number
}

function getCurrentlyLive(
  dayOne: Session[],
  dayTwo: Session[]
): CurrentlyLiveSession | null {
  const currentDay = getCurrentConferenceDay()
  if (!currentDay) {
    return null
  }

  const currentSessions = currentDay === ConferenceDay.One ? dayOne : dayTwo
  const now = new Date()

  for (let i = 0; i < currentSessions.length; i++) {
    const session = currentSessions[i]
    const startTime = new Date(session.startsAt)
    const endTime = new Date(session.endsAt)

    if (now >= startTime && now <= endTime && !session.isServiceSession) {
      return {
        session,
        day: currentDay,
        sessionIndex: i
      }
    }
  }

  return null
}

export function CurrentlyLive({
  scrollToSession
}: {
  scrollToSession: (currentlyLive: CurrentlyLiveSession) => void
}) {
  const { dayOne, dayTwo } = useReactConfStore(state => state.schedule)
  const [, tick] = useReducer((x: number) => x + 1, 0)

  useEffect(() => {
    const interval = setInterval(tick, 5000)
    return () => clearInterval(interval)
  }, [])

  const currentlyLive = getCurrentlyLive(dayOne, dayTwo)

  return (
    <Pressable
      key={currentlyLive?.session.id}
      className="ios:w-45 web:w-45 uw-entering-fade-in uw-exiting-fade-out-up items-center"
      onPressIn={() => {
        if (currentlyLive) {
          scrollToSession(currentlyLive)
        }
      }}
    >
      {currentlyLive ? (
        <>
          <View className="flex-row items-center gap-1">
            <View className="bg-danger size-1 rounded" />
            <Text className="text-muted text-[10px] font-semibold uppercase">
              Currently Live
            </Text>
          </View>
          <Text className="text-center text-xs font-semibold" numberOfLines={2}>
            {currentlyLive.session.title}
          </Text>
        </>
      ) : (
        // Without this, the header will not animate in on iOS 26
        <View />
      )}
    </Pressable>
  )
}
