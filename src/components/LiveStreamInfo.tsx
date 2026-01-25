import openWebBrowserAsync from '@/utils/openWebBrowserAsync'
import { StyleSheet, View } from 'react-native'
import { Button } from './Button'
import { ThemedText, ThemedView, useThemeColor } from './Themed'

import { theme } from '@/theme'

export function LiveStreamInfo() {
  const handlePress = () => {
    openWebBrowserAsync('https://conf.react.dev/#newsletter')
  }

  const borderColor = useThemeColor({
    light: theme.color.textSecondary.light,
    dark: theme.colorWhite
  })
  return (
    <ThemedView style={styles.container} color={theme.color.backgroundElement}>
      <View style={[styles.liveStreamContainer, { borderColor }]}>
        <View
          style={[styles.liveStreamDot, { backgroundColor: borderColor }]}
        />
        <ThemedText
          fontWeight="semiBold"
          fontSize={14}
          color={{
            light: theme.color.textSecondary.light,
            dark: theme.colorWhite
          }}
        >
          Live Stream
        </ThemedText>
      </View>
      <ThemedText
        color={{
          light: theme.color.textSecondary.light,
          dark: theme.colorWhite
        }}
        style={styles.text}
      >
        Join React Conf from anywhere with our free live stream access. Watch
        all the talks remotely.
      </ThemedText>
      <Button onPress={handlePress} title="Sign up" />
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: 32,
    marginBottom: 16,
    marginHorizontal: 16,
    padding: 24
  },
  liveStreamContainer: {
    alignItems: 'center',
    borderRadius: 32,
    borderWidth: 2,
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    marginBottom: 16,
    paddingHorizontal: 8,
    paddingVertical: 4
  },
  liveStreamDot: {
    borderRadius: 32,
    height: 8,
    width: 8
  },
  text: {
    marginBottom: 24,
    textAlign: 'center'
  }
})
