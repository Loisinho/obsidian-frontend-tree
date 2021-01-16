import Vue from 'vue'
import App from './App.vue'

// Primevue theme, styles & icons
import 'primevue/resources/themes/nova-vue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
