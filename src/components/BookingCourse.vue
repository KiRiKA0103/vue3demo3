<script lang="ts" setup>
import { ref, onMounted, watch, defineAsyncComponent } from 'vue'
import { listClassrooms } from '@/dataSource/service'
import { useGlobalStore } from '@/store/globalStore'
import { useClassroomStore } from '@/store/classroomStore'
import { useCourseStore } from '@/store/courseStore'

const WeekSelectDialog = defineAsyncComponent(() => import('@/components/WeekSelectDialog.vue'))
const CourseDetail = defineAsyncComponent(() => import('@/components/CourseDetail.vue'))

const useGlobal = useGlobalStore()
const useClassroom = useClassroomStore()
const useCourse = useCourseStore()

const classrooms = useClassroom.classrooms
const classroomR = useClassroom.classroomS
const timeR = useClassroom.timeS
const weekR = useClassroom.weekS
const courseR = useCourse.courseS

const selected = ref<string>()

onMounted(async () => {
    if (classrooms.value.length <= 0) {
        classrooms.value = await listClassrooms()
    }
})

// 监听教室选择
watch(selected, async () => {
    classroomR.value = classrooms.value.find((classroom) => classroom.classname == selected.value)
})

// 显示选择周数的对话框
const showWeekSelectDialog = (time: number) => {
    console.log(time)
    timeR.value = time
    weekR.value = classroomR.value?.bookings?.find((booking) => booking.time == time && booking.course?.cid == courseR.value?.cid)?.week ?? []
    useGlobal.weekSelectDialog.value = true
}

// 查询当前教室当前时间段预约情况
const getBookings = (time: number) => {
    timeR.value = time
    return classroomR.value?.bookings?.filter((booking) => booking.time == time)
}

</script>
<template>
    <CourseDetail />
    选择教室:
    <el-select v-model="selected" placeholder="选择教室" size="default" style="width: 80px">
        <el-option v-for="item in classrooms" :key="item.classname" :label="item.classname" :value="item.classname" />
    </el-select>
    <el-card v-show="classroomR != null">
        <div style="width: 100%">
            <div style="float: left; height: 30px; width: 14%; border: 1px solid #000;border-bottom: none; box-sizing: border-box"
                v-for="item in ['周一', '周二', '周三', '周四', '周五', '周六', '周日']">
                {{ item }}
            </div>
        </div>
        <div style="width: 100%">
            <div @click="showWeekSelectDialog(time)"
                style="position: relative;font-size: 12px;float: left;height: 150px;width: 14%;border: 1px solid #000;box-sizing: border-box;"
                v-for="time in 28">
                <template v-for="booking in getBookings(time)">
                    课程:{{ booking.course?.cname }}
                    <br />
                    周次:{{ booking.week }}
                    <hr />
                </template>
                <el-button @click="showWeekSelectDialog(time)" size="small"
                    style="position: absolute; bottom: 0; left: 0">
                    预约
                </el-button>
            </div>
        </div>

        
    </el-card>
    <WeekSelectDialog />
</template>
<style scoped></style>