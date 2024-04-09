<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { loginService } from '@/dataSource/service'

const form = ref({ username: 'root', password: '123456' })

const submitForm = async (form: { username: string; password: string }) => {
    await loginService(form)
}

</script>
<template>
    <el-card style="display: flex;justify-content: center;">
        <el-form :model="form" label-width="auto" style="max-width: 600px">
            <el-form-item label="账号 :">
                <el-input v-model="form.username" />
            </el-form-item>
            <el-form-item label="密码 :">
                <el-input type="password" v-model="form.password" />
            </el-form-item>
            <el-form-item>
                <el-button style="margin: auto;" @click="submitForm(form)">登录</el-button>
            </el-form-item>

        </el-form>
    </el-card>
</template>
<style scoped></style>