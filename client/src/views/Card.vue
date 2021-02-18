<template>
<div>
<div id="nav">
      <router-link to="/list">&larr; Back to List</router-link>
    </div>
  <section>
    <header>
      <img :src="card.avatar"/>
      <div class = "author">
        <h4 class="handle">{{ card.handle }}</h4>
        <h6 class="title">{{ card.handle }}</h6>
      </div>
    </header>
    <main>{{ card.text }}</main>
  </section>
  </div>
</template>

<script>
import { fetchFromOrigin } from "../util";

export default {
  name: "Card",

  data() {
    return {
      cardID: new URLSearchParams(window.location.search).get("id") || 0,
      card: {}
    };
  },
  async created() {
    this.card = await this.fetchCard(this.cardID);
  },

  methods: {
    async fetchCard(id) {
      const resp = await fetchFromOrigin(`/get/${id}`);
      const card = await resp.json();
      return card;
    }
  }
};
</script>

<style scoped>
section {
  width: 95%;
  max-width: 500px;
  margin: auto;
  border: 1px solid #2c3e50;
  border-radius: 10px;
  overflow: hidden;
  text-align: left;
}

header {
  display: flex;
  background-color: #2c3e50;
  color: white;
  height: 60px;
}
header img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  margin: 10px;
}

.author {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.author * {
  margin: 0;
}

.title {
  font-weight: 300;
}

main {
  padding: 15px;
}


</style>
