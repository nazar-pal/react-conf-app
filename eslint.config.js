const { defineConfig, globalIgnores } = require('eslint/config')
const expoConfig = require('eslint-config-expo/flat')
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended')
const betterTailwindcss = require('eslint-plugin-better-tailwindcss')

module.exports = defineConfig([
  globalIgnores(['dist/*', 'ios/*', 'android/*', 'lib/*']),
  expoConfig,
  eslintPluginPrettierRecommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: { 'better-tailwindcss': betterTailwindcss },
    settings: {
      'better-tailwindcss': {
        entryPoint: 'src/global.css',
        callees: ['cn', 'clsx', 'twMerge', 'useResolveClassNames'],
        attributes: [
          'className',
          'contentContainerClassName',
          'colorClassName',
          'tintColorClassName',
          'placeholderTextColorClassName',
          'endFillColorClassName',
          'columnWrapperClassName',
          'imageClassName'
        ]
      }
    },
    rules: {
      'better-tailwindcss/enforce-canonical-classes': [
        'warn',
        { rootFontSize: 16, logical: false, ignore: ['^uw-', '^accent-'] }
      ],
      'better-tailwindcss/no-duplicate-classes': 'error',
      'better-tailwindcss/no-conflicting-classes': 'warn'
      // no-unknown-classes is disabled: incompatible with Uniwind's
      // `@layer theme { @variant light { --color-* } }` pattern — the v4
      // engine only reads tokens declared in top-level `@theme {}`.
    }
  }
])
