<template>
  <div class="container">
    <div class="card">
      <h1>Sign up to Roaming Routes</h1>
      <form>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" name="email" v-model="email" />
          <div>{{ email }}</div>
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" name="password" v-model="password" />
          <div>{{ password }}</div>
        </div>
        <button @click="signUp">Sign Up</button>

        <button @click="logout">logout</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const supabase = useSupabaseClient();
const email = ref("");
const password = ref("");

async function signUp() {
  const { data, error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
    options: {
      emailRedirectTo: "http://localhost:3000/confirm",
    },
  });
}

async function logout() {
  try {
    let { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    console.error(`signout error: ${error}`);
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

button {
  width: 100%;
  padding: 10px;
  background-color: rgb(73, 73, 1);
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: rgb(136, 136, 66);
}

.error {
  color: red;
}
</style>
