import {
  Pressable as RNGHPressable,
  ScrollView as RNGHScrollView
} from 'react-native-gesture-handler'
import { withUniwind } from 'uniwind'

export const Pressable = withUniwind(RNGHPressable)
export const ScrollView = withUniwind(RNGHScrollView)
