<template>
  <div class="scores">
    <h2>Meilleurs Scores</h2>
    <ul>
      <li v-for="(score, index) in scores" :key="index">
        Partie {{ index + 1 }} : Score - {{ score.points }}, Meilleure série - {{ score.bestStreak }}
      </li>
    </ul>
    <button @click="goHome">Retour à l'accueil</button>
    <button @click="resetScores">Réinitialiser l'historique</button>
  </div>
</template>

<script>
export default {
  name: 'ScoresPage',
  data() {
    return {
      scores: [], 
    };
  },
  created() {
    const savedScores = JSON.parse(localStorage.getItem('quizScores')) || [];
    this.scores = savedScores;
  },
  methods: {
    goHome() {
      this.$router.push('/');
    },
    resetScores() {
      localStorage.removeItem('quizScores');
      this.scores = [];
    },
  },
};
</script>

<style scoped>
  .scores {
    max-width: 600px;
    margin: 20px auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  h2 {
    color: #4CAF50;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    font-size: 1.1em;
    margin: 10px 0;
  }
  
  button {
    margin: 10px;
    margin-top: 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  button:hover {
    background-color: #45a049;
  }
</style>