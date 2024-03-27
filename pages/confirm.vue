<template>
  <h1>Roaming Routes</h1>
  <div>
    <ul>
      <li v-for="Roaming_Routes in roaming" :key="Roaming_Routes.id">
        <h3>{{ Roaming_Routes.blog_title }}</h3>
        {{ Roaming_Routes.blog_text }}
        {{ Roaming_Routes.comment }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const user = useSupabaseUser();

watch(
  user,
  () => {
    if (user.value) {
      return navigateTo("/");
    }
  },
  { immediate: true }
);
const client = useSupabaseClient();
const { data: roaming } = await useAsyncData("Roaming_Routes", async () => {
  try {
    let { data, error } = await client
      .from("Roaming_Routes")
      .select("blog_title, blog_text");
    return data;
  } catch (error) {
    console.error(error);
  }
});
</script>
