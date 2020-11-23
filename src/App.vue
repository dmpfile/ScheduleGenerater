<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list-item class="px-2" v-if="isLogin">
        <v-list-item-avatar>
          <v-img :src="userInfo.iconImg"></v-img>
        </v-list-item-avatar>
        <v-list-item-title>{{ userInfo.fullname }}</v-list-item-title>
      </v-list-item>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-item link to="/edit">
          <v-list-item-action>
            <v-icon>mdi-pencil</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Edit</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/chart">
          <v-list-item-action>
            <v-icon>mdi-poll-box</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Chart</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link v-if="isLogin" @click="signOut">
          <v-list-item-action>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Log Out</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Scedule Generetor</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-row justify="center" align="center">
        <v-col cols="12" sm="10" md="8" lg="4" xl="3">
          <router-view></router-view>
        </v-col>
      </v-row>
    </v-main>

    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }} Ryosuke</span>
    </v-footer>
  </v-app>
</template>

<script>
import firebase from "firebase";
import { mapState } from "vuex";

export default {
  name: "App",
  data() {
    return {
      isLogin: false,
      drawer: false,
    };
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      this.user = user ? user : {};
      if (user) {
        this.isLogin = true;
        this.$router.push("/edit");
      }
    });
  },
  methods: {
    signOut() {
      firebase.auth().signOut();
      this.$gapi.logout();
      this.$router.push("/login");
      this.isLogin = false;
    },
  },
};
</script>
