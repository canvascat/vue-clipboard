import ClipboardJS from 'clipboard'
import type { ObjectDirective, App } from 'vue'

export const VueClipboardConfig = {
  autoSetContainer: false,
  appendToBody: true // This fixes IE, see #50
}

export const VueClipboard: ObjectDirective = {
  beforeMount (el, binding) {
    if (binding.arg === 'success') {
      el._vClipboard_success = binding.value
    } else if (binding.arg === 'error') {
      el._vClipboard_error = binding.value
    } else {
      const clipboard = new ClipboardJS(el, {
        text: () => binding.value,
        action: () => binding.arg === 'cut' ? 'cut' : 'copy',
        container: VueClipboardConfig.autoSetContainer ? el : undefined
      })
      clipboard.on('success', (e) => {
        const callback = el._vClipboard_success
        typeof callback === 'function' && callback(e)
      })
      clipboard.on('error', (e) => {
        const callback = el._vClipboard_error
        typeof callback === 'function' && callback(e)
      })
      el._vClipboard = clipboard
    }
  },
  updated(el, binding) {
    if (binding.arg === 'success') {
      el._vClipboard_success = binding.value
    } else if (binding.arg === 'error') {
      el._vClipboard_error = binding.value
    } else {
      el._vClipboard.text = () => binding.value
      el._vClipboard.action = () => binding.arg === 'cut' ? 'cut' : 'copy'
    }
  },
  unmounted(el, binding) {
    if (binding.arg === 'success') {
      delete el._vClipboard_success
    } else if (binding.arg === 'error') {
      delete el._vClipboard_error
    } else {
      el._vClipboard.destroy()
      delete el._vClipboard
    }
  }
}

export function copyText (text: string, container?: Element): Promise<ClipboardJS.Event> {
  return new Promise((resolve, reject) => {
    const fakeElement = document.createElement('button')
    const clipboard = new ClipboardJS(fakeElement, {
      text: () => text,
      action: () => 'copy',
      container: container ?? document.body
    })
    clipboard.on('success', function (e) {
      clipboard.destroy()
      resolve(e)
    })
    clipboard.on('error', function (e) {
      clipboard.destroy()
      reject(e)
    })
    if (VueClipboardConfig.appendToBody) document.body.appendChild(fakeElement)
    fakeElement.click()
    if (VueClipboardConfig.appendToBody) document.body.removeChild(fakeElement)
  })
}

export default {
  install (app: App) {
    app.directive('clipboard', VueClipboard)
    app.config.globalProperties.$copyText = copyText
    app.config.globalProperties.$clipboardConfig = VueClipboardConfig
  },
  config: VueClipboardConfig
}

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $clipboardConfig: typeof VueClipboardConfig
    $copyText: typeof copyText
  }
}
