import { Text, View } from 'react-native'

import { Speaker } from '@/types'
import { SpeakerImage } from './speaker-image'

export function SpeakerDetails({ speaker }: { speaker: Speaker }) {
  return (
    <View className="flex-row items-center">
      <SpeakerImage
        profilePicture={speaker.profilePicture}
        animated
        size="small"
      />
      <View className="flex-1 justify-center gap-0.5">
        <Text className="text-text text-base font-medium">
          {speaker.fullName}
        </Text>
        {speaker.tagLine ? (
          <Text className="text-text-secondary text-sm font-medium">
            {speaker.tagLine}
          </Text>
        ) : null}
      </View>
    </View>
  )
}
