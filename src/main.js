import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ECharts from 'vue-echarts' // refers to components/ECharts.vue in webpack

import ajax from '@/components/Ajax'

// import ECharts modules manually to reduce bundle size
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'

import { Button, Select, Option } from 'element-ui';

// register component to use
Vue.component('v-chart', ECharts)

Vue.component(Button.name, Button);
Vue.component(Select.name, Select);
Vue.component(Option.name, Option);

Vue.config.productionTip = false
Vue.prototype.$ajax = ajax

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
