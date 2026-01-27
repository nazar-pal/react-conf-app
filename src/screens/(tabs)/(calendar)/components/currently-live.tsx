import { ConferenceDay } from '@/consts'
import { useReactConfStore } from '@/store'
import { Session } from '@/types'
import { cn } from '@/utils/cn'
import { getCurrentConferenceDay } from '@/utils/formatDate'
import { useCallback, useEffect, useState } from 'react'
import { Platform, Pressable, Text, View } from 'react-native'
import Animated, { FadeIn, FadeOutUp } from 'react-native-reanimated'

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

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
  const [currentlyLive, setCurrentlyLive] =
    useState<CurrentlyLiveSession | null>(null)
  const { dayOne, dayTwo } = useReactConfStore(state => state.schedule)
  const checkCurrentlyLive = useCallback(() => {
    const currentlyLive = getCurrentlyLive(dayOne, dayTwo)
    setCurrentlyLive(currentlyLive)
  }, [dayOne, dayTwo])

  useEffect(() => {
    checkCurrentlyLive()
    const interval = setInterval(checkCurrentlyLive, 5000)
    return () => clearInterval(interval)
  }, [dayOne, dayTwo, checkCurrentlyLive])

  return (
    <AnimatedPressable
      key={currentlyLive?.session.id}
      className={cn('items-center', Platform.OS !== 'android' && 'w-[180px]')}
      onPressIn={() => {
        if (currentlyLive) {
          scrollToSession(currentlyLive)
        }
      }}
      entering={FadeIn}
      exiting={FadeOutUp}
    >
      {currentlyLive ? (
        <>
          <View className="flex-row items-center gap-1">
            <View className="bg-danger size-1 rounded" />
            <Text className="text-text-secondary text-[10px] font-semibold uppercase">
              Currently Live
            </Text>
          </View>
          <Text
            className="text-text text-center text-xs font-semibold"
            numberOfLines={2}
          >
            {currentlyLive.session.title}
          </Text>
        </>
      ) : (
        // Without this, the header will not animate in on iOS 26
        <View />
      )}
    </AnimatedPressable>
  )
}
