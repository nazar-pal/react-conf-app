import React, { useCallback } from 'react'
import { Platform, Pressable, Text, View } from 'react-native'

import { TalkCard } from '@/components/talk-card'
import { ConferenceDay } from '@/consts'
import { useBookmarkStore, useReactConfStore } from '@/store'
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
      className="bg-background"
      contentContainerClassName="pt-4"
      contentContainerStyle={[
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
          <View className="gap-4 px-4">
            <Text className="text-text text-xl font-bold">
              No sessions bookmarked
            </Text>
            <Text className="text-text-secondary text-lg font-medium">
              Tap on the bookmark icon on a session to add it to your bookmarks,
              and it will be displayed here.
            </Text>
            <Link href="/(tabs)/(calendar)" asChild>
              <Pressable>
                <Text className="text-react-blue mt-0.5 text-base font-medium">
                  View all sessions
                </Text>
              </Pressable>
            </Link>
          </View>
        </Animated.View>
      }
    />
  )
}
