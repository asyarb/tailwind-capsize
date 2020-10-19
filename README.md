# Tailwind Capsize

TailwindCSS plugin to generate utilities that trim the whitespace above and
below web typography using the [Capsize](https://github.com/seek-oss/capsize)
library.

## Installation

```bash
# npm
npm i --save-dev @asyarb/tailwindcss-capsize

# yarn
yarn add -D @asyarb/tailwindcss-capsize
```

## Configuration

To get started with this plugin, add a `capsize` key to your Tailwind `theme`
in `tailwind.config.js`. The value for `capsize` should be an array of
objects that adhere to the following structure:

```ts
interface Structure {
  fontFamily: string // A key from your theme's `fontFamily` key.
  fontMetrics: {
    // The metrics for your `fontFamily` from the Capsize website/fontkit.
    ascent: number
    descent: number
    lineGap: number
    unitsPerEm: number
    capHeight: number
  }
  fontSets: {
    // The set of fonts you wish to generate Tailwind Utilities of.
    fontSize: number // In pixels
    leading: number // In pixels
  }[]
}
```

See below for an example Tailwind config file:

```js
// tailwind.config.js
module.exports = {
  // The rest of your config...
  theme: {
    fontFamily: {
      sans: "'Inter var', system-ui'",
    },
    capsize: [
      {
        fontFamily: 'sans',
        fontMetrics: {
          capHeight: 2048,
          ascent: 2728,
          descent: -680,
          lineGap: 0,
          unitsPerEm: 2816,
        },
        fontSets: [
          {
            fontSize: 16,
            leading: 16 * 1.5,
          },
          {
            fontSize: 24,
            leading: 24 * 1.15,
          },
        ],
      },
    ],
  },
  plugins: [require('@asyarb/tailwind-capsize')],
}
```
