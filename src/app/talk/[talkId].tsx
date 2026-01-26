import { Canvas, Fill, Shader, Skia, vec } from '@shopify/react-native-skia'
import * as Haptics from 'expo-haptics'
import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router'
import React from 'react'
import { Platform, Text, View, useWindowDimensions } from 'react-native'
import { Pressable, ScrollView } from 'react-native-gesture-handler'
import Animated, {
  Easing,
  useAnimatedReaction,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { Bookmark } from '@/components/Bookmark'
import { HeaderButton } from '@/components/HeaderButtons/HeaderButton'
import { NotFound } from '@/components/NotFound'
import { SpeakerImage } from '@/components/SpeakerImage'
import { useReactConfStore } from '@/store/reactConfStore'
import { Session, Speaker } from '@/types'
import { cn } from '@/utils/cn'
import {
  DAY_ONE_DATE,
  DAY_TWO_DATE,
  formatSessionTime
} from '@/utils/formatDate'
import { isLiquidGlassAvailable } from 'expo-glass-effect'
import { scheduleOnRN } from 'react-native-worklets'
import { useCSSVariable, withUniwind } from 'uniwind'

const AnimatedScrollView = withUniwind(
  Animated.createAnimatedComponent(ScrollView)
)

const source = Skia.RuntimeEffect.Make(`
uniform float sheetAnim;
uniform vec2 size;

vec4 main(vec2 pos) {
  vec2 normalized = pos/vec2(256);
  vec2 offset;
  float dist;
  offset = (pos - vec2(size.x/2, -size.y));
  dist = sqrt(pow(offset.x, 2.0) + pow(offset.y, 2.0)) / sqrt(pow(size.x/2, 2.0) + pow(size.y/2, 2.0));
  float anim = 1 - sheetAnim;

  offset = (pos - vec2(size.x*anim, size.y*anim));
  dist = sqrt(pow(offset.x, 2.0) + pow(offset.y, 2.0)) / sqrt(pow(size.x/2, 2.0) + pow(size.x/2, 2.0)) - pow(sheetAnim,1.3);
  float mixVal = max(0.0,dist);
  vec4 colorA = vec4(0.345, 0.769, 0.863, 1.0) + vec4(1.0, normalized.x, normalized.y,1.0) / 6.0;
  vec4 colorB = vec4(0.031, 0.494, 0.643, 1.0);

  vec4 color = mix(colorA, colorB, mixVal);
  return vec4(color);
}`)!

const findTalk = (
  talkId: string | string[] | undefined,
  { dayOne, dayTwo }: { dayOne: Session[]; dayTwo: Session[] }
) => {
  const talkDay1 = dayOne.find(session => session.id === talkId)
  if (talkDay1) {
    return { talk: talkDay1, isDayOne: true }
  }
  const talkDay2 = dayTwo.find(session => session.id === talkId)
  if (talkDay2) {
    return { talk: talkDay2, isDayOne: false }
  }

  return { talk: null, isDayOne: false }
}

export default function TalkDetail() {
  const params = useLocalSearchParams()
  const talkId = params.talkId || undefined
  const { dayOne, dayTwo } = useReactConfStore(state => state.schedule)
  const shouldUseLocalTz = useReactConfStore(state => state.shouldUseLocalTz)
  const { width, height } = useWindowDimensions()
  const drawerHeight = height * 0.8
  const highlightColor = useCSSVariable('--color-react-blue') as string

  const router = useRouter()

  const triggerHaptic = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
  }

  const overscrollAmount = useSharedValue(0)

  const { talk, isDayOne } = findTalk(talkId, { dayOne, dayTwo })

  const insets = useSafeAreaInsets()

  const sheetAnim = useSharedValue(0)
  const hasTriggeredHaptic = useSharedValue(false)

  const scrollHandler = useAnimatedScrollHandler(event => {
    const { contentOffset, contentSize, layoutMeasurement } = event
    const scrollPastBottom = Math.max(
      0,
      contentOffset.y + layoutMeasurement.height - contentSize.height - 20
    )
    overscrollAmount.value = scrollPastBottom
  })

  useAnimatedReaction(
    () => overscrollAmount.value,
    amount => {
      if (amount > 0 && !hasTriggeredHaptic.value) {
        hasTriggeredHaptic.value = true
        scheduleOnRN(triggerHaptic)
      } else if (amount === 0) {
        hasTriggeredHaptic.value = false
      }

      const normalizedAmount = Math.min(amount / 100, 1)
      sheetAnim.value = withTiming(normalizedAmount, {
        duration: 600,
        easing: Easing.out(Easing.quad)
      })
    },
    []
  )

  const uniforms = useDerivedValue(
    () => ({
      sheetAnim: sheetAnim.value,
      size: vec(width, drawerHeight)
    }),
    [sheetAnim]
  )

  const opacityStyle = useAnimatedStyle(() => ({
    opacity: sheetAnim.value * 0.4
  }))

  if (!talk) {
    return <NotFound message="Talk not found" />
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () =>
            Platform.select({
              ios: (
                <HeaderButton
                  buttonProps={{ onPress: router.back }}
                  style={{ padding: 0 }}
                />
              ),
              default: undefined
            }),
          headerRight: () => <Bookmark session={talk} style={{ padding: 0 }} />
        }}
      />

      <View
        className={cn(
          'flex-1',
          isLiquidGlassAvailable() ? 'bg-transparent' : 'bg-background'
        )}
      >
        {isLiquidGlassAvailable() ? (
          <View style={{ height: drawerHeight }}>
            <Animated.View style={opacityStyle} className="absolute">
              <Canvas
                style={{
                  width: width,
                  height: drawerHeight,
                  transform: [{ scale: 2 }]
                }}
              >
                <Fill>
                  <Shader source={source} uniforms={uniforms} />
                </Fill>
              </Canvas>
            </Animated.View>
            <View style={{ height: drawerHeight }}>
              <Animated.View style={opacityStyle} className="absolute">
                <Canvas style={{ width: width, height: drawerHeight }}>
                  <Fill>
                    <Shader source={source} uniforms={uniforms} />
                  </Fill>
                </Canvas>
              </Animated.View>
            </View>
          </View>
        ) : null}
        <AnimatedScrollView
          onScroll={scrollHandler}
          className="flex-1"
          contentContainerClassName="rounded-b-[20px]"
          contentInsetAdjustmentBehavior="automatic"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            minHeight: drawerHeight,
            paddingBottom: insets.bottom + 24,
            paddingTop: Platform.select({
              ios: 24,
              default: undefined
            })
          }}
        >
          <View
            className={cn('px-6', Platform.OS === 'android' && 'mt-[30px]')}
            collapsable={false}
          >
            <Text
              className="text-text mb-3 text-center text-3xl font-bold"
              style={{ textDecorationColor: highlightColor }}
            >
              {talk?.title}
            </Text>
          </View>
          <View
            className={cn(
              'gap-2 px-6 pt-4',
              isLiquidGlassAvailable() ? 'bg-transparent' : 'bg-background'
            )}
          >
            {talk.speakers.map(speaker => (
              <Link
                push
                key={speaker.id}
                href={{
                  pathname: '/speaker/[speaker]',
                  params: { speaker: speaker.id }
                }}
                asChild
              >
                <Pressable>
                  <SpeakerDetails speaker={speaker} />
                </Pressable>
              </Link>
            ))}
            <Section
              title="Date"
              value={
                isDayOne
                  ? `${DAY_ONE_DATE} (Conference Day 1)`
                  : `${DAY_TWO_DATE} (Conference Day 2)`
              }
            />
            <Section
              title="Time"
              value={formatSessionTime(talk, shouldUseLocalTz)}
            />
            <Section title="Venue" value={talk.room} />
            <Section title="Description" value={talk.description} />
          </View>
        </AnimatedScrollView>
      </View>
    </>
  )
}

function SpeakerDetails({ speaker }: { speaker: Speaker }) {
  return (
    <View className="mb-3 flex-row gap-2">
      <SpeakerImage profilePicture={speaker.profilePicture} />
      <View className="flex-1 justify-center">
        <Text className="text-text text-lg font-semibold">
          {speaker.fullName}
        </Text>
        <Text className="text-text-secondary text-sm font-medium">
          {speaker.tagLine}
        </Text>
      </View>
    </View>
  )
}

function Section({ title, value }: { title: string; value: string | null }) {
  if (!value) {
    return null
  }

  return (
    <View className="mb-6 gap-1">
      <Text className="text-text text-lg font-semibold">{title}</Text>
      <Text className="text-text-secondary text-base font-medium">{value}</Text>
    </View>
  )
}
