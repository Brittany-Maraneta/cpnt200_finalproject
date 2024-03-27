<template>
  <h1>Roaming Routes</h1>
  <h3 class="userEmail">Email: {{ user.email }}</h3>
  <div>
    <ul>
      <li v-for="Roaming_Routes in roaming" :key="Roaming_Routes.id">
        <h3>{{ Roaming_Routes.blog_title }}</h3>
        {{ Roaming_Routes.blog_text }}
        {{ Roaming_Routes.comment }}
      </li>
    </ul>
  </div>
  <button @click="signOut">Sign Out</button>
</template>

<script setup lang="ts">
const user = useSupabaseUser();
const client = useSupabaseClient();

watch(
  user,
  () => {
    if (!user.value) {
      return navigateTo("/");
    }
  },
  { immediate: true }
);

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

async function signOut() {
  try {
    let { error } = await client.auth.signOut();
    if (error) throw error;
  } catch (error) {
    console.error(`signOut error: ${error}`);
  }
}
</script>

<style scoped>
.userEmail {
  text-align: right;
}
</style>
