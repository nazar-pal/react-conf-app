import { ScrollView } from '@/components/styled'
import { useScrollToTop } from 'expo-router'
import React from 'react'
import {
  DiscordInfo,
  LiveStreamInfo,
  PoweredByExpo,
  Sponsors,
  VenueInfo
} from './components'

export default function Info() {
  const ref = React.useRef(null)

  useScrollToTop(ref)

  return (
    <ScrollView
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
    </ScrollView>
  )
}
