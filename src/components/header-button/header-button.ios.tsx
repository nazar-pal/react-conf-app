import { Button, Host } from '@expo/ui/swift-ui'
import { font, labelStyle, tint } from '@expo/ui/swift-ui/modifiers'
import type { HeaderButtonProps } from './types'

export function HeaderButton({
  imageProps,
  buttonProps,
  style
}: HeaderButtonProps) {
  return (
    <Host matchContents style={style}>
      <Button
        {...buttonProps}
        label=""
        systemImage={imageProps?.systemName || 'xmark'}
        modifiers={[
          labelStyle('iconOnly'),
          font({ size: 24 }),
          tint(imageProps?.color || 'primary'),
          ...(buttonProps?.modifiers || [])
        ]}
      />
    </Host>
  )
}
