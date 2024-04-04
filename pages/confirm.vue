<template>
  <div class="nav">
    <button class="navButton" @click="signOut">Sign Out</button>
    <h3 class="userEmail">Email: {{ user.email }}</h3>
  </div>
  <h1>Roaming Routes</h1>
  <div>
    <ul>
      <li v-for="Roaming_Routes in roaming" :key="Roaming_Routes.id">
        <NuxtLink :to="`/post/${Roaming_Routes.id}`">
          {{ Roaming_Routes.blog_title }}</NuxtLink
        >
      </li>
    </ul>
  </div>
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

// Fetching data
const { data: roaming } = await useAsyncData("Roaming_Routes", async () => {
  try {
    let { data, error } = await client
      .from("Roaming_Routes")
      .select("id, blog_title, blog_text");
    return data;
  } catch (error) {
    console.error(error);
  }
});

// Sign out section
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
.nav,
.navButton {
  display: flex;
  justify-content: space-between;
  background-color: olivedrab;
  align-items: center;
  border: none;
}

.navButton:hover {
  color: white;
}
</style>
