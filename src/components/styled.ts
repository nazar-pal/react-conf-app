import MaterialCommunityIconsBase from '@react-native-vector-icons/material-design-icons/static'
import MaterialIconsBase from '@react-native-vector-icons/material-icons/static'
import { Image as ExpoImage } from 'expo-image'
import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient'
import { SymbolView as ExpoSymbolView } from 'expo-symbols'
import { withUniwind } from 'uniwind'

export const Image = withUniwind(ExpoImage)
export const LinearGradient = withUniwind(ExpoLinearGradient)
export const MaterialCommunityIcons = withUniwind(MaterialCommunityIconsBase)
export const MaterialIcons = withUniwind(MaterialIconsBase)
export const SymbolView = withUniwind(ExpoSymbolView)
