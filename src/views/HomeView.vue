<script lang="ts" setup>
import {
  User,
  Setting,
} from '@element-plus/icons-vue'
</script>
<template>
    <el-row>
        <el-col :span="4">
            <el-menu class="el-menu-vertical-demo">
                <RouterLink to="/teacher">
                    <el-menu-item>
                        <el-icon>
                            <user />
                        </el-icon>
                        <span>教师主页</span>
                    </el-menu-item>
                </RouterLink>
                <RouterLink to="/course">
                    <el-menu-item>
                        <el-icon>
                            <setting />
                        </el-icon>
                        <span>课程管理</span>
                    </el-menu-item>
                </RouterLink>

            </el-menu>
        </el-col>
        <el-col style="padding: 20px;" :span="20">
            <RouterView></RouterView>
        </el-col>
    </el-row>
</template>
<style scoped>
a {
    text-decoration: none;
}
</style>