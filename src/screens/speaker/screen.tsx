import { HeaderButton } from '@/components/header-button'
import { NotFound } from '@/components/not-found'
import { SpeakerImage } from '@/components/speaker-image'
import { ScrollView } from '@/components/styled/react-native-gesture-handler'
import { useReactConfStore } from '@/store'
import {
  Stack,
  useIsPreview,
  useLocalSearchParams,
  useRouter
} from 'expo-router'
import { Platform, StyleSheet, Text, View } from 'react-native'
import { MiniTalkCard, Socials } from './components'

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
        data-preview={isPreview}
        className="bg-background data-[preview=true]:bg-surface flex-1"
      >
        {speaker ? (
          <ScrollView
            className="flex-1"
            contentContainerClassName="rounded-b-[20px] p-4 pt-6"
            contentInsetAdjustmentBehavior="automatic"
            showsVerticalScrollIndicator={false}
          >
            <View className="items-center">
              <SpeakerImage
                className="mb-6"
                profilePicture={speaker.profilePicture}
                size="large"
              />
              <Text className="text-lg">{speaker.fullName}</Text>
              {speaker.tagLine ? (
                <Text className="text-muted text-center text-base">
                  {speaker.tagLine}
                </Text>
              ) : null}

              <View
                className="border-divider my-6 w-full border-b"
                style={{
                  borderBottomWidth: StyleSheet.hairlineWidth
                }}
              />
            </View>
            {speaker.links.length ? <Socials speaker={speaker} /> : null}
            {speaker.bio ? (
              <Text className="mb-6 text-sm" style={{ lineHeight: 18 * 1.5 }}>
                {speaker.bio}
              </Text>
            ) : null}
            {speaker.sessions.map(sessionId => (
              <MiniTalkCard sessionId={sessionId} key={sessionId} />
            ))}
          </ScrollView>
        ) : (
          <NotFound message="Speaker not found" />
        )}
      </View>
    </>
  )
}
