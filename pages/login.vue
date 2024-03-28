<template>
  <NuxtLink to="/">Back</NuxtLink>
  <div class="container">
    <div class="card">
      <h1>Sign up to Roaming Routes</h1>
      <form @submit.prevent="signIn">
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" name="email" id="email" v-model="email" />
          <div>{{ email }}</div>
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            v-model="password"
          />
          <div>{{ password }}</div>
        </div>
        <button class="button" @click="signIn">Sign In</button>
        <button class="button" @click="signUp">Sign Up</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
const supabase = useSupabaseClient();
const email = ref("");
const password = ref("");

// Sign in info
async function signIn() {
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });
    if (error) throw error;
    router.push("/confirm");
  } catch (error) {
    console.error(`Login Error: ${error}`);
  }
}

// Sign up info
async function signUp() {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
    });
    if (error) {
      throw error;
    }
  } catch (error) {
    console.error(`Sign Up Error: ${error}`);
  }
}
</script>

<style>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.card {
  width: 300px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
}

input {
  width: 95%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
}

.button {
  width: 100%;
  padding: 10px;
  background-color: rgb(73, 73, 1);
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 12px;
}

button:hover {
  background-color: rgb(136, 136, 66);
}
</style>
