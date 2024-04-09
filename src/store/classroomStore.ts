import { ref } from 'vue'
import { createGlobalState } from "@vueuse/core"
import type { Classroom } from "@/type/Type"

export const useClassroomStore = createGlobalState(() => {
  const classrooms = ref<Classroom[]>([])

  const classroomS = ref<Classroom>()

  const weekS = ref<number[]>([])

  const timeS = ref<number>()

  return {
    classrooms,
    classroomS,
    weekS,
    timeS
  }
})