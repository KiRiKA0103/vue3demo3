<script setup lang="ts">
import { ref } from 'vue'

const handleSelect = () => {

}
</script>

<template>
  <el-row>
    <el-col>
      <el-menu class="el-menu-demo" mode="horizontal" :ellipsis="false" background-color="#666666" text-color="#FFFFFF"
        active-text-color="#1E90FF" @select="handleSelect">
        <el-menu-item index="0">
          <img style="width: 100px" src="/public/images/image-nefu.png" alt="Element logo" />
        </el-menu-item>
        <div class="flex-grow" />
        <RouterLink to="/home">
          <el-menu-item>主页</el-menu-item>
        </RouterLink>
        <RouterLink to="/login">
          <el-menu-item>登录</el-menu-item>
        </RouterLink>
      </el-menu>
    </el-col>

  </el-row>
  <RouterView></RouterView>


</template>

<style scoped>
.flex-grow {
  flex-grow: 1;
}

a {
  text-decoration: none;
}

</style>