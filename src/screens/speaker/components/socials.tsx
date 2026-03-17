import { useOpenWebBrowser } from '@/hooks'
import { Speaker } from '@/types'
import Feather from '@expo/vector-icons/build/Feather'
import Ionicons from '@expo/vector-icons/build/Ionicons'
import { Image } from 'expo-image'
import { View } from 'react-native'
import { useCSSVariable } from 'uniwind'
import { IconButton } from './icon-button'

export function Socials({ speaker }: { speaker: Speaker }) {
  const iconColor = useCSSVariable('--color-foreground') as string
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
                  style={{ height: 20, width: 20 }}
                  tintColor={iconColor}
                />
              )
            }
            case 'LinkedIn': {
              return (
                <Image
                  source={require('@/assets/images/linkedin.svg')}
                  style={{ height: 20, width: 20 }}
                  tintColor={iconColor}
                />
              )
            }
            case 'Blog': {
              return (
                <Ionicons
                  name="reader"
                  size={18}
                  color={iconColor}
                  style={{ height: 20, width: 20 }}
                />
              )
            }
            case 'Company_Website': {
              return (
                <Feather
                  name="link"
                  size={18}
                  color={iconColor}
                  style={{ height: 20, width: 20 }}
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
