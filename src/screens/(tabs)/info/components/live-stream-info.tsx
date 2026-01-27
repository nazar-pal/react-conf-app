import { Button } from '@/components/button'
import { useOpenWebBrowser } from '@/hooks'
import { Text, View } from 'react-native'

export function LiveStreamInfo() {
  const openWebBrowserAsync = useOpenWebBrowser()
  const handlePress = () => {
    openWebBrowserAsync('https://conf.react.dev/#newsletter')
  }

  return (
    <View className="bg-overlay mx-4 mb-4 items-center rounded-[32px] p-6">
      <View className="border-muted mb-4 flex-row items-center justify-center gap-2 rounded-[32px] border-2 px-2 py-1 dark:border-white">
        <View className="bg-muted size-2 rounded-[32px] dark:bg-white" />
        <Text className="text-muted text-sm font-semibold dark:text-white">
          Live Stream
        </Text>
      </View>
      <Text className="text-muted mb-6 text-center text-base font-medium dark:text-white">
        Join React Conf from anywhere with our free live stream access. Watch
        all the talks remotely.
      </Text>
      <Button onPress={handlePress} title="Sign up" />
    </View>
  )
}
