# Tailwind Capsize <!-- omit in toc -->

TailwindCSS plugin to generate utilities that trim the whitespace above and
below web typography. Based on the great work in the
[Capsize](https://github.com/seek-oss/capsize) library.

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
  - [With @apply](#with-apply)
  - [Trimming by default](#trimming-by-default)
    - [Opting out of trimming](#opting-out-of-trimming)
- [Fluid Utilities](#fluid-utilities)
  - [Generated classes](#generated-classes)
  - [Recommendations](#recommendations)
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
<p class="font-sans text-xl leading-normal capsize">Trimmed Text</p>

<!-- Or rely on the cascade -->
<div class="font-sans text-xl leading-normal">
  <p class="capsize">Trimmed</p>
  <p class="capsize">Also trimmed</p>
</div>
```

### With @apply

Use the `@apply` directive normally:

```css
p {
  @apply capsize font-sans text-xl leading-none;
}
```

### Trimming by default

This plugin currently does not support applying the `capsize` class by default.
If you wish to trim text elements by default, consider using `@apply`:

```css
:where(h1, h2, h3, h4, h5, h6, p) {
  @apply capsize;
}
```

#### Opting out of trimming

If you've applied trimming higher up in the cascade, you can undo trimming via
the `no-capsize` utility.

```css
:where(.applies-capsize > p) {
  @apply capsize;
}
```

```html
<div class="applies-capsize">
  <p class="no-capsize">I will not be trimmed!</p>
</div>
```

## Fluid Utilities

This plugin supports "fluid" typography with `clamp()` as described in this
[Smashing Magazine](https://www.smashingmagazine.com/2022/01/modern-fluid-typography-css-clamp/)
post.

> Opting-out of trimming via `no-capsize` is also available for fluid
> typography.

```html
<!-- Use on an element directly -->
<p
  class="font-sans leading-normal from-text-sm to-text-2xl screen-sm-to-xl capsize-fluid"
>
  Trimmed Fluid Text
</p>

<!-- Or rely on the cascade -->
<div class="font-sans leading-normal from-text-sm to-text-2xl screen-sm-to-xl">
  <p class="capsize-fluid">Trimmed</p>
  <p class="capsize-fluid">Also trimmed</p>
</div>
```

### Generated classes

| **Class**         |  **Theme Key**   | **Description**                                                                               |
| ----------------- | :--------------: | --------------------------------------------------------------------------------------------- |
| `from-text-[]`    | `theme.fontSize` | Specify a font size to start with. Must be in `px` or `rem` units. Supports arbitrary values. |
| `to-text-[]`      | `theme.fontSize` | Specify a font size to end with. Must be in `px` or `rem` units. Supports arbitrary values.   |
| `screen-[]-to-[]` | `theme.screens`  | Specify screen sizes from your config to fluidly scale between.                               |

### Recommendations

If you are looking to scale up a font size from "mobile", you may wish to add a
"base" screen size to your Tailwind config.

Check out the
[Tailwind docs](https://tailwindcss.com/docs/screens#adding-smaller-breakpoints)
on adding small breakpoints.

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
      fluidUtils: true,
    }),
  ],
}
```

| **Option**       | **Type**  | **Description**                                                                                                            | **Default** |
| ---------------- | :-------: | -------------------------------------------------------------------------------------------------------------------------- | :---------: |
| `className`      | `string`  | Class used to apply the "trimming styles" to an element. Also affects the `no-` and `-fluid` utilities.                    | `"capsize"` |
| `rootFontSize`   | `number`  | `font-size` specified in `:root`. Used to calculate correct `rem` units.                                                   |    `16`     |
| `rootLineHeight` | `number`  | `line-height` specified in `:root`. Used as line height in trimming calculations when a `leading-` class is not specified. |    `1.2`    |
| `fluidUtils`     | `boolean` | Enable or disable the generation of fluid typography utilities.                                                            |   `true`    |

## Limitations

- Only accepts `rem`, `px`, or plain `number`s for `theme.fontSize` values in a
  Tailwind theme.
- Only accepts `unitless` values for `theme.lineHeight` values in a Tailwind
  theme.

## Plain CSS Version

If you are looking for a "plain" CSS version of this plugin, checkout these
Gists:

- [Normal](https://gist.github.com/asyarb/ec0bb47ebe31f4953e3b31eedee6058f)
- [Fluid](https://gist.github.com/asyarb/162bf0a8b5d238de01bd2832094727ad)

## License

MIT.
