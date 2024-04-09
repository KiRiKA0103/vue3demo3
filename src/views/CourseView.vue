<template>
    <AddCourse />
    <!-- <el-table :data="courses" border style="width: 50%">
        <el-table-column fixed prop="cid" label="ID" width="120" align="center" />
        <el-table-column prop="cname" label="课程名称" align="center" />
        <el-table-column prop="duration" label="实验课时" width="120" align="center" />

        <el-table-column fixed="right" label="操作" width="120" align="center">
            <template v-slot="scope">
                <el-button link type="success" size="small" @click="showDrawer(scope.row)">预约</el-button>
                <el-button link type="danger" size="small">删除</el-button>
            </template>
        </el-table-column>
    </el-table> -->
    <CourseTable/>

    <!-- <BookingDrawer/> -->
    <!-- <el-drawer v-model="drawer" title="预约教室" :with-header="false" size="50%">
        {{ courseR }}
        <el-select v-model="selected" placeholder="选择教室" size="default" style="width: 240px">
            <el-option v-for="item in classrooms" :key="item.classname" :label="item.classname"
                :value="item.classname" />
        </el-select>
        <el-card v-show="currentClassroom != null">
            <div style="width: 100%">
                <div style="float: left; height: 60px; width: 14%; border: 1px solid #000; box-sizing: border-box"
                    v-for="item in ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']">
                    {{ item }}
                </div>
            </div>
            <div style="width: 100%">
                <div @click="showBookingDialog(time)" style="
            position: relative;
            font-size: 12px;
            float: left;
            height: 150px;
            width: 14%;
            border: 1px solid #000;
            box-sizing: border-box;
          " v-for="time in 28">
                    <template v-for="booking in showBookings(time)">
                        {{ booking.course?.cname }}
                        <br />
                        {{ booking.week }}
                        <hr />
                    </template>
                    <el-button @click="showBookingDialog(time)" size="small"
                        style="position: absolute; bottom: 0; left: 0">预约</el-button>
                </div>
            </div>
        </el-card>
    </el-drawer>
    <el-dialog v-model="dialog" title="选择周数" width="500" center>
        <el-select v-model="weekR" multiple collapse-tags placeholder="未选择" style="width: 240px">
            <el-option v-for="week in 18" :key="week" :label="week" :value="week" :disabled="checkWeek(week)" />
        </el-select>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialog = false">取消</el-button>
                <el-button type="primary" @click="saveBooking"> 保存 </el-button>
            </div>
        </template>
    </el-dialog> -->
</template>
<script lang="ts" setup>
import { defineAsyncComponent } from 'vue'
const AddCourse = defineAsyncComponent(() => import('@/components/AddCourse.vue'))
const CourseTable = defineAsyncComponent(() => import('@/components/CourseTable.vue'))
const BookingDrawer = defineAsyncComponent(()=>import('@/components/BookingDrawer.vue'))
</script>

<!-- <script lang="ts" setup>
import { ref, computed, watch, onMounted, defineAsyncComponent } from 'vue'
import type { Classroom, Course } from '@/type/Type'
import { listCourses, listClassrooms, openMessageBox } from '@/dataSource/service'
import { useGlobalStore } from '@/store/globalStore'
import { useCourseStore } from '@/store/courseStore'
import { useClassroomStore } from '@/store/classroomStore'



const drawer = ref(false)
const dialog = ref(false)

const useGlobal = useGlobalStore()
const useCourse = useCourseStore()
const useClassroom = useClassroomStore()

const courses = useCourse.courses
const classrooms = useClassroom.classrooms

const courseR = ref<Course>()
const timeR = ref<number>()
const weekR = ref<number[]>([])

onMounted(async () => {
    if (courses.value.length <= 0) {
        courses.value = await listCourses(10001)
    }
})

const showDrawer = async (course: Course) => {
    courseR.value = course
    if (classrooms.value.length <= 0) {
        classrooms.value = await listClassrooms()
    }
    drawer.value = true
}

const selected = ref<string>()
const currentClassroom = ref<Classroom>()

watch(selected, async () => {
    currentClassroom.value = classrooms.value.find((classroom) => classroom.classname == selected.value)
})

const showBookings = (time: number) => {
    timeR.value = time
    return currentClassroom.value?.bookings?.filter((booking) => booking.time == time)
}

const showBookingDialog = (time: number) => {
    timeR.value = time
    weekR.value =
        currentClassroom.value?.bookings?.find(
            (booking) => booking.time == time && booking.course?.cid == courseR.value?.cid
        )?.week ?? []
    dialog.value = true
}

const saveBooking = () => {
    dialog.value = false

    if (!checkDuration()) {
        return
    }

    currentClassroom.value!.bookings = currentClassroom.value?.bookings?.filter(
        (booking) => !(booking.course?.cid == courseR.value?.cid && booking.time == timeR.value)
    )
    if (weekR.value.length <= 0) {
        return
    }
    currentClassroom.value?.bookings?.push({
        classname: currentClassroom.value.classname,
        course: courseR.value,
        week: weekR.value.sort((a, b) => a - b),
        time: timeR.value
    })

    console.log('next')
}

const checkDuration = () => {
    let selectTime = 0
    selectTime += weekR.value.length * 2
    classrooms.value.forEach((classroom) => {
        classroom.bookings?.forEach((booking) => {
            if (booking.course?.cid == courseR.value?.cid) {
                if (booking.classname == currentClassroom.value?.classname && booking.time == timeR.value) {
                } else {
                    selectTime += booking.week?.length ? booking.week?.length * 2 : 0
                }
            }
        })
    })

    // console.log(selectTime)
    if (selectTime > courseR.value?.duration!) {
        openMessageBox('超出实验课时')
        return false
    }

    return true
}

const checkWeek = computed(() => (week: number) => {
    // console.log(currentClassroom.value)
    if (currentClassroom.value?.bookings?.find((booking) => booking.time == timeR.value)?.week?.includes(week)) {
        if (
            currentClassroom.value?.bookings?.find(
                (booking) => booking.course?.cid == courseR.value?.cid && booking.time == timeR.value
            )
        ) {
            return false
        }
        return true
    }
    return false
})
</script> -->
<style scoped></style>
