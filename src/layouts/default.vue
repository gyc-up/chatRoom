<script setup>
const route = useRoute()
// console.log(route.meta.title)
</script>

<template>
  <main text="center">
    <!-- <TheHeader /> -->
    <RouterView />
    <!-- <TheFooter v-if="route.meta.title != ('chat')" /> -->
  </main>
</template>
