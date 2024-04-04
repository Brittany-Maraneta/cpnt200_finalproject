<template>
    <div>
      <button @click="incrementLikes">&#9829</button>
      <span>{{ likeCount }}</span>
    </div>
</template>

<script setup>
// Like button

const likeCount = ref(0);
function incrementLikes() {
  likeCount.value++;
}

</script>

<style scoped>

</style>