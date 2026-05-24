import { useState } from 'react'
import { View } from 'react-native'

import { Image } from './styled'
import { cn } from '../utils/cn'

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
  className,
  animated
}: {
  profilePicture?: string | null
  size?: SpeakerImageSize
  className?: string
  animated?: boolean
}) {
  const [isLoading, setIsLoading] = useState(false)

  const { className: sizeClassName, logoClassName } = sizeVariants[size]

  const placeholder = (
    <View
      className={cn(
        'bg-accent absolute inset-0 items-center justify-center',
        sizeClassName
      )}
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
        'border-divider mr-3 overflow-hidden rounded-full border',
        sizeClassName,
        className
      )}
    >
      {profilePicture ? (
        <Image
          className={cn('absolute inset-0', sizeClassName)}
          source={{ uri: profilePicture }}
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
