import {
  Stack,
  useIsPreview,
  useLocalSearchParams,
  useRouter
} from 'expo-router'
import { Platform, StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

import { HeaderButton } from '@/components/header-button'
import { MiniTalkCard } from '@/components/MiniTalkCard'
import { NotFound } from '@/components/NotFound'
import { SpeakerImage } from '@/components/SpeakerImage'
import { useReactConfStore } from '@/store/reactConfStore'
import { cn } from '@/utils/cn'
import { withUniwind } from 'uniwind'
import { Socials } from './components'

const StyledScrollView = withUniwind(ScrollView)

export default function SpeakerDetail() {
  const params = useLocalSearchParams()
  const speakers = useReactConfStore(state => state.allSessions.speakers)
  const speaker = speakers.find(speaker => speaker.id === params.speakerId)
  const isPreview = useIsPreview()
  const router = useRouter()

  return (
    <>
      {!isPreview ? (
        <Stack.Screen
          options={{
            title: '',
            headerLeft: () =>
              Platform.select({
                ios: (
                  <HeaderButton
                    buttonProps={{ onPress: router.back }}
                    style={{ padding: 0 }}
                  />
                ),
                default: undefined
              })
          }}
        />
      ) : null}
      <View
        className={cn(
          'flex-1',
          isPreview && 'bg-background-secondary',
          !isPreview && 'bg-background'
        )}
      >
        {speaker ? (
          <StyledScrollView
            className="flex-1"
            contentContainerClassName="rounded-b-[20px] p-4 pt-6"
            contentInsetAdjustmentBehavior="automatic"
            showsVerticalScrollIndicator={false}
          >
            <View className="items-center">
              <SpeakerImage
                style={{ marginBottom: 24 }}
                profilePicture={speaker.profilePicture}
                size="large"
              />
              <Text className="text-text text-lg font-medium">
                {speaker.fullName}
              </Text>
              {speaker.tagLine ? (
                <Text className="text-text-secondary text-center text-base font-medium">
                  {speaker.tagLine}
                </Text>
              ) : null}

              <View
                className="border-border my-6 w-full border-b"
                style={{
                  borderBottomWidth: StyleSheet.hairlineWidth
                }}
              />
            </View>
            {speaker.links.length ? <Socials speaker={speaker} /> : null}
            {speaker.bio ? (
              <Text
                className="text-text text-sm font-medium"
                style={{
                  marginBottom: 24,
                  lineHeight: 18 * 1.5
                }}
              >
                {speaker.bio}
              </Text>
            ) : null}
            {speaker.sessions.map(sessionId => (
              <MiniTalkCard sessionId={sessionId} key={sessionId} />
            ))}
          </StyledScrollView>
        ) : (
          <NotFound message="Speaker not found" />
        )}
      </View>
    </>
  )
}
