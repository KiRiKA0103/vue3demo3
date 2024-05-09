import type { Course, Teacher, Classroom } from "@/type/Type"
import { useGlobalStore } from "@/store/globalStore"
import { useCourseStore } from '@/store/courseStore'
import { listClassrooms, listCourses, listTeachers } from '@/dataSource/data'
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
  // const resp = await usePost<{ teacher: Teacher }>('login', user)
  const teacher = listTeachers().find(teacher => teacher.username == user.username && teacher.password == user.password)
  if (!teacher) {
    openMessageBox('账号密码错误')
  }
  const token = teacher?.username + 'abcg1234qwerqawsed';
  token && sessionStorage.setItem('token', token)
  const teacherS = useGlobalStore().teacherS
  teacher && (teacherS.value = teacher)
  sessionStorage.setItem('teacher', JSON.stringify(teacherS.value))
  router.push({ path: '/' })
}

export const listCoursesService = async (tid: number) => {
  //const resp = await useGet<{ courses: Course[] }>(`teacher/${tid}/courses`)
  const courses: Course[] = listCourses().filter(course => course.tid == tid)

  return courses ?? []
}

export const listClassroomsService = async () => {
  //const resp = await useGet<{ classrooms: Classroom[] }>('classrooms')
  const classrooms: Classroom[] = listClassrooms()

  return classrooms ?? []
}


export const createCourseService = async (course: Course) => {
  //const resp = await usePost<{}>('course/add', course)
  course.cid = useCourseStore().courses.value.sort((a, b) => b.cid! - a.cid!)[0].cid! + 1
  useCourseStore().courses.value.unshift(course)
  return '创建成功'
}