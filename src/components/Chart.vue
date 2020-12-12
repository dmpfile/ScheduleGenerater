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
              <v-btn text color="primary" @click="DateModal = false"
                >Cancel</v-btn
              >
              <v-btn
                text
                color="primary"
                @click="
                  $refs.dialog.save(TargetDate);
                  getCalenderEvents();
                "
                >OK</v-btn
              >
            </v-date-picker>
          </v-dialog>
        </v-col>
      </v-row>
      <v-row v-if="noDataFlag">
        <v-col cols="12" lg="12" md="12" sm="12" align="center">
          <h1>No Plan…</h1>
          <h1>{{ noPlanText[Math.floor(Math.random() * 3)] }}</h1>
        </v-col>
      </v-row>
    </v-container>

    <!-- PieChart START -->
    <pie-chart :chart-data="datacollection" :options="option" />
    <!-- PieChart END -->
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import PieChart from "./PieChart.vue";
import dayjs from "dayjs";

export default {
  components: {
    PieChart,
  },
  data() {
    return {
      TargetDate: new Date().toISOString().substr(0, 10),
      DateModal: false,
      datacollection: {
        labels: [],
        datasets: [],
      },
      option: {},
      noDataFlag: false,
      noPlanText: [
        "Let's Make a Plan!😆",
        "Have a Nice Day!😌",
        "Take a Break？😴",
      ],
    };
  },
  mounted() {
    this.getCalenderEvents();
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  methods: {
    getCalenderEvents() {
      this.$gapi.getGapiClient().then((gapi) => {
        const resource = {
          timeMax: `${this.TargetDate}T23:59:59+09:00`,
          timeMin: `${this.TargetDate}T00:00:00+09:00`,
          timeZone: "Asia/Tokyo",
        };
        const request = gapi.client.calendar.events.list({
          calendarId: this.userInfo.email,
          resource: resource,
        });
        request.execute((res) => {
          this.parseDateTime(res); // データが無くても更新されないとグラフが消えないため実行
          this.noDataFlag = res.items.length ? false : true;
        });
      });
    },
    parseDateTime(res) {
      const labels = res.items.map((item) => item.summary);
      const datalists = res.items.map((item) => {
        const start = dayjs(item.start.dateTime);
        const end = dayjs(item.end.dateTime);
        const timeDiff = end.diff(start, "minute") / 60;
        return timeDiff;
      });
      this.fillData(labels, datalists);
    },
    fillData(labels, data) {
      this.datacollection = {
        labels,
        datasets: [
          {
            backgroundColor: data.map((item, index) => {
              const h = index * 5 * (360 / 100);
              return `hsl(${h + 20}, 80%, 70%)`;
            }),
            data,
          },
        ],
      };
      this.option = {
        responsive: true,
        maintainAspectRatio: false,
      };
    },
  },
};
</script>
