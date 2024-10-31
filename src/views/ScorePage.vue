<template>
  <div class="scores">
    <h2>Meilleurs Scores</h2>
    <ul class="score-list">
      <li v-for="(score, index) in scores" :key="index" class="score-item">
        <span class="score-title">Partie {{ index + 1 }} :</span>
        <span class="score-details">Score : {{ score.points }}/10, Meilleure série : {{ score.bestStreak }}</span>
      </li>
    </ul>
    <div class="buttons">
      <button @click="goHome">Retour à l'accueil</button>
      <button @click="resetScores">Réinitialiser l'historique</button>
    </div>
  </div>
</template>

<script>
import { useScoreStore } from '../stores/quizStore.js';

export default {
  name: 'ScoresPage',
  setup() {
    const scoreStore = useScoreStore();
    return {
      scores: scoreStore.scores,
      goHome: () => {
        this.$router.push('/');
      },
      resetScores: () => {
        scoreStore.resetScores();
      },
    };
  },
};
</script>

<style scoped>
.scores {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h2 {
  color: #4CAF50;
  margin-bottom: 20px;
}

.score-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.score-item {
  font-size: 1.1em;
  margin: 10px 0;
  padding: 10px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.score-title {
  font-weight: bold;
}

.score-details {
  color: #555;
}

.buttons {
  margin-top: 20px;
}

button {
  margin: 0 5px;
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