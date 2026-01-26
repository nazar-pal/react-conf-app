import React, { useCallback } from 'react'
import {
  Keyboard,
  Platform,
  Pressable,
  Text,
  useWindowDimensions,
  View
} from 'react-native'

import { NotFound } from '@/components/not-found'

import { SpeakerDetails } from '@/components/speaker-details'
import { useBookmark } from '@/hooks/useBookmark'
import { useReactConfStore } from '@/store/reactConfStore'
import { Speaker } from '@/types'
import { Link, useLocalSearchParams } from 'expo-router'
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function Speakers() {
  const speakers = useReactConfStore(state => state.allSessions.speakers)
  const { width, height } = useWindowDimensions()
  const { bottom, top } = useSafeAreaInsets()
  const { toggleBookmarkById, isBookmarked, getSessionById } = useBookmark()

  const params = useLocalSearchParams<{ q?: string }>()

  const searchText = params?.q?.toLowerCase() || ''

  const filteredSpeakers = speakers.filter(speaker => {
    if (!searchText) {
      return true
    }
    return speaker.fullName.toLowerCase().includes(searchText)
  })

  const dismissKeyboard = () => {
    Keyboard.dismiss()
  }

  const renderItem = useCallback(
    ({ item }: { item: Speaker }) => {
      return (
        <Animated.View key={item.id} entering={FadeIn} exiting={FadeOut}>
          <Link
            push
            key={item.id}
            href={{
              pathname: '/speaker/[speaker]',
              params: { speaker: item.id }
            }}
            asChild
          >
            <Link.Trigger>
              <Pressable
                className="py-6"
                onLongPress={() => {
                  // adding this to prevent navigating on long press instead of opening the preview
                }}
              >
                <SpeakerDetails speaker={item} key={item.id} />
              </Pressable>
            </Link.Trigger>
            <Link.Preview style={{ height: 420, width: width }} />
            <Link.Menu title={`Talks by ${item.fullName}`}>
              {item.sessions
                .map(sessionId => {
                  const sessionIdStr = sessionId.toString()
                  const session = getSessionById(sessionIdStr)
                  const bookmarked = isBookmarked(sessionIdStr)

                  if (!session) return null

                  return (
                    <Link.MenuAction
                      key={sessionIdStr}
                      title={session.title}
                      icon={bookmarked ? 'bookmark.fill' : 'bookmark'}
                      isOn={bookmarked}
                      onPress={() => toggleBookmarkById(sessionIdStr)}
                    />
                  )
                })
                .filter(
                  (item): item is NonNullable<typeof item> => item !== null
                )}
            </Link.Menu>
          </Link>
        </Animated.View>
      )
    },
    [width, getSessionById, isBookmarked, toggleBookmarkById]
  )

  if (!speakers.length) {
    return <NotFound message="Speakers unavailable" />
  }

  return (
    <Animated.FlatList
      scrollToOverflowEnabled
      contentInsetAdjustmentBehavior="automatic"
      onScrollBeginDrag={dismissKeyboard}
      keyboardShouldPersistTaps="handled"
      className="bg-background"
      contentContainerClassName="px-4"
      contentContainerStyle={[
        {
          paddingBottom: Platform.select({ android: 100 + bottom, default: 0 })
        },
        { minHeight: height - (bottom + top + 130) }
      ]}
      ItemSeparatorComponent={() => <View className="bg-border h-px" />}
      extraData={isBookmarked || searchText}
      renderItem={renderItem}
      data={filteredSpeakers}
      keyExtractor={item => item.id}
      itemLayoutAnimation={LinearTransition}
      ListEmptyComponent={
        <Animated.View entering={FadeIn} exiting={FadeOut}>
          <View className="bg-background p-6">
            <Text className="text-text text-base font-medium">
              No results found for{' '}
              <Text className="text-text text-base font-bold">
                {searchText}
              </Text>
            </Text>
          </View>
        </Animated.View>
      }
    />
  )
}
