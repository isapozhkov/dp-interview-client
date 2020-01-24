<template>
  <v-app id="inspire">
    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="blue darken-3"
      dark
    >
      <v-toolbar-title
        style="width: 300px"
        class="ml-0 pl-4 hidden-sm-and-down"
      >
        <span>Solve your PC problem</span>
      </v-toolbar-title>
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="What's happened?.."
        v-model="message"
        @keyup.enter="getSolution(message)"
      />
      <v-spacer class="hidden-sm-and-down" />
    </v-app-bar>
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-card
            class="red lighten-3 white--text"
            max-width="700"
            raised
            v-if="isError"
          >
            <v-card-title>Not found</v-card-title>
            <v-card-text class="white--text">
              Unfortunately, we can't find how to solve your problem :(
            </v-card-text>
          </v-card>
          <v-card max-width="700" raised v-if="solution">
            <v-card-title>Symptom: {{ solution.symptom }}</v-card-title>
            <v-card-subtitle>
              <v-chip class="ma-2" small> {{ solution.tag }}</v-chip>
            </v-card-subtitle>
            <v-card-text>
              <ol>
                <li v-for="(step, idx) in solution.solutions" :key="idx">
                  {{ step }}
                </li>
              </ol>
            </v-card-text>
          </v-card>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    message: "",
    raw: null,
    isError: false
  }),
  computed: {
    solution: function() {
      if (!this.raw) return null;
      return this.raw[0];
    }
  },
  methods: {
    getSolution(question) {
      this.clear();
      this.$http
        .get(`/search?q=${question}`)
        .then(({ data }) => {
          this.raw = data;
          this.message = "";
          if (Array.isArray(data) && data.length == 0) {
            this.isError = true;
          }
        })
        .catch(() => {
          this.isError = true;
        });
    },
    clear() {
      this.isError = false;
      this.raw = null;
    }
  }
};
</script>

<style>
ol li::first-letter {
  text-transform: capitalize;
}
</style>
