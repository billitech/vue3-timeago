# vue3-timeago

Forked from https://github.com/runkids/vue2-timeago

- Added v-slot scope
- removed css
- Reduce unpacked size by 88% from 151 kB to 18.4 kB (as of vue3-timeago v1.0.3 and vue2-timeago v1.2.3)

[![vue3](https://img.shields.io/badge/vue-3.x-brightgreen.svg)](https://vuejs.org/) [![npm](https://img.shields.io/npm/v/vue3-timeago.svg)](https://www.npmjs.com/package/vue3-timeago) [![npm](https://img.shields.io/npm/dt/vue3-timeago.svg)](https://www.npmjs.com/package/vue3-timeago) [![npm](https://img.shields.io/npm/l/vue3-timeago.svg)](https://github.com/runkids/vue3-timeago/blob/master/LICENSE)

- Localization supported
- Show tooltip
- Auto refresh time
- When time refresh call a customizable function
- Formats a date/timestamp to:
  - just now
  - 5m
  - 3h
  - 2 days ago
  - 2017-08-03
- Rules:
  - less than 1 minute , show `just now`
  - 1 minute ~ 1 hour , show `** minutes ago`
  - 1 hour ~ 1 day , show `** hours ago`
  - 1 day ~ 1 month( 31 days ) , show `** days ago`
  - more than 1 month( 31 days ) , show `yyyy-mm-dd hh:mm`

## Installation

Get from npm / yarn:

```js
npm i vue3-timeago
```

```js
yarn add vue3-timeago
```

## Usage

Use this inside your app:

```html
<template>
  <time-ago refresh long locale="en" :datetime="new Date()">
    <template v-slot="{ timeago }">
      <span class="text-gray-600 text-sm">
        {{ timeago }}
      </span>
    </template>
  </time-ago>
</template>

<script>
  import TimeAgo from "vue3-timeago";

  export default {
    name: "app",
    components: {
      TimeAgo
    }
  };
</script>
```
