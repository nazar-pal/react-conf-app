import { Bookmark } from '@/components/bookmark'
import { NotFound } from '@/components/not-found'
import { useReactConfStore } from '@/store'
import { cn } from '@/utils/cn'
import {
  DAY_ONE_DATE,
  DAY_TWO_DATE,
  formatSessionTime
} from '@/utils/formatDate'
import { HeaderButton } from '@/components/header-button'
import { Canvas, Fill, Shader, vec } from '@shopify/react-native-skia'
import { isLiquidGlassAvailable } from 'expo-glass-effect'
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
import { scheduleOnRN } from 'react-native-worklets'
import { useCSSVariable, withUniwind } from 'uniwind'
import { Section, SpeakerDetails } from './components'
import { source } from './lib/source'
import { findTalk } from './lib/utils'

const AnimatedScrollView = withUniwind(
  Animated.createAnimatedComponent(ScrollView)
)

export default function TalkDetail() {
  const params = useLocalSearchParams()
  const talkId = params.talkId || undefined
  const { dayOne, dayTwo } = useReactConfStore(state => state.schedule)
  const shouldUseLocalTz = useReactConfStore(state => state.shouldUseLocalTz)
  const { width, height } = useWindowDimensions()
  const drawerHeight = height * 0.8
  const highlightColor = useCSSVariable('--color-accent') as string

  const router = useRouter()

  const triggerHaptic = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
  }

  const overscrollAmount = useSharedValue(0)

  const { talk, isDayOne } = findTalk(talkId, { dayOne, dayTwo })

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
              ios: <HeaderButton buttonProps={{ onPress: router.back }} />,
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
          contentContainerClassName="rounded-b-[20px] pb-safe-offset-6"
          contentInsetAdjustmentBehavior="automatic"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            minHeight: drawerHeight,
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
              className="text-foreground mb-3 text-center text-3xl font-bold"
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
