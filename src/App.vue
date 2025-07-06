<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<script lang="ts">
export default {
  data: () => ({ drawer: true, rail: true }),
}
</script>

<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" :rail="rail">
      <v-list>
        <v-list-item
          prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
          title="John Leider"
        ></v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list density="compact" nav>
        <v-list-item
          prepend-icon="mdi:mdi-home-city"
          title="Home"
          value="home"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi:mdi-account"
          title="My Account"
          value="account"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi:mdi-account-group-outline"
          title="Users"
          value="users"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon @click="rail = !rail"></v-app-bar-nav-icon>
      <v-app-bar-title>Application</v-app-bar-title>
      <v-icon icon="fas fa-plus" />
      <v-icon icon="mdi:mdi-minus" />
    </v-app-bar>

    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<style scoped></style>
