import { useOpenWebBrowser } from '@/hooks/useOpenWebBrowser'
import { Image as ExpoImage } from 'expo-image'
import { Pressable, Text, View } from 'react-native'
import { withUniwind } from 'uniwind'

const Image = withUniwind(ExpoImage)

const sponsors = {
  amazon: {
    image: require('@/assets/sponsors/platinum-amazon.svg'),
    url: 'https://www.developer.amazon.com/'
  },
  agGrid: {
    image: require('@/assets/sponsors/gold-ag-grid.svg'),
    url: 'https://www.ag-grid.com/'
  },
  mui: {
    image: require('@/assets/sponsors/gold-mui.svg'),
    url: 'https://mui.com/'
  },
  resend: {
    image: require('@/assets/sponsors/gold-resend.svg'),
    url: 'https://resend.com/'
  },
  revenueCat: {
    image: require('@/assets/sponsors/gold-revenue-cat.svg'),
    url: 'https://www.revenuecat.com/'
  },
  vercel: {
    image: require('@/assets/sponsors/gold-vercel.svg'),
    url: 'https://vercel.com/'
  },
  expo: {
    image: require('@/assets/sponsors/gold-expo.svg'),
    url: 'https://expo.dev/'
  },
  redwood: {
    image: require('@/assets/sponsors/gold-redwood.svg'),
    url: 'https://rwsdk.com/'
  },
  livestream: {
    image: require('@/assets/sponsors/livestream-mux.svg'),
    url: 'https://www.mux.com/'
  },
  oldMission: {
    image: require('@/assets/sponsors/silver-old-mission.png'),
    url: 'https://www.oldmissioncapital.com/'
  },
  arcjet: {
    image: require('@/assets/sponsors/silver-arcjet.svg'),
    url: 'https://www.arcjet.com/'
  },
  meta: {
    image: require('@/assets/sponsors/organizer-meta.svg'),
    url: 'https://www.meta.com/'
  },
  callstack: {
    image: require('@/assets/sponsors/organizer-callstack.svg'),
    url: 'https://www.callstack.com/'
  },
  renderAtl: {
    image: require('@/assets/sponsors/silver-render-atl.png'),
    url: 'https://www.renderatl.com/'
  },
  infiniteRed: {
    image: require('@/assets/sponsors/silver-infinite-red.svg'),
    url: 'https://infinite.red/'
  }
}

type Sponsor = (typeof sponsors)[keyof typeof sponsors]

export function Sponsors() {
  return (
    <View className="bg-background pt-6">
      <Text className="text-text px-4 pb-4 text-lg font-semibold">
        Sponsors
      </Text>
      <View className="bg-background-element px-4 pb-4">
        <Text className="text-text-secondary py-4 text-base font-medium">
          Platinum
        </Text>
        <SponsorCard sponsor={sponsors.amazon} />
        <Text className="text-text-secondary py-4 text-base font-medium">
          Gold
        </Text>
        <View className="gap-4">
          <SponsorCard sponsor={sponsors.agGrid} />
          <SponsorCard sponsor={sponsors.mui} />
          <SponsorCard sponsor={sponsors.resend} />
          <SponsorCard sponsor={sponsors.revenueCat} />
          <SponsorCard sponsor={sponsors.vercel} />
          <SponsorCard sponsor={sponsors.expo} />
          <SponsorCard sponsor={sponsors.redwood} />
        </View>
        <Text className="text-text-secondary py-4 text-base font-medium">
          Livestream
        </Text>
        <SponsorCard sponsor={sponsors.livestream} />
        <Text className="text-text-secondary py-4 text-base font-medium">
          Silver
        </Text>
        <View className="gap-4">
          <SponsorCard sponsor={sponsors.oldMission} />
          <SponsorCard sponsor={sponsors.arcjet} />
          <SponsorCard sponsor={sponsors.renderAtl} />
          <SponsorCard sponsor={sponsors.infiniteRed} />
        </View>
        <Text className="text-text-secondary py-4 text-base font-medium">
          Organizers
        </Text>
        <View className="gap-4">
          <SponsorCard sponsor={sponsors.meta} />
          <SponsorCard sponsor={sponsors.callstack} />
        </View>
      </View>
    </View>
  )
}

function SponsorCard({ sponsor }: { sponsor: Sponsor }) {
  const openWebBrowserAsync = useOpenWebBrowser()
  return (
    <Pressable
      className="rounded-xl bg-white p-2"
      onPress={() => {
        openWebBrowserAsync(sponsor.url)
      }}
    >
      <Image source={sponsor.image} className="h-[58px]" contentFit="contain" />
    </Pressable>
  )
}
