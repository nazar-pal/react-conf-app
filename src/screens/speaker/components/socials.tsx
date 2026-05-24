import { Image } from '@/components/styled'
import { useOpenWebBrowser } from '@/hooks'
import { Speaker } from '@/types'
import FeatherBase from '@react-native-vector-icons/feather/static'
import IoniconsBase from '@react-native-vector-icons/ionicons/static'
import { View } from 'react-native'
import { withUniwind } from 'uniwind'
import { IconButton } from './icon-button'

const Ionicons = withUniwind(IoniconsBase)
const Feather = withUniwind(FeatherBase)

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
