<template>
  <v-app id="edit">
    <v-container>
      <v-row>
        <v-col>
          <h1>Edit</h1>
        </v-col>
        <v-col>
          <v-dialog
            ref="dialog"
            v-model="modal"
            :return-value.sync="date"
            persistent
            width="290px"
          >
          <template v-slot:activator="{ on, attrs }">
            <v-form>
              <v-text-field
                v-model="date"
                label="Date"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </v-form>
          </template>
          <v-date-picker v-model="date" scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
            <v-btn text color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
          </v-date-picker>
          </v-dialog>
        </v-col>
      </v-row>
    </v-container>
    <v-form>
      <v-text-field
        v-for="input in inputNum"
        :key="input"
        :placeholder="'Schedule'+input"
        solo
      ></v-text-field>
    </v-form>
    <v-row justify="center">
      <v-btn fab small color="primary" @click="inputNum++">
        <v-icon dark>mdi-plus</v-icon>
      </v-btn>
    </v-row>
    <div class="text-center">
      <p>スケジュールを共有する</p>
      <v-btn icon color="red" x-large>
        <v-icon>mdi-calendar-range</v-icon>
      </v-btn>
      <v-btn icon color="primary" x-large>
        <v-icon>mdi-twitter</v-icon>
      </v-btn>
    </div>
  </v-app>
</template>

<script>
export default {
  name: "edit",
  data () {
    return {
      date: new Date().toISOString().substr(0, 10),
      modal: false,
      inputNum: 1,
    }
  }
};
</script>
