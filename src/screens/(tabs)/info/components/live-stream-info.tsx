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
      <View className="border-muted dark:border-foreground mb-4 flex-row items-center justify-center gap-2 rounded-[32px] border-2 px-2 py-1">
        <View className="bg-muted dark:bg-foreground size-2 rounded-[32px]" />
        <Text className="text-muted dark:text-foreground text-sm font-semibold">
          Live Stream
        </Text>
      </View>
      <Text className="text-muted dark:text-foreground mb-6 text-center text-base font-medium">
        Join React Conf from anywhere with our free live stream access. Watch
        all the talks remotely.
      </Text>
      <Button onPress={handlePress} title="Sign up" />
    </View>
  )
}
