import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { Image, ImageStyle } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import * as Linking from 'expo-linking'
import { StyleSheet, Text, View } from 'react-native'
import { Pressable } from 'react-native-gesture-handler'
import { useCSSVariable, withUniwind } from 'uniwind'

const StyledPressable = withUniwind(Pressable)

const venueAddress = '101 Montelago Blvd, Henderson, NV 89011'
const venueName = 'The Westin Lake Las Vegas Resort & Spa'

export function VenueInfo() {
  const imageStyle: ImageStyle = { width: '100%', aspectRatio: 1 }

  const onOpenVenue = () => {
    Linking.openURL(
      `https://www.google.com/maps?q=${venueName}, ${venueAddress}`
    )
  }

  const [iconColor, backgroundColor] = useCSSVariable([
    '--color-text-secondary',
    '--color-background-element'
  ]) as [string, string]

  return (
    <StyledPressable className="mx-4 mb-[50px] pt-6 pb-4" onPress={onOpenVenue}>
      <View>
        <View className="overflow-hidden rounded-t-[32px]">
          <Image
            source={require('@/assets/images/hotel.png')}
            style={imageStyle}
          />
        </View>
        <LinearGradient
          locations={[0.4, 0.7]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          colors={['transparent', backgroundColor]}
          style={StyleSheet.absoluteFillObject}
        />
        <View className="bg-background-element absolute right-0 -bottom-[50px] left-0 items-center rounded-b-[32px] pb-6">
          <Text className="text-text-secondary text-sm font-medium">Venue</Text>
          <View className="mb-4 items-center">
            <Text className="text-text text-lg font-semibold">
              The Westin Lake
            </Text>
            <Text className="text-text text-lg font-semibold">
              Las Vegas Resort & Spa
            </Text>
          </View>
          <View className="flex-row items-center justify-center gap-0.25">
            <MaterialCommunityIcons
              name="map-marker-radius"
              size={16}
              color={iconColor}
            />
            <Text className="text-text-secondary text-xs font-medium">
              {venueAddress}
            </Text>
          </View>
        </View>
      </View>
    </StyledPressable>
  )
}
