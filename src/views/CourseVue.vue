<script lang="ts" setup>
import { defineAsyncComponent } from 'vue'
const CourseView = defineAsyncComponent(() => import('./CourseView.vue'))
const LoadingVue = defineAsyncComponent(() => import('./LoadingView.vue'))
</script>
<template>
  <div>
    <Suspense>
      <template #default>
        <CourseView />
      </template>
      <template #fallback>
        <LoadingVue />
      </template>
    </Suspense>
  </div>
</template>
<style scoped></style>