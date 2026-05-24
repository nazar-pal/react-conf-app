import React, { useCallback } from 'react'
import { Pressable, Text, View } from 'react-native'

import { TalkCard } from '@/components/talk-card'
import { ConferenceDay } from '@/consts'
import { useBookmarkStore, useReactConfStore } from '@/store'
import { Session } from '@/types'
import { Link } from 'expo-router'
import Animated, { LinearTransition } from 'react-native-reanimated'

export default function Bookmarks() {
  const bookmarks = useBookmarkStore(state => state.bookmarks)

  const { dayOne, dayTwo } = useReactConfStore(state => state.schedule)

  const dayOneFiltered = dayOne.filter(
    session => !!bookmarks.find(b => b.sessionId === session.id)
  )

  const dayTwoFiltered = dayTwo.filter(
    session => !!bookmarks.find(b => b.sessionId === session.id)
  )

  const renderItem = useCallback(
    ({ item }: { item: { talk: Session; day: ConferenceDay } }) => (
      <View
        key={item.talk.id}
        className="uw-entering-fade-in uw-exiting-fade-out"
      >
        <TalkCard session={item.talk} day={item.day} isBookmarked={true} />
      </View>
    ),
    []
  )

  return (
    <Animated.FlatList
      contentInsetAdjustmentBehavior="automatic"
      className="bg-background"
      contentContainerClassName="pt-4 pb-0"
      data={[
        ...dayOneFiltered.map(talk => ({ talk, day: ConferenceDay.One })),
        ...dayTwoFiltered.map(talk => ({ talk, day: ConferenceDay.Two }))
      ]}
      renderItem={renderItem}
      keyExtractor={item => item.talk.id}
      itemLayoutAnimation={LinearTransition}
      ListEmptyComponent={
        <View className="uw-entering-fade-in uw-exiting-fade-out">
          <View className="gap-4 px-4">
            <Text className="text-xl font-bold">No sessions bookmarked</Text>
            <Text className="text-muted text-lg">
              Tap on the bookmark icon on a session to add it to your bookmarks,
              and it will be displayed here.
            </Text>
            <Link href="/(tabs)/(calendar)" asChild>
              <Pressable>
                <Text className="text-accent mt-0.5 text-base">
                  View all sessions
                </Text>
              </Pressable>
            </Link>
          </View>
        </View>
      }
    />
  )
}
