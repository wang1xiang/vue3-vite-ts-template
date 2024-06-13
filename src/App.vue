<template>
  <ElConfigProvider>
    <router-view v-slot="{ Component }">
      <Component :is="Component" />
    </router-view>
  </ElConfigProvider>
</template>

<script lang="ts">
export default defineComponent({
  name: 'App',
  setup() {
    const route = useRoute()

    watch(
      () => route.params,
      () => {
        if (route.name === '404') return
      }
    )
  },
})
</script>

<style lang="scss">
@use '@/styles/index.scss';
</style>
