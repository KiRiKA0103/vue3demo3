import { openMessageBox } from '@/dataSource/service'
import { useGlobalStore } from '@/store/globalStore'
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/views/HomeView.vue'),
      children: [
        {
          path: 'teacher',
          name: 'teacher',
          component: () => import('@/views/TeacherVue.vue')
        },
        {
          path: 'course',
          name: 'course',
          component: () => import('@/views/CourseVue.vue')
        },
        {
          path: 'booking',
          name: 'booking',
          component:()=>import('@/components/BookingCourse.vue')
        },
        {
          path: '',
          redirect:'/teacher'
        }
      ]
    },
    {
      path: '/login',
      component: () => import('@/views/LoginView.vue')
    }
  ]
})

router.beforeEach((to, from) => {
  // console.log(to)
  if (to.path === '/login' || sessionStorage.getItem('token')) {
    return true
  }
  const store = useGlobalStore()
  store.exceptionS.value = '请先登录'
  openMessageBox('请先登录!(默认账号:root 默认密码:123456)')

  return '/login'
})

export default router
