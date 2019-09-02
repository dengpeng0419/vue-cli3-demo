import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Index from './views/Index.vue'

Vue.use(Router)
// const path = process.env.NODE_ENV === 'production' ? 'vue-cli/' : '/'

export default new Router({
  mode: 'history',
  //base: process.env.BASE_URL,
  base: process.env.VUE_APP_ROUTE_PATH,
  routes: [
    {
      name: '',
      path: '/',
      component: Index,
      redirect: {
        name: 'home'
      },
      // 首页路由
      children: [
        {
          path: '/',
          name: 'home',
          component: Home
        },
        {
          path: '/target',
          name: 'Target',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('./views/Target.vue')
        },
        {
          path: '/human-resource',
          name: 'HumanResource',
          components: {
            homeView: () => import('./views/HumanResource.vue')
          }
        },
        {
          path: '/manage/index',
          name: 'manageIndex',
          components: {
            homeView:  () => import('./views/manage/Index.vue')
          }
        },
      ]
    },
    {
      path: '/employee-number',
      name: 'employeeNumber',
      component: () => import('./views/EmployeeNumber.vue')
    },
    {
      path: '/employee-trend',
      name: 'employeeTrend',
      component: () => import('./views/EmployeeTrend.vue')
    },
    {
      path: '/employee-change',
      name: 'employeeChange',
      component: () => import('./views/EmployeeChange.vue')
    },
    {
      path: '/employee-productivity',
      name: 'employeeProductivity',
      component: () => import('./views/EmployeeProductivity.vue')
    },
    {
      path: '/density-ranking',
      name: 'densityRanking',
      component: () => import('./views/EmployeeRanking.vue')
    },
    {
      path: '/hightech-ranking',
      name: 'hightechRanking',
      component: () => import('./views/EmployeeRanking.vue')
    },
    {
      path: '/all-ranking',
      name: 'allRanking',
      component: () => import('./views/EmployeeRanking.vue')
    },
    {
      path: '/staff-ranking',
      name: 'staffRanking',
      component: () => import('./views/EmployeeRanking.vue')
    },
    {
      path: '/staffon-ranking',
      name: 'staffonRanking',
      component: () => import('./views/EmployeeRanking.vue')
    },
    {
      path: '/asset-structure',
      name: 'assetStructure',
      component: () => import('./views/manage/AssetStructure.vue')
    },
    {
      path: '/asset-trend',
      name: 'assetTrend',
      component: () => import('./views/manage/AssetTrend.vue')
    },
    {
      path: '/opening-cash',
      name: 'openingCash',
      component: () => import('./views/manage/OpeningCash.vue')
    },
    {
      path: '/manage-profit',
      name: 'manageProfit',
      component: () => import('./views/manage/ManageProfit.vue')
    },
    {
      path: '/manage-cost',
      name: 'manageCost',
      component: () => import('./views/manage/ManageCost.vue')
    },
    {
      path: '/asset-overview',
      name: 'assetOverview',
      component: () => import('./views/manage/AssetOverview.vue')
    },
    {
      path: '/economy-increase',
      name: 'economyIncrease',
      component: () => import('./views/manage/EconomyIncrease.vue')
    },
    {
      path: '/profit-trend',
      name: 'profitTrend',
      component: () => import('./views/manage/ProfitTrend.vue')
    },
    {
      path: '/economy-trend',
      name: 'economyTrend',
      component: () => import('./views/manage/EconomyTrend.vue')
    },
    {
      path: '/asset-profit',
      name: 'assetProfit',
      component: () => import('./views/manage/AssetProfit.vue')
    },
    {
      path: '/asset-profit-trend',
      name: 'assetProfitTrend',
      component: () => import('./views/manage/AssetProfitTrend.vue')
    },
    {
      path: '/asset-debt',
      name: 'assetDebt',
      component: () => import('./views/manage/AssetDebt.vue')
    },
    {
      path: '/asset-debt-trend',
      name: 'assetDebtTrend',
      component: () => import('./views/manage/AssetDebtTrend.vue')
    },
  ]
})
