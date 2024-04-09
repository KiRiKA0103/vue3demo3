<script lang="ts" setup>
import type { Teacher } from '@/type/Type';

const teacherR:Teacher = JSON.parse(sessionStorage.getItem('teacher')??'')

</script>
<template>
    <el-card style="width: 300px;">
        <img style="width: 100%;" :src="teacherR.imgUrl" alt="">
        <div style="text-align: center;">{{ teacherR.tname }}</div>
    </el-card>
</template>
<style scoped></style>