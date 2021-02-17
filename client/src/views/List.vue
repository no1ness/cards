<template>
<main>
    <h1>Cards List</h1>
    <nav>
        <a class="left" @click="switchPage(-1)">&larr; Prev</a>
        <a class="right" @click="switchPage(+1)">Next &rarr;</a>
    </nav>

    <router-link
    class="thumbnail"
    v-for="card in cards"
    :key="card.id"
    :to="'/card?id=' + card.id"
    >
        <img :src="card.avatar" />
        <h4>{{ card.handle }}</h4>
    </router-link>
</main>
</template>

<script>
export default {
    name: "List",

    data() {
        return {
            pageID: 0,
            cards: []
        };
    },
    
    created() {
       this.fetchCards();
    },

    methods: {
       async fetchCards() {
           this.updatePageID();
           this.cards = await this.fetchCardsFromPage(this.pageID);
       },

        updatePageID() {
            const params = new URLSearchParams(window.location.search);
            this.pageID = params.get("page") || 0;
        },

        async fetchCardsFromPage(pageID) {
            const resp = await fetch(`http://localhost:8000/?page=${pageID}`);
            const cards = await resp.json();
            return cards;
        },

        async switchPage(offset) {
            const newPageID = parseInt(this.pageID) + offset;
            const newCards = await this.fetchCardsFromPage(newPageID);
            if (newCards.length > 0) {
                this.$router.push({ path: "list", query: {page: newPageID} });
                this.updatePageID();
                this.cards = newCards;
            } else {
                alert("This is the edge. There are no more cards.");
            }
        },
        showCard(id) {
            this.$router.push({ path: "card", query: {id: id} });
        }
    }
};
</script>

<style scoped>
main {
    font-family: Arial Helvetica, sans-serif;
}

nav {
    display: flex;
    max-width: 150px;
    margin: auto;
    border-radius: 10px;
    border: 1px solid #666;
    overflow: hidden;
}

nav {
  display: flex;
  max-width: 150px;
  margin: auto;
  border-radius: 10px;
  border: 1px solid #2c3e50;
  overflow: hidden;
}
nav a {
  width: 50%;
  line-height: 30px;
  text-decoration: none;
  color: #2c3e50;
  background-color: #eee;
  cursor: pointer;
}
nav a:hover {
  background-color: #ddd;
}
nav .left {
  border-right: 1px solid #2c3e50;
}
nav .right {
  border-left: 1px solid #2c3e50;
}

.thumbnail {
  display: flex;
  height: 70px;
  margin: 10px auto;
  max-width: 200px;
  background-color: #2c3e50;
  color: white;
  border-radius: 35px;
  cursor: pointer;
  text-decoration: none;
}

.thumbnail a:hover {
    background-color: #4c637a;
}

.thumbnail img {
    border-radius: 50%;
    background-color: white;
    margin: 10px;
}

.thumbnail h4 {
    line-height: 70px;
    margin: 0;
    margin-left: 5px;

}
</style>