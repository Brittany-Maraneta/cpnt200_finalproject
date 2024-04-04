<script setup>
const route = useRoute();
const supabase = useSupabaseClient();

const { data: roaming } = await useAsyncData("Roaming_Routes", async () => {
  try {
    let { data, error } = await supabase
      .from("Roaming_Routes")
      .select("*")
      .eq("id", route.params.id)
      .single();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
});
</script>
<template>
  <main>
    <h1>{{ roaming.blog_title }}</h1>
    <p>{{ roaming.blog_text }}</p>
    <LikeButton />
  </main>
</template>
<style>
main {
  max-width: 800px;
  margin: 0 auto;
}
</style>
