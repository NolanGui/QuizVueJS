import { defineStore } from 'pinia';

export const useScoreStore = defineStore('score', {
    state: () => ({
      scores: JSON.parse(localStorage.getItem('quizScores')) || [],
    }),
    actions: {
      // Ajouter un score à la liste des scores
      addScore(score) {
        this.scores.push(score);
        localStorage.setItem('quizScores', JSON.stringify(this.scores));
      },
      // Réinitialiser les scores
      resetScores() {
        this.scores = [];
        localStorage.removeItem('quizScores');
      },
    },
  });