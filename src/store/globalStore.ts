import { ref } from 'vue'
import { createGlobalState } from "@vueuse/core"
import type { Teacher } from "@/type/Type"


export const useGlobalStore = createGlobalState(() => {
  const teacherS = ref<Teacher>()
  const exceptionS = ref('')

  const bookingDrawer = ref(false)
  const weekSelectDialog = ref(false)

  return {
    teacherS,
    exceptionS,
    bookingDrawer,
    weekSelectDialog
  }
})