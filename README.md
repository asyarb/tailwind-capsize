# Tailwind Capsize <!-- omit in toc -->

TailwindCSS plugin to generate utilities that trim the whitespace above and
below web typography. Based on the great work in the
[Capsize](https://github.com/seek-oss/capsize) library.

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
  - [Usage with @apply](#usage-with-apply)
- [Options](#options)
- [Limitations](#limitations)
- [Plain CSS Version](#plain-css-version)
- [License](#license)

## Installation

```bash
# npm
npm i --save-dev @asyarb/tailwindcss-capsize
```

## Configuration

To get started, add a `capsize` key to your Tailwind theme. The value for
`capsize` should be an object whose keys map to the keys in `theme.fontFamily`
with values that are "font metrics".

See below for an example config:

```js
// tailwind.config.js
module.exports = {
  content: [],

  theme: {
    fontFamily: {
      sans: ['Inter var', 'system-ui'],
    },

    capsize: {
      metrics: {
        sans: require('@capsizecss/metrics/inter'),
      },
    },
  },

  plugins: [require('@asyarb/tailwind-capsize')],
}
```

To learn how to get the metrics for your font, please reference the
[Capsize Website](https://seek-oss.github.io/capsize/).

## Usage

Usage is best explained with an example:

```html
<!-- Use on an element directly -->
<p class="capsize font-sans text-xl leading-normal">Trimmed Text</p>

<!-- Or rely on the cascade -->
<div class="font-sans text-xl leading-normal">
  <p class="capsize">Trimmed</p>
  <p class="capsize">Also trimmed</p>
</div>
```

### Usage with @apply

Use the `@apply` directive normally:

```css
p {
  @apply capsize font-sans text-xl leading-none;
}
```

## Options

This plugin supports a couple of configuration options. You can supply them as
shown:

```js
// tailwind.config.js
module.exports = {
  // ...rest of your theme
  plugins: [
    require('@asyarb/tailwind-capsize')({
      className: 'trim',
      rootFontSize: 10,
      rootLineHeight: 1.5,
    }),
  ],
}
```

| **Option**       | **Type** | **Description**                                                                                               | **Default** |
| ---------------- | :------: | ------------------------------------------------------------------------------------------------------------- | :---------: |
| `className`      | `string` | Class used to apply the "trimming styles" to an element.                                                      | `"capsize"` |
| `rootFontSize`   | `number` | `font-size` specified in `:root`. Used to calculate correct `rem` units.                                      |    `16`     |
| `rootLineHeight` | `number` | `line-height` specified in `:root`. Used as the default line height when a `leading-` class is not specified. |    `1.2`    |

## Limitations

- Only accepts `rem`, `px`, or plain `number`s for `theme.fontSize` values in a
  Tailwind theme.
- Only accepts `unitless` values for `theme.lineHeight` values in a Tailwind
  theme.

## Plain CSS Version

If you are looking for a "plain" CSS version of this plugin, checkout this
[Gist](https://gist.github.com/asyarb/ec0bb47ebe31f4953e3b31eedee6058f).

## License

MIT.
