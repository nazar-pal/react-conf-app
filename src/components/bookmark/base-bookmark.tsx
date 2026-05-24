import { MaterialCommunityIcons, SymbolView } from '@/components/styled'
import { useBookmark } from '@/hooks'
import { Session } from '@/types'
import { Pressable } from 'react-native-gesture-handler'

export function BaseBookmark({ session }: { session: Session }) {
  const { toggleBookmark, isBookmarked } = useBookmark()
  const bookmarked = isBookmarked(session.id)
  const bookmarkColorClassName = bookmarked ? 'accent-accent' : 'accent-muted'

  return (
    <Pressable
      onPressIn={() => toggleBookmark(session)}
      className="-m-2 p-2 transition-transform duration-100 active:scale-[0.8]"
    >
      <SymbolView
        name={bookmarked ? 'bookmark.fill' : 'bookmark'}
        tintColorClassName={bookmarkColorClassName}
        fallback={
          <MaterialCommunityIcons
            name={bookmarked ? 'bookmark' : 'bookmark-outline'}
            size={28}
            colorClassName={bookmarkColorClassName}
          />
        }
      />
    </Pressable>
  )
}
