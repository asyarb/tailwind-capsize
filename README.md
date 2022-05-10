# Tailwind Capsize <!-- omit in toc -->

TailwindCSS plugin to generate utilities that trim the whitespace above and
below web typography. Based on the great work in the
[Capsize](https://github.com/seek-oss/capsize) library.

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)

## Installation

```bash
# npm
npm i --save-dev @asyarb/tailwindcss-capsize
```

## Configuration

To get started, add a `capsize` key to your Tailwind theme. The value for
`capsize` should be an object whose keys map to the keys in the
`theme.fontFamily` with values that are "font metrics".

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
