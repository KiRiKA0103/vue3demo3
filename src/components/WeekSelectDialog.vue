<script lang="ts" setup>
import { computed } from 'vue'
import { openMessageBox } from '@/dataSource/service'
import { useGlobalStore } from '@/store/globalStore'
import { useClassroomStore } from '@/store/classroomStore'
import { useCourseStore } from '@/store/courseStore'


const useGlobal = useGlobalStore()
const useClassroom = useClassroomStore()
const useCourse = useCourseStore()


const classrooms = useClassroom.classrooms
const classroomR = useClassroom.classroomS
const timeR = useClassroom.timeS
const weekR = useClassroom.weekS
const courseR = useCourse.courseS

const saveBooking = () => {
    useGlobal.weekSelectDialog.value = false

    if (!checkDuration()) {
        return
    }

    classroomR.value!.bookings = classroomR.value?.bookings?.filter((booking) => !(booking.course?.cid == courseR.value?.cid && booking.time == timeR.value))
    if (weekR.value.length <= 0) {
        return
    }
    classroomR.value?.bookings?.push({
        classname: classroomR.value.classname,
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
                if (booking.classname == classroomR.value?.classname && booking.time == timeR.value) {
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
    if (classroomR.value?.bookings?.find((booking) => booking.time == timeR.value)?.week?.includes(week)) {
        if (classroomR.value?.bookings?.find((booking) => booking.course?.cid == courseR.value?.cid && booking.time == timeR.value)) {
            return false
        }
        return true
    }
    return false
})


</script>
<template>
    <el-dialog v-model="useGlobal.weekSelectDialog.value" title="选择周数" width="500" center>
        <el-select v-model="weekR" multiple collapse-tags placeholder="未选择" style="width: 240px">
            <el-option v-for="week in 18" :key="week" :label="week" :value="week" :disabled="checkWeek(week)" />
        </el-select>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="useGlobal.weekSelectDialog.value = false">取消</el-button>
                <el-button type="primary" @click="saveBooking">
                    保存
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>
<style scoped></style>