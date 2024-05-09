<script lang="ts" setup>
import { ref, onMounted, watch, defineAsyncComponent } from 'vue'
import { openMessageBox } from '@/dataSource/service'
import { listClassroomsService } from '@/dataSource/service'
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
        classrooms.value = await listClassroomsService()
    }
    classroomR.value = {}
})

// 监听教室选择
watch(selected, async () => {
    classroomR.value = classrooms.value.find((classroom) => classroom.classname == selected.value)
})

// 显示选择周数的对话框
const showWeekSelectDialog = (time: number) => {
    if (!classroomR.value?.classname) {
        openMessageBox('请先选择要预约的教室')
        return
    }
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

    <el-form-item label="选择教室:" style="font-size: 14px;">
        <el-select v-model="selected" placeholder="选择教室" size="default" style="width: 80px">
            <el-option v-for="item in classrooms" :key="item.classname" :label="item.classname"
                :value="item.classname" />
        </el-select>
    </el-form-item>

    <el-alert title="点击课程表即可预约周次" type="info" />
    <el-card style="margin-top: 20px;">
        <table style="border-collapse: collapse;">
            <tr>
                <th v-for="item in ['周一', '周二', '周三', '周四', '周五', '周六', '周日']">{{ item }}</th>
            </tr>
            <tr v-for="i in 4">
                <td v-for="j in 7" @click="showWeekSelectDialog((i - 1) * 7 + j)">
                    <div v-for="booking in getBookings((i - 1) * 7 + j)" style="padding: 4px;">
                        <span>课程: {{ booking.course?.cname }}</span>
                        <br />
                        <span>周次: {{ booking.week }}</span>
                    </div>
                    <!-- <el-button @click="showWeekSelectDialog((i - 1) * 7 + j)" size="small">
                        预约
                    </el-button> -->
                </td>
            </tr>
        </table>
    </el-card>
    <WeekSelectDialog />
</template>
<style scoped>
table,
th,
td {
    border: 1px solid #6cb6ff;
    color: #555;
}

table {
    width: 100%;
}

tr {
    width: 100%;
    display: flex;
}

th,
td {
    flex: 1;
}

tr:nth-child(n+2) {
    min-height: 58px;
}

td:hover {
    background-color: #bfdefc;
    position: relative;
}
</style>