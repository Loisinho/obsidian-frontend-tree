import Vue from 'vue'
import App from './App.vue'

// Primevue Tree component
import Tree from 'primevue/tree';
Vue.component("Tree", Tree)

// Primevue theme, styles & icons
import 'primevue/resources/themes/nova-vue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
