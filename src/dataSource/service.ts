import type { Course, Teacher, Classroom } from "@/type/Type"
import { useGet, usePost } from "@/fetch"
import { useGlobalStore } from "@/store/globalStore"
import router from "@/router"
import { ElMessage, ElMessageBox } from 'element-plus'
import type { Action } from 'element-plus'


export const openMessageBox = (message: string) => {
  ElMessageBox.alert(message, 'Title', {
    // if you want to disable its autofocus
    // autofocus: false,
    confirmButtonText: '确认',
    callback: (action: Action) => {
      ElMessage({
        type: 'info',
        message: `action: ${action}`,
      })
    },
  })
}


export const loginService = async (user: { username: string; password: string }) => {
  const resp = await usePost<{ teacher: Teacher }>('login', user)

  const token = resp.response.value?.headers.get('token')
  token && sessionStorage.setItem('token', token)

  const teacherS = useGlobalStore().teacherS

  resp.data.value?.data.teacher && (teacherS.value = resp.data.value?.data.teacher)

  sessionStorage.setItem('teacher', JSON.stringify(teacherS.value))

  router.push({ path: '/' })
}

export const listCourses = async (tid: number) => {
  const resp = await useGet<{ courses: Course[] }>(`teacher/${tid}/courses`)
  // console.log(resp.data.value?.data.courses)

  return resp.data.value?.data.courses ?? []
}

export const listClassrooms = async () => {

  const resp = await useGet<{ classrooms: Classroom[] }>('classrooms')

  return resp.data.value?.data.classrooms ?? []
}


export const createCourse = async (course: Course) => {
  const resp = await usePost<{}>('course/add', course)

  return resp.data.value?.message
}