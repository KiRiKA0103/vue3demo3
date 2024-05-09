import { ref } from 'vue'
import { createGlobalState } from "@vueuse/core"
import type { Course, Teacher } from "@/type/Type"
import { openMessageBox, createCourseService } from "@/dataSource/service"


export const useCourseStore = createGlobalState(() => {
  const courseForm = ref<Course>({})

  const courses = ref<Course[]>([])

  const courseS = ref<Course>({})

  const addCourse = async () => {
    if (!sessionStorage.getItem('teacher')) {
      openMessageBox('请先登录')
      return
    }
    if (courseForm.value.cname == null || courseForm.value.cname.trim() == '') {
      openMessageBox('请填写课程名称')
      return
    }
    if (courseForm.value.duration == null || courseForm.value.duration == 0) {
      openMessageBox('请填写实验课时')
      return
    }
    const teacher: Teacher = JSON.parse(sessionStorage.getItem('teacher') ?? '')
    courseForm.value.tid = teacher.tid

    const message = await createCourseService(courseForm.value)
    message && openMessageBox(message)

    courseForm.value = {}
  }

  const delCourse = async (cid:number) => {
    
  }

  return {
    courseForm,
    courses,
    courseS,
    addCourse,
    delCourse
  }
})