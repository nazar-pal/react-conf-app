import { Link, useRouter } from 'expo-router'
import { StyleSheet, useWindowDimensions, View } from 'react-native'

import { Session, Speaker } from '@/types'
import { theme } from '../theme'
import { formatSessionTime } from '../utils/formatDate'
import { Bookmark } from './Bookmark'
import { ThemedText, ThemedView } from './Themed'

import { ConferenceDay } from '@/consts'
import { useReactConfStore } from '@/store/reactConfStore'
import * as Haptics from 'expo-haptics'
import { useMemo } from 'react'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import { SpeakerDetails } from './SpeakerDetails'

type Props = {
  session: Session
  day: ConferenceDay
  isBookmarked?: boolean
}

export function TalkCard({ session, day, isBookmarked = false }: Props) {
  const shouldUseLocalTz = useReactConfStore(state => state.shouldUseLocalTz)
  const { width } = useWindowDimensions()
  const router = useRouter()

  const gestureTalkTap = useMemo(
    () =>
      Gesture.Tap()
        .maxDistance(10)
        .runOnJS(true)
        .onEnd(() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
          router.push({
            pathname: '/talk/[talk]',
            params: { talk: session.id }
          })
        }),
    [router, session.id]
  )

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
    <Animated.View entering={FadeIn} exiting={FadeOut}>
      <GestureDetector gesture={gestureTalkTap}>
        <ThemedView style={styles.container}>
          {!isBookmarked && (
            <ThemedText
              className="mb-2 text-sm font-medium"
              color={theme.color.textSecondary}
              style={{ marginLeft: 24 }}
            >
              {formatSessionTime(session, shouldUseLocalTz)}
            </ThemedText>
          )}
          <ThemedView
            color={theme.color.backgroundSecondary}
            style={styles.content}
          >
            <View
              style={{
                marginHorizontal: -16,
                paddingHorizontal: 16,
                marginVertical: -8,
                paddingVertical: 8
              }}
            >
              <View style={styles.titleAndBookmark}>
                <ThemedText
                  className="text-lg font-semibold"
                  style={styles.title}
                >
                  {session.title}
                </ThemedText>
              </View>
              {isBookmarked && (
                <View style={styles.time}>
                  <ThemedText
                    className="text-sm font-medium"
                    color={theme.color.textSecondary}
                  >
                    {formatSessionTime(session, shouldUseLocalTz)},
                  </ThemedText>
                  <ThemedText
                    className="text-sm font-medium"
                    color={theme.color.textSecondary}
                  >
                    {day === ConferenceDay.One ? 'Day 1' : 'Day 2'}
                  </ThemedText>
                </View>
              )}
            </View>
            <View style={styles.bookmarkContainer}>
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
                    <View
                      style={{
                        marginHorizontal: -16,
                        paddingHorizontal: 16,
                        marginVertical: -8,
                        paddingVertical: 8,
                        borderRadius: 32
                      }}
                    >
                      <SpeakerDetails speaker={speaker} />
                    </View>
                  </Link.Trigger>
                  <Link.Preview style={{ ...styles.preview, width }} />
                </Link>
              </GestureDetector>
            ))}
          </ThemedView>
        </ThemedView>
      </GestureDetector>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  bookmarkContainer: {
    position: 'absolute',
    right: 24,
    top: 24
  },
  container: {
    borderRadius: 10,
    marginBottom: 24,
    marginHorizontal: 16
  },
  content: {
    borderRadius: 32,
    gap: 24,
    padding: 24
  },
  preview: {
    height: 420
  },
  time: {
    borderRadius: 10,
    flexDirection: 'row',
    gap: 8
  },
  title: {
    flex: 1,
    marginRight: 40
  },
  titleAndBookmark: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'space-between'
  }
})
