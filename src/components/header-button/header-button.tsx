import { MaterialCommunityIcons, Pressable } from '@/components/styled'
import { useCSSVariable } from 'uniwind'
import type { HeaderButtonProps } from './types'

const sfToMaterialIcon: Record<string, string> = {
  xmark: 'close',
  'bookmark.fill': 'bookmark',
  bookmark: 'bookmark-outline'
}

export function HeaderButton({ imageProps, buttonProps }: HeaderButtonProps) {
  const mutedColor = useCSSVariable('--color-muted') as string

  return (
    <Pressable
      hitSlop={20}
      onPress={buttonProps?.onPress}
      className="transition-transform duration-300 ease-out active:scale-[0.8]"
    >
      <MaterialCommunityIcons
        name={
          (sfToMaterialIcon[imageProps?.systemName ?? ''] ?? 'close') as any
        }
        size={24}
        color={imageProps?.color || mutedColor}
      />
    </Pressable>
  )
}
