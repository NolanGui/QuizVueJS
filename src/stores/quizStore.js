import { defineStore } from 'pinia';

export const useScoreStore = defineStore('score', {
    state: () => ({
      scores: JSON.parse(localStorage.getItem('quizScores')) || [],
    }),
    actions: {
      addScore(score) {
        this.scores.push(score);
        localStorage.setItem('quizScores', JSON.stringify(this.scores));
      },
      resetScores() {
        this.scores = [];
        localStorage.removeItem('quizScores');
      },
    },
  });