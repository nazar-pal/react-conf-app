import { Session } from '@/types'
import { StyleProp, ViewStyle } from 'react-native'
import { BaseBookmark } from './base-bookmark'

export function Bookmark({
  session
}: {
  session: Session
  size?: 'small' | 'large'
  style?: StyleProp<ViewStyle>
}) {
  return <BaseBookmark session={session} />
}
