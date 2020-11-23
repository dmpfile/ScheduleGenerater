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

    <v-form>
      <v-text-field
        v-for="ScheduleNum in ScheduleLists.length"
        v-model="ScheduleLists[ScheduleNum - 1].Summary"
        @click:append="
          DetailModal = true;
          TargetModal = ScheduleNum - 1;
        "
        :key="ScheduleNum"
        :placeholder="'Schedule ' + ScheduleNum"
        solo
        clearable
        append-icon="mdi-calendar-plus"
      ></v-text-field>
      <v-dialog v-model="DetailModal" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Schedule Detail</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col>
                  <v-select
                    :items="TimeItems"
                    v-model="ScheduleLists[TargetModal].StartTime"
                    menu-props="auto"
                    label="Start"
                  ></v-select>
                </v-col>
                <v-col>
                  <v-select
                    :items="TimeItems"
                    v-model="ScheduleLists[TargetModal].EndTime"
                    menu-props="auto"
                    label="End"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="ScheduleLists[TargetModal].Description"
                    label="詳細"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="validTimes()">Close</v-btn>
            <v-btn color="blue darken-1" text @click="validTimes()">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-form>

    <v-row justify="center">
      <v-btn fab small color="primary" @click="newSchedule">
        <v-icon dark>mdi-plus</v-icon>
      </v-btn>
    </v-row>
    <div class="text-center">
      <p>スケジュールを共有する</p>
      <v-btn icon color="red" x-large @click="shareWithGoogle">
        <v-icon>mdi-calendar-range</v-icon>
      </v-btn>
      <v-btn icon color="primary" x-large>
        <v-icon>mdi-twitter</v-icon>
      </v-btn>
    </div>
  </v-app>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "edit",
  data() {
    return {
      TargetDate: new Date().toISOString().substr(0, 10),
      TimeItems: [],
      ScheduleLists: [
        { Summary: "", StartTime: "07:00", EndTime: "08:00", Description: "" },
      ],
      TargetModal: 0,
      DateModal: false,
      DetailModal: false,
    };
  },
  computed: {
    ...mapState(['userInfo'])
  },
  created() {
    this.makeTimesArray();
    if (!this.$gapi.isAuthenticated()) {
      this.$gapi.login();
    }
  },
  methods: {
    makeTimesArray() {
      const h = 24;
      const m = 46;
      const minInterval = 15;
      const timesArray = [];
      for (let i = 0; i < h; i++) {
        for (let j = 0; j < m; j += minInterval) {
          let strHour = this.leftFillNum(i, 2);
          let strMin = this.leftFillNum(j, 2);
          timesArray.push(`${strHour}:${strMin}`);
        }
      }
      this.TimeItems = timesArray;
    },
    leftFillNum(num, targetLength) {
      return num.toString().padStart(targetLength, 0);
    },
    newSchedule() {
      this.ScheduleLists.push({
        Summary: "",
        StartTime: "10:00",
        EndTime: "11:00",
        Description: "",
      });
    },
    shareWithGoogle() {
      this.$gapi.getGapiClient().then((gapi) => {
        for (let i = 0; i < this.ScheduleLists.length; i++) {
          const resource = {
            summary: this.ScheduleLists[i].Summary,
            start: {
              dateTime: `${this.TargetDate}T${this.ScheduleLists[i].StartTime}:00.000+09:00`,
              timeZone: "Asia/Tokyo",
            },
            end: {
              dateTime: `${this.TargetDate}T${this.ScheduleLists[i].EndTime}:00.000+09:00`,
              timeZone: "Asia/Tokyo",
            },
            description: this.ScheduleLists[i].Description,
          };
          const request = gapi.client.calendar.events.insert({
            calendarId: this.userInfo.email,
            resource: resource,
          });
          request.execute();
        }
        alert("カレンダーに共有しました");
        this.ScheduleLists = [
          {
            Summary: "",
            StartTime: "10:00",
            EndTime: "11:00",
            Description: "",
          },
        ];
      });
    },
    validTimes() {
      const index = this.TargetModal;
      const s = this.ScheduleLists[index].StartTime;
      const e = this.ScheduleLists[index].EndTime;
      if (s > e || s === e) {
        alert("終わりの時間を修正してください");
      } else {
        this.DetailModal = false;
      }
    },
  },
};
</script>
