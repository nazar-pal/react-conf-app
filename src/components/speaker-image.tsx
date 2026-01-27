import { Image as ExpoImage } from 'expo-image'
import { useState } from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'
import { withUniwind } from 'uniwind'

import { cn } from '../utils/cn'

const Image = withUniwind(ExpoImage)

type SpeakerImageSize = 'small' | 'medium' | 'large' | 'xlarge'

const sizeVariants: Record<
  SpeakerImageSize,
  { className: string; logoClassName: string }
> = {
  small: { className: 'size-[42px]', logoClassName: 'size-5' },
  medium: { className: 'size-[60px]', logoClassName: 'size-[30px]' },
  large: { className: 'size-[96px]', logoClassName: 'size-[50px]' },
  xlarge: { className: 'size-[200px]', logoClassName: 'size-[100px]' }
}

export function SpeakerImage({
  profilePicture,
  size = 'medium',
  style,
  animated
}: {
  profilePicture?: string | null
  size?: SpeakerImageSize
  style?: ViewStyle
  animated?: boolean
}) {
  const [isLoading, setIsLoading] = useState(false)

  const { className: sizeClassName, logoClassName } = sizeVariants[size]

  const placeholder = (
    <View
      className={cn('bg-accent items-center justify-center', sizeClassName)}
      style={StyleSheet.absoluteFillObject}
    >
      <Image
        source={require('@/assets/images/reactlogo-white.png')}
        className={logoClassName}
      />
    </View>
  )

  return (
    <View
      className={cn(
        'border-divider mr-3 overflow-hidden rounded-full border bg-[rgba(255,255,255,0.15)] dark:bg-[rgba(0,0,0,0.15)]',
        sizeClassName
      )}
      style={style}
    >
      {profilePicture ? (
        <Image
          className={sizeClassName}
          source={{ uri: profilePicture }}
          style={StyleSheet.absoluteFillObject}
          transition={animated && isLoading ? 300 : 0}
          onLoadStart={() => setIsLoading(true)}
          onLoadEnd={() => setIsLoading(false)}
        />
      ) : (
        placeholder
      )}
    </View>
  )
}
