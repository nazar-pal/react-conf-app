import React, { useCallback } from 'react'
import { Platform, Pressable, StyleSheet, View } from 'react-native'

import { TalkCard } from '@/components/TalkCard'
import { ThemedText, useThemeColor } from '@/components/Themed'
import { ConferenceDay } from '@/consts'
import { useBookmarkStore } from '@/store/bookmarkStore'
import { useReactConfStore } from '@/store/reactConfStore'
import { theme } from '@/theme'
import { Session } from '@/types'
import { Link } from 'expo-router'
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function Bookmarks() {
  const bookmarks = useBookmarkStore(state => state.bookmarks)

  const { dayOne, dayTwo } = useReactConfStore(state => state.schedule)

  const backgroundColor = useThemeColor(theme.color.background)

  const { bottom } = useSafeAreaInsets()

  const dayOneFiltered = dayOne.filter(
    session => !!bookmarks.find(b => b.sessionId === session.id)
  )

  const dayTwoFiltered = dayTwo.filter(
    session => !!bookmarks.find(b => b.sessionId === session.id)
  )

  const renderItem = useCallback(
    ({ item }: { item: { talk: Session; day: ConferenceDay } }) => (
      <Animated.View key={item.talk.id} entering={FadeIn} exiting={FadeOut}>
        <TalkCard session={item.talk} day={item.day} isBookmarked={true} />
      </Animated.View>
    ),
    []
  )

  return (
    <Animated.FlatList
      contentInsetAdjustmentBehavior="automatic"
      style={{ backgroundColor }}
      contentContainerStyle={[
        styles.flatListContainer,
        {
          paddingBottom: Platform.select({ android: 100 + bottom, default: 0 })
        }
      ]}
      data={[
        ...dayOneFiltered.map(talk => ({ talk, day: ConferenceDay.One })),
        ...dayTwoFiltered.map(talk => ({ talk, day: ConferenceDay.Two }))
      ]}
      renderItem={renderItem}
      keyExtractor={item => item.talk.id}
      itemLayoutAnimation={LinearTransition}
      ListEmptyComponent={
        <Animated.View entering={FadeIn} exiting={FadeOut}>
          <View style={styles.bookmarks}>
            <ThemedText fontWeight="bold" fontSize={20}>
              No sessions bookmarked
            </ThemedText>
            <ThemedText fontSize={18} color={theme.color.textSecondary}>
              Tap on the bookmark icon on a session to add it to your bookmarks,
              and it will be displayed here.
            </ThemedText>
            <Link href="/(tabs)/(calendar)" asChild>
              <Pressable>
                <ThemedText
                  color={theme.color.reactBlue}
                  style={{ marginTop: 2 }}
                >
                  View all sessions
                </ThemedText>
              </Pressable>
            </Link>
          </View>
        </Animated.View>
      }
    />
  )
}

const styles = StyleSheet.create({
  bookmarks: {
    gap: 16,
    paddingHorizontal: 16
  },
  flatListContainer: {
    paddingTop: 16
  }
})
