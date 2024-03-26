<template>
  <div>
    <h1>
      Welcome to Roaming Routes!
      <NuxtLink to="/login">Login</NuxtLink>
    </h1>
  </div>
  <div>
    <ul>
      <li v-for="Roaming_Routes in roaming" :key="Roaming_Routes.id">
        <h3>{{ Roaming_Routes.blog_title }}</h3>
        {{ Roaming_Routes.date }}
        {{ Roaming_Routes.blog_text }}
      </li>
    </ul>
  </div>
</template>

<script setup>
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

<style>
h1 {
  text-align: center;
}
</style>
