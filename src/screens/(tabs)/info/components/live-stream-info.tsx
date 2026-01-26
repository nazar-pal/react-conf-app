import { Button } from '@/components/button'
import { useOpenWebBrowser } from '@/hooks/useOpenWebBrowser'
import { Text, View } from 'react-native'

export function LiveStreamInfo() {
  const openWebBrowserAsync = useOpenWebBrowser()
  const handlePress = () => {
    openWebBrowserAsync('https://conf.react.dev/#newsletter')
  }

  return (
    <View className="bg-background-element mx-4 mb-4 items-center rounded-[32px] p-6">
      <View className="border-text-secondary mb-4 flex-row items-center justify-center gap-2 rounded-[32px] border-2 px-2 py-1 dark:border-white">
        <View className="bg-text-secondary size-2 rounded-[32px] dark:bg-white" />
        <Text className="text-text-secondary text-sm font-semibold dark:text-white">
          Live Stream
        </Text>
      </View>
      <Text className="text-text-secondary mb-6 text-center text-base font-medium dark:text-white">
        Join React Conf from anywhere with our free live stream access. Watch
        all the talks remotely.
      </Text>
      <Button onPress={handlePress} title="Sign up" />
    </View>
  )
}
