<script lang="ts" setup>
import { useCourseStore } from '@/store/courseStore'

const useCourse = useCourseStore()

const courseForm = useCourse.courseForm

// const form = ref<{ cname?: string; duration?:number}>({})

</script>
<template>
  <el-form :inline="true" :model="courseForm">
    <el-form-item label="课程名称" style="width: 240px">
      <el-input size="default" v-model="courseForm.cname" clearable />
    </el-form-item>
    <el-form-item label="实验课时">
      <el-select size="default" v-model="courseForm.duration" placeholder="" style="width: 120px">
        <el-option v-for="i in 48" :key="i" :label="i*2" :value="i * 2" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="useCourse.addCourse()">创建课程</el-button>
    </el-form-item>
  </el-form>

</template>
<style scoped></style>