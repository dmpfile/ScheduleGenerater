<template>
  <div class="text-center my-12">
    <v-btn @click="signInWithGoogle" width="500" color="primary">
      Login with Google
    </v-btn>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Login",
  methods: {
    signInWithGoogle() {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider).then((res) => {
        if(res.credential) {
          const token = res.credential.accessToken;
          console.log(`token:${token}`); //Googleカレンダー追加で必要？
        }
        const user = res.user;
        console.log(`user:${user}`); //Googleカレンダー追加で必要？
      })
    },
  },
};
</script>
