import Feather from '@expo/vector-icons/build/Feather'
import Ionicons from '@expo/vector-icons/build/Ionicons'
import { Image } from 'expo-image'
import {
  Stack,
  useIsPreview,
  useLocalSearchParams,
  useRouter
} from 'expo-router'
import { Platform, StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

import { HeaderButton } from '@/components/HeaderButtons/HeaderButton'
import { IconButton } from '@/components/IconButton'
import { MiniTalkCard } from '@/components/MiniTalkCard'
import { NotFound } from '@/components/NotFound'
import { SpeakerImage } from '@/components/SpeakerImage'
import { useOpenWebBrowser } from '@/hooks/useOpenWebBrowser'
import { useReactConfStore } from '@/store/reactConfStore'
import { Speaker } from '@/types'
import { cn } from '@/utils/cn'
import { useCSSVariable, useUniwind, withUniwind } from 'uniwind'

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

function Socials({ speaker }: { speaker: Speaker }) {
  const [blackColor, whiteColor] = useCSSVariable([
    '--color-black',
    '--color-white'
  ]) as [string, string]
  const { theme } = useUniwind()
  const iconColor = theme === 'dark' ? whiteColor : blackColor
  const openWebBrowserAsync = useOpenWebBrowser()
  return (
    <View className="mb-6 flex-row justify-center">
      {speaker.links.map(link => {
        const icon = (() => {
          switch (link.linkType) {
            case 'Twitter': {
              return (
                <Image
                  source={require('@/assets/images/x.svg')}
                  style={{ height: 20, width: 20 }}
                  tintColor={iconColor}
                />
              )
            }
            case 'LinkedIn': {
              return (
                <Image
                  source={require('@/assets/images/linkedin.svg')}
                  style={{ height: 20, width: 20 }}
                  tintColor={iconColor}
                />
              )
            }
            case 'Blog': {
              return (
                <Ionicons
                  name="reader"
                  size={18}
                  color={iconColor}
                  style={{ height: 20, width: 20 }}
                />
              )
            }
            case 'Company_Website': {
              return (
                <Feather
                  name="link"
                  size={18}
                  color={iconColor}
                  style={{ height: 20, width: 20 }}
                />
              )
            }
          }
        })()

        if (!icon) {
          return null
        }

        return (
          <IconButton
            onPress={() => openWebBrowserAsync(link.url)}
            key={link.title}
          >
            {icon}
          </IconButton>
        )
      })}
    </View>
  )
}
