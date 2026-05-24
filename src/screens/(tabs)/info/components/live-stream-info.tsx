import { Button } from '@/components/button'
import { useOpenWebBrowser } from '@/hooks'
import { Text, View } from 'react-native'

export function LiveStreamInfo() {
  const openWebBrowserAsync = useOpenWebBrowser()
  const handlePress = () => {
    openWebBrowserAsync('https://conf.react.dev/#newsletter')
  }

  return (
    <View className="bg-overlay mx-4 mb-4 items-center rounded-4xl p-6">
      <View className="border-info-emphasis mb-4 flex-row items-center justify-center gap-2 rounded-4xl border-2 px-2 py-1">
        <View className="bg-info-emphasis size-2 rounded-4xl" />
        <Text className="text-info-emphasis text-sm font-semibold">
          Live Stream
        </Text>
      </View>
      <Text className="text-info-emphasis mb-6 text-center text-base font-medium">
        Join React Conf from anywhere with our free live stream access. Watch
        all the talks remotely.
      </Text>
      <Button onPress={handlePress} title="Sign up" />
    </View>
  )
}
