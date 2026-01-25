import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { Image, ImageStyle } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import * as Linking from 'expo-linking'
import { StyleSheet, View } from 'react-native'
import { Pressable } from 'react-native-gesture-handler'
import { ThemedText, ThemedView, useThemeColor } from './Themed'

import { theme } from '@/theme'

const venueAddress = '101 Montelago Blvd, Henderson, NV 89011'
const venueName = 'The Westin Lake Las Vegas Resort & Spa'

const BOTTOM_OFFSET = 50

export function VenueInfo() {
  const imageStyle: ImageStyle = { width: '100%', aspectRatio: 1 }

  const onOpenVenue = () => {
    Linking.openURL(
      `https://www.google.com/maps?q=${venueName}, ${venueAddress}`
    )
  }

  const iconColor = useThemeColor(theme.color.textSecondary)

  const backgroundColor = useThemeColor(theme.color.backgroundElement)

  return (
    <Pressable style={styles.container} onPress={onOpenVenue}>
      <View>
        <View style={styles.imageContainer}>
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
        <ThemedView
          style={styles.venueDetails}
          color={theme.color.backgroundElement}
        >
          <ThemedText className="text-sm" color={theme.color.textSecondary}>
            Venue
          </ThemedText>
          <View style={styles.venueName}>
            <ThemedText className="text-lg font-semibold">
              The Westin Lake
            </ThemedText>
            <ThemedText className="text-lg font-semibold">
              Las Vegas Resort & Spa
            </ThemedText>
          </View>
          <View style={styles.venueAddress}>
            <MaterialCommunityIcons
              name="map-marker-radius"
              size={16}
              color={iconColor}
            />
            <ThemedText className="text-xs" color={theme.color.textSecondary}>
              {venueAddress}
            </ThemedText>
          </View>
        </ThemedView>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: BOTTOM_OFFSET,
    marginHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 24
  },
  imageContainer: {
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    overflow: 'hidden'
  },
  venueAddress: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 1,
    justifyContent: 'center'
  },
  venueDetails: {
    alignItems: 'center',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    bottom: -BOTTOM_OFFSET,
    left: 0,
    paddingBottom: 24,
    position: 'absolute',
    right: 0
  },
  venueName: {
    alignItems: 'center',
    marginBottom: 16
  }
})
