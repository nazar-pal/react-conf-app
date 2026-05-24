import { ConferenceDay } from '@/consts'
import { useReactConfStore } from '@/store'
import { Session, Speaker } from '@/types'
import * as Haptics from 'expo-haptics'
import { Link, useRouter } from 'expo-router'
import { Text, useWindowDimensions, View } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import { formatSessionTime } from '../utils/formatDate'
import { Bookmark } from './bookmark'
import { SpeakerDetails } from './speaker-details'

type Props = {
  session: Session
  day: ConferenceDay
  isBookmarked?: boolean
}

export function TalkCard({ session, day, isBookmarked = false }: Props) {
  const shouldUseLocalTz = useReactConfStore(state => state.shouldUseLocalTz)
  const { width } = useWindowDimensions()
  const router = useRouter()

  const gestureTalkTap = Gesture.Tap()
    .maxDistance(10)
    .runOnJS(true)
    .onEnd(() => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
      router.push({
        pathname: '/talk/[talk]',
        params: { talk: session.id }
      })
    })

  const createSpeakerTapGesture = (speaker: Speaker) =>
    Gesture.Tap()
      .maxDistance(10)
      .runOnJS(true)
      .onEnd(() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
        router.push({
          pathname: '/speaker/[speaker]',
          params: { speaker: speaker.id }
        })
      })

  return (
    <View className="uw-entering-fade-in uw-exiting-fade-out">
      <GestureDetector gesture={gestureTalkTap}>
        <View className="bg-background mx-4 mb-6 rounded-[10px]">
          {!isBookmarked && (
            <Text className="text-muted mb-2 ml-6 text-sm">
              {formatSessionTime(session, shouldUseLocalTz)}
            </Text>
          )}
          <View className="bg-surface gap-6 rounded-[32px] p-6">
            <View className="-mx-4 -my-2 px-4 py-2">
              <View className="flex-row items-center justify-between gap-2">
                <Text className="mr-10 flex-1 text-lg font-semibold">
                  {session.title}
                </Text>
              </View>
              {isBookmarked && (
                <View className="flex-row gap-2 rounded-[10px]">
                  <Text className="text-muted text-sm">
                    {formatSessionTime(session, shouldUseLocalTz)},
                  </Text>
                  <Text className="text-muted text-sm">
                    {day === ConferenceDay.One ? 'Day 1' : 'Day 2'}
                  </Text>
                </View>
              )}
            </View>
            <View className="absolute top-6 right-6">
              <Bookmark session={session} size="small" />
            </View>
            {session.speakers.map(speaker => (
              <GestureDetector
                key={speaker.id}
                gesture={createSpeakerTapGesture(speaker)}
              >
                <Link
                  href={{
                    pathname: '/speaker/[speaker]',
                    params: { speaker: speaker.id }
                  }}
                  asChild
                >
                  <Link.Trigger>
                    <View className="-mx-4 -my-2 rounded-[32px] px-4 py-2">
                      <SpeakerDetails speaker={speaker} />
                    </View>
                  </Link.Trigger>
                  <Link.Preview style={{ height: 420, width }} />
                </Link>
              </GestureDetector>
            ))}
          </View>
        </View>
      </GestureDetector>
    </View>
  )
}
