import { MaterialCommunityIcons, SymbolView } from '@/components/styled'
import { useBookmark } from '@/hooks'
import { Session } from '@/types'
import { Pressable } from 'react-native-gesture-handler'

export function BaseBookmark({ session }: { session: Session }) {
  const { toggleBookmark, isBookmarked } = useBookmark()
  const bookmarked = isBookmarked(session.id)

  return (
    <Pressable
      onPressIn={() => toggleBookmark(session)}
      className="-m-2 p-2 transition-transform duration-100 active:scale-[0.8]"
    >
      <SymbolView
        data-bookmarked={bookmarked}
        name={bookmarked ? 'bookmark.fill' : 'bookmark'}
        tintColorClassName="data-[bookmarked=true]:accent-accent data-[bookmarked=false]:accent-muted"
        fallback={
          <MaterialCommunityIcons
            data-bookmarked={bookmarked}
            name={bookmarked ? 'bookmark' : 'bookmark-outline'}
            size={28}
            colorClassName="data-[bookmarked=true]:accent-accent data-[bookmarked=false]:accent-muted"
          />
        }
      />
    </Pressable>
  )
}
