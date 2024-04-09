<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import router from "@/router"
import type { Course } from '@/type/Type'
import { listCourses } from '@/dataSource/service'
import { useCourseStore } from '@/store/courseStore'
import { useGlobalStore } from '@/store/globalStore'

const useGlobal = useGlobalStore()
const useCourse = useCourseStore()

const courses = useCourse.courses

onMounted(async () => {
  if (courses.value.length <= 0) {
    courses.value = await listCourses(10001)
  }
})

const showBooking = async (course: Course) => {
  useCourse.courseS.value = course
  // useGlobal.bookingDrawer.value = true
  router.push({path:'/home/booking'})
}

</script>
<template>
  <el-table :data="courses" border style="width: 50%">
    <el-table-column fixed prop="cid" label="ID" width="120" align="center" />
    <el-table-column prop="cname" label="课程名称" align="center" />
    <el-table-column prop="duration" label="实验课时" width="120" align="center" />

    <el-table-column fixed="right" label="操作" width="120" align="center">
      <template v-slot="scope">
        <el-button link type="success" size="small" @click="showBooking(scope.row)">预约</el-button>
        <el-button link type="danger" size="small" @click="useCourse.delCourse(scope.row.cid)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<style scoped></style>
