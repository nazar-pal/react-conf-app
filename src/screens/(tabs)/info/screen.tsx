import { useScrollToTop } from '@react-navigation/native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
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

  useScrollToTop(ref)

  return (
    <StyledScrollView
      className="bg-background"
      contentContainerClassName="pb-0"
      contentInsetAdjustmentBehavior="automatic"
      ref={ref}
    >
      <VenueInfo />
      <LiveStreamInfo />
      <DiscordInfo />
      <Sponsors />
      <PoweredByExpo />
    </StyledScrollView>
  )
}
