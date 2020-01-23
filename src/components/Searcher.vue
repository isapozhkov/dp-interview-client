<template>
  <div class="container">
    <h1>Solve your problem</h1>
    <div class="search">
      <div class="search-form">
        <input
          type="text"
          placeholder="What's happened?.."
          v-model="message"
          @input="clearRaw()"
          @keyup.enter="getSolution(message)"
        />
        <button @click.prevent="getSolution(message)">Search</button>
      </div>
      <div class="error" v-if="isError">Not found</div>
    </div>
    <div class="solution" v-if="solution">
      <h3>Symptom: {{ solution.symptom }}</h3>
      <h4>Type: {{ solution.tag }}</h4>
      <h4>Solution:</h4>
      <div class="sol-steps">
        <ol>
          <li v-for="(step, idx) in solution.solutions" :key="idx">
            {{ step }}
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "",
      raw: null,
      isError: false
    };
  },
  computed: {
    solution: function() {
      if (!this.raw) return null;
      return this.raw[0];
    }
  },
  methods: {
    getSolution(question) {
      this.$http
        .get(`/search?q=${question}`)
        .then(({ data }) => {
          this.raw = data;
          this.message = "";
          if (Array.isArray(data) && data.length == 0) {
            this.isError = true;
          }
        })
        .catch(err => {
          console.log(err);
          this.isError = true;
        });
    },
    clearRaw() {
      this.isError = false;
      this.raw = null;
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 700px;
  margin: 0 auto;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .search {
    max-width: 300px;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .error {
      margin: 5px auto;
      border-radius: 7px;
      background: rgba(255, 0, 0, 0.1);
      width: 80%;
      color: #f00;
      padding: 10px;
    }
  }
  .solution {
    text-align: left;
    h3 {
      margin: 20px 0 10px;
    }
    h4 {
      margin: 10px 0;
    }
    .sol-steps {
      li {
        list-style-type: decimal;
      }
    }
  }
}
</style>
