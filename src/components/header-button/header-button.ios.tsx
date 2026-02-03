import { Button, Host, Image } from '@expo/ui/swift-ui'
import { buttonStyle, frame } from '@expo/ui/swift-ui/modifiers'
import type { HeaderButtonProps } from './types'

const SIZE = 34

export function HeaderButton({
  imageProps,
  buttonProps,
  style
}: HeaderButtonProps) {
  return (
    <Host matchContents style={[{ height: SIZE, width: SIZE }, style]}>
      <Button
        {...buttonProps}
        modifiers={[buttonStyle('glass'), ...(buttonProps?.modifiers || [])]}
      >
        <Image
          {...imageProps}
          systemName={imageProps?.systemName || 'xmark'}
          color={imageProps?.color || 'primary'}
          size={imageProps?.size || 24}
          modifiers={[
            frame({ height: SIZE }),
            ...(imageProps?.modifiers || [])
          ]}
        />
      </Button>
    </Host>
  )
}
