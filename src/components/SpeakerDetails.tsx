import { StyleSheet, View } from 'react-native'

import { Speaker } from '@/types'
import { theme } from '../theme'
import { SpeakerImage } from './SpeakerImage'
import { ThemedText } from './Themed'

export function SpeakerDetails({ speaker }: { speaker: Speaker }) {
  return (
    <View style={styles.speaker}>
      <SpeakerImage
        profilePicture={speaker.profilePicture}
        animated
        size="small"
      />
      <View style={styles.speakerDetails}>
        <ThemedText>{speaker.fullName}</ThemedText>
        {speaker.tagLine ? (
          <ThemedText
            className="text-sm font-medium"
            color={theme.color.textSecondary}
          >
            {speaker.tagLine}
          </ThemedText>
        ) : null}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  speaker: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  speakerDetails: {
    flex: 1,
    gap: 2,
    justifyContent: 'center'
  }
})
