import React from 'react'
import { Text, View } from 'react-native'

import { SpeakerImage } from '@/components/speaker-image'
import { Speaker } from '@/types'

export function SpeakerDetails({ speaker }: { speaker: Speaker }) {
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
