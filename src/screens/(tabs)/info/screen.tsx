import { useScrollToTop } from '@react-navigation/native'
import React from 'react'
import { Platform } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { withUniwind } from 'uniwind'
import {
  DiscordInfo,
  LiveStreamInfo,
  PoweredByExpo,
  Sponsors,
  VenueInfo
} from './components'

const StyledScrollView = withUniwind(ScrollView)

export default function Info() {
  const ref = React.useRef(null)
  const { bottom } = useSafeAreaInsets()

  useScrollToTop(ref)

  return (
    <StyledScrollView
      className="bg-background"
      ref={ref}
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{
        paddingBottom: Platform.select({ android: 100 + bottom, default: 0 })
      }}
    >
      <VenueInfo />
      <LiveStreamInfo />
      <DiscordInfo />
      <Sponsors />
      <PoweredByExpo />
    </StyledScrollView>
  )
}
