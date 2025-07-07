<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<script lang="ts">
interface UserProfile {
  country: string;
  display_name: string;
  email: string;
  explicit_content: {
    filter_enabled: boolean,
    filter_locked: boolean
  },
  external_urls: { spotify: string; };
  followers: { href: string; total: number; };
  href: string;
  id: string;
  images: Image[];
  product: string;
  type: string;
  uri: string;
}

interface Image {
  url: string;
  height: number;
  width: number;
}

export default {
  data: () => ({
    drawer: true,
    rail: true,
    sptfId: import.meta.env.VITE_SPTFYID,
    userEmail: '',
    userId: '',
    userImage: '',
    userName: '',
  }),
  async mounted() {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    if (code) {
      const accessToken = await this.getAccessToken(code);
      const profile = await this.fetchProfile(accessToken);
      this.userId = profile.id;
      this.userEmail = profile.email;
      this.userName = profile.display_name;
      this.userImage = profile.images[0].url;
    }
  },
  methods: {
    connect: async function() {
      this.redirectToAuthCodeFlow();
    },
    redirectToAuthCodeFlow: async function() {
      const verifier = this.generateCodeVerifier(128);
      const challenge = await this.generateCodeChallenge(verifier);

      localStorage.setItem("verifier", verifier);

      const params = new URLSearchParams();
      params.append("client_id", this.sptfId);
      params.append("response_type", "code");
      params.append("redirect_uri", import.meta.env.VITE_APP_URL + "/callback");
      params.append("scope", "user-read-private user-read-email");
      params.append("code_challenge_method", "S256");
      params.append("code_challenge", challenge);

      document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
    },
    generateCodeChallenge: async (codeVerifier: string) => {
      const data = new TextEncoder().encode(codeVerifier);
      const digest = await window.crypto.subtle.digest('SHA-256', data);
      return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
    },
    generateCodeVerifier(length: number) {
      let text = '';
      const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

      for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
    },
    getAccessToken: async function(code: string) {
      const verifier = localStorage.getItem("verifier");

      const params = new URLSearchParams();
      params.append("client_id", this.sptfId);
      params.append("grant_type", "authorization_code");
      params.append("code", code);
      params.append("redirect_uri", import.meta.env.VITE_APP_URL + "/callback");
      params.append("code_verifier", verifier!);

      const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params
      });

      const { access_token } = await result.json();
      return access_token;
    },
    fetchProfile: async (token: string): Promise<UserProfile> => {
      const result = await fetch("https://api.spotify.com/v1/me", {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
      });

      return await result.json();
    }
  }
}
</script>

<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" :rail="rail">
      <v-list>
        <v-list-item v-if="!!userId"
          :prepend-avatar="userImage"
          title="John Leider"
        ></v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list density="compact" nav>
        <v-list-item prepend-icon="mdi:mdi-home-city" title="Home" value="home"></v-list-item>
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
      <button v-if="!userId" v-on:click="connect()">Login</button>
      <section id="profile" v-if="!!userId">
        <h2>Logged in as <span>{{userName}}</span></h2>
        <span id="avatar"></span>
        <ul>
          <li>User ID: <span>{{userId}}</span></li>
          <li>Email: <span>{{userEmail}}</span></li>
        </ul>
      </section>
      <RouterView />
    </v-main>
  </v-app>
</template>

<style scoped></style>
