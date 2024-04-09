<script lang="ts" setup>
import { defineAsyncComponent } from 'vue'
const TeacherView = defineAsyncComponent(() => import('./TeacherView.vue'))
const LoadingVue = defineAsyncComponent(() => import('./LoadingView.vue'))
</script>
<template>
  <div>
    <Suspense>
      <template #default>
        <TeacherView />
      </template>
      <template #fallback>
        <LoadingVue />
      </template>
    </Suspense>
  </div>
</template>
<style scoped></style>