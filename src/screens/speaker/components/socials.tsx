import { Image } from '@/components/styled/expo-image'
import { Feather } from '@/components/styled/react-native-vector-icons-feather'
import { Ionicons } from '@/components/styled/react-native-vector-icons-ionicons'
import { useOpenWebBrowser } from '@/hooks'
import { Speaker } from '@/types'
import { View } from 'react-native'
import { IconButton } from './icon-button'

export function Socials({ speaker }: { speaker: Speaker }) {
  const openWebBrowserAsync = useOpenWebBrowser()

  return (
    <View className="mb-6 flex-row justify-center">
      {speaker.links.map(link => {
        const icon = (() => {
          switch (link.linkType) {
            case 'Twitter': {
              return (
                <Image
                  source={require('@/assets/images/x.svg')}
                  className="size-5"
                  tintColorClassName="accent-foreground"
                />
              )
            }
            case 'LinkedIn': {
              return (
                <Image
                  source={require('@/assets/images/linkedin.svg')}
                  className="size-5"
                  tintColorClassName="accent-foreground"
                />
              )
            }
            case 'Blog': {
              return (
                <Ionicons
                  name="reader"
                  size={18}
                  colorClassName="accent-foreground"
                  className="size-5"
                />
              )
            }
            case 'Company_Website': {
              return (
                <Feather
                  name="link"
                  size={18}
                  colorClassName="accent-foreground"
                  className="size-5"
                />
              )
            }
          }
        })()

        if (!icon) {
          return null
        }

        return (
          <IconButton
            onPress={() => openWebBrowserAsync(link.url)}
            key={link.title}
          >
            {icon}
          </IconButton>
        )
      })}
    </View>
  )
}
