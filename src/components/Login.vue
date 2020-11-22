<template>
  <div class="text-center my-12">
    <v-btn @click="signInWithGoogle" width="500" color="primary">
      Login with Google
    </v-btn>
  </div>
</template>

<script>
import firebase from "firebase";
import { mapActions } from "vuex";

export default {
  name: "Login",
  methods: {
    ...mapActions(['setUserInfo']),
    signInWithGoogle() {
      this.$gapi.login();
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((res) => {
          if (res.credential) {
            const token = res.credential.accessToken;
            console.log(`token:${token}`);
          }
          const userInfo = res.user;
          this.setUserInfo(userInfo);
        });
    },
  },
};
</script>
