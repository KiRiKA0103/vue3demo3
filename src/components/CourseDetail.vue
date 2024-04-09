<script lang="ts" setup>
import { computed } from 'vue'
import type { Course, Booking } from '@/type/Type'
import { useClassroomStore } from '@/store/classroomStore'
import { useCourseStore } from '@/store/courseStore'

const useClassroom = useClassroomStore()
const useCourse = useCourseStore()

const course = useCourse.courseS

const classrooms = useClassroom.classrooms

const courseDetailBookings = () => {
    const bookings: Booking[] = []
    classrooms.value.forEach(classroom => {
        if (classroom.bookings != null && classroom.bookings.length > 0) {
            classroom.bookings.forEach(booking => {
                if (booking.course?.cid == course.value.cid) {
                    bookings.push(booking)
                }
            })
        }
    })

    return bookings
}

const bookingDescriptions = computed(() => (booking:Booking) => {
    const timeArr = ['78节','12节', '34节', '56节',]
    const weekArr = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']

    return `${booking.classname}教室 ${weekArr[Math.ceil(booking.time!/4)]}${timeArr[booking.time!%4]} 第${booking.week}周`
})

</script>
<template>
    <el-descriptions column="2">
        <el-descriptions-item label="课程名称：">{{ course.cname }}</el-descriptions-item>
        <el-descriptions-item label="实验课时：">{{ course.duration }}</el-descriptions-item>
    </el-descriptions>
    <el-descriptions column="1">
        <el-descriptions-item label="已预约：" v-for="booking in courseDetailBookings()">{{ bookingDescriptions(booking) }}</el-descriptions-item>
    </el-descriptions>
</template>
<style scoped></style>