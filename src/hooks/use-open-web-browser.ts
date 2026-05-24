import * as WebBrowser from 'expo-web-browser'
import { useCSSVariable, useUniwind } from 'uniwind'

/**
 * Hook that provides a function to open URLs in the system browser.
 * Uses CSS variables from global.css for theme-aware colors.
 */
export function useOpenWebBrowser() {
  const [backgroundColor, foregroundColor] = useCSSVariable([
    '--color-background',
    '--color-foreground'
  ]) as [string, string]
  const { theme } = useUniwind()

  const openBrowserAsync = (url: string) => {
    WebBrowser.openBrowserAsync(url, {
      enableBarCollapsing: true,
      ...(theme === 'dark'
        ? {
            toolbarColor: backgroundColor,
            controlsColor: foregroundColor
          }
        : {
            controlsColor: foregroundColor
          })
    })
  }

  return openBrowserAsync
}
