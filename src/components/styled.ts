import FeatherBase from '@react-native-vector-icons/feather/static'
import IoniconsBase from '@react-native-vector-icons/ionicons/static'
import MaterialCommunityIconsBase from '@react-native-vector-icons/material-design-icons/static'
import MaterialIconsBase from '@react-native-vector-icons/material-icons/static'
import { GlassView as ExpoGlassView } from 'expo-glass-effect'
import { Image as ExpoImage } from 'expo-image'
import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient'
import { SymbolView as ExpoSymbolView } from 'expo-symbols'
import {
  Pressable as RNGHPressable,
  ScrollView as RNGHScrollView
} from 'react-native-gesture-handler'
import { withUniwind } from 'uniwind'

export const Feather = withUniwind(FeatherBase)
export const GlassView = withUniwind(ExpoGlassView)
export const Image = withUniwind(ExpoImage)
export const Ionicons = withUniwind(IoniconsBase)
export const LinearGradient = withUniwind(ExpoLinearGradient)
export const MaterialCommunityIcons = withUniwind(MaterialCommunityIconsBase)
export const MaterialIcons = withUniwind(MaterialIconsBase)
export const Pressable = withUniwind(RNGHPressable)
export const ScrollView = withUniwind(RNGHScrollView)
export const SymbolView = withUniwind(ExpoSymbolView)
