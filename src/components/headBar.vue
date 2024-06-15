<script setup lang="ts">

</script>

<template>
  <div class="mx-2 mb-5 flex bg-white p-3">
    <van-image
      radius="50"
      width="5rem"
      height="5rem"
      fit="cover"
      src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
    />
    <div class="mx-3 w-auto flex-col text-left text-4" style="flex-grow:1">
      name:  <slot name="name" />
      <div class="mt-1 text-4">
        email:  <slot name="email" />
      </div>
    </div>
  </div>
</template>
