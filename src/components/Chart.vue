<template>
  <v-app id="chart">
    <v-container>
      <v-row>
        <v-col>
          <h1>Chart</h1>
        </v-col>
        <v-col>
          <v-dialog
            ref="dialog"
            v-model="DateModal"
            :return-value.sync="TargetDate"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-form>
                <v-text-field
                  v-model="TargetDate"
                  label="Date"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </v-form>
            </template>
            <v-date-picker v-model="TargetDate" scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="DateModal = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.dialog.save(TargetDate)">OK</v-btn>
            </v-date-picker>
          </v-dialog>
        </v-col>
      </v-row>
    </v-container>

    <!-- Chart -->
    <pie-chart :chart-data="datacollection" :options="option" />
    <button @click="getCalenderEvents">ボタン</button>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import PieChart from "./PieChart.vue";

export default {
  components: {
    PieChart,
  },
  data () {
    return {
      TargetDate: new Date().toISOString().substr(0, 10),
      DateModal: false,
      datacollection: null,
      option: null,
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    getCalenderEvents () {
      this.$gapi.getGapiClient().then((gapi) => {
        const resource = {
          timeMax: `${this.TargetDate}T23:59:59+09:00`,
          timeMin: `${this.TargetDate}T00:00:00+09:00`,
          timeZone: "Asia/Tokyo",
        }
        const request = gapi.client.calendar.events.list({
          calendarId: this.userInfo.email,
          resource: resource,
        });
        request.execute((res) => {
          if(res.items) {
            console.log(res.items)
            const labels = res.items.map((item) => item.summary)
            // const datalists = res.items.map((item) => item.)
          }
        });
      })
    },
    fillData(labels, data) {
      this.datacollection = {
        datasets: [
          {
            labels,
            backgroundColor: ['#f87979', '#008080'],
            data
          },
        ],
      }
      this.option = {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
};
</script>
