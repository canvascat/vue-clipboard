# vue-clipboard

A simple vue3 binding for clipboard.js


## Usage

For vue-cli user:

```js
import { createApp } from 'vue'
import VueClipboard from 'vue-clipboard'
import App from './App.vue'

createApp(App).use(VueClipboard).mount('#app')
```

```html
<script src="https://unpkg.com/vue@next"></script>
<script src="lib/vue-clipboard.umd.js"></script>
<script>
Vue.createApp({
  // ...
}).use(vueClipboard.default)
</script>
```
