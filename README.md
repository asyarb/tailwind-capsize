# Tailwind Capsize <!-- omit in toc -->

TailwindCSS plugin to generate utilities that trim the whitespace above and
below web typography using the [Capsize](https://github.com/seek-oss/capsize)
library.

- [Installation](#installation)
- [Configuration](#configuration)
- [Output](#output)

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
  remFontSize: number // The base px font-size. Defaults to 16.
  fontFamilies: {
    // A valid key from the `fontFamily` key in your config.
    [fontFamily: string]: {
      // The metrics from the Capsize website.
      ascent: number
      descent: number
      lineGap: number
      unitsPerEm: number
      capHeight: number
    }
  }
}
```

See below for an example Tailwind config file:

```js
// tailwind.config.js
module.exports = {
  // The rest of your config...
  theme: {
    fontSize: {
      base: '1rem',
    },
    lineHeight: {
      solid: 1,
    },
    fontFamily: {
      sans: "'Inter var', system-ui'",
    },

    capsize: {
      remFontSize: 16,
      fontFamilies: {
        sans: {
          capHeight: 2048,
          ascent: 2728,
          descent: -680,
          lineGap: 0,
          unitsPerEm: 2816,
        },
      },
    },
  },
  plugins: [require('@asyarb/tailwind-capsize')],
}
```

## Output

Your new capsize utility classes will be named according to the `fontFamily`, `fontSize`, and `lineHeight` keys in your theme. With those keys, this plugin will create classes in the following format:

```
.fontFamily-fontSize-lineHeight
```

Using the example config from above, we'll generate the following utility class:

```
.sans-base-solid
```

This plugin will also generate responsive variants, so you can prefix these new utilities with the usual `sm:`, `md:` or whatever is present in your config's `screens` key.
