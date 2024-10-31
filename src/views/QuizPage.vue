<template>
  <div class="quiz-container">
    <h2>Quiz de Culture Générale</h2>
    <div v-if="!isFinished">
      <div class="progress">
        Question {{ currentQuestionIndex + 1 }} sur {{ questions.length }}
        <div class="progress-circle" :style="progressCircleStyle">
          <span class="timer">{{ timer }}</span>
        </div>
      </div>
      <div class="question" v-if="currentQuestion">
        <p>{{ currentQuestion.question }}</p>
      </div>
      <div v-else>
        <p>Chargement des questions...</p>
      </div>
      <div class="options" v-if="currentQuestion">
        <div
          v-for="(option, index) in currentQuestion.options"
          :key="index"
          class="option"
          :class="{
            disabled: isOptionSelected,
            correct: isOptionSelected && option === currentQuestion.correctAnswer,
            incorrect: isOptionSelected && option === selectedOption && option !== currentQuestion.correctAnswer
          }"
          @click="selectOption(option)"
        >
          {{ option }}
        </div>
      </div>
      <button @click="nextQuestion" class="next-button" :disabled="!selectedOption">Suivant</button>
      <p v-if="feedback" class="feedback">{{ feedback }}</p>

      <div v-if="goodStreak > 1" class="streak">
        🔥 Série de bonnes réponses : {{ goodStreak }}
      </div>
      <div v-if="badStreak > 1" class="streak">
        ❄️ Série de mauvaises réponses : {{ badStreak }}
      </div>
    </div>
    <div v-else>
      <h3>Résultat : {{ score }}/{{ questions.length }}</h3>
      <p>{{ finalComment }}</p>
      <button @click="restartQuiz" class="restart-button">Rejouer</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuizPage',
  data() {
    return {
      questions: [],
      currentQuestionIndex: 0,
      selectedOption: null,
      score: 0,
      feedback: '',
      isFinished: false,
      timer: 20,
      initialTime: 20,
      timerInterval: null,
      goodStreak: 0,
      badStreak: 0,
      bestStreak: 0,
      isOptionSelected: false,
    };
  },
  computed: {
    progressCircleStyle() {
      const progress = ((this.initialTime - this.timer) / this.initialTime) * 100;
      return {
        background: `conic-gradient(#42b983 ${progress}%, #ddd ${progress}% 100%)`,
      };
    },
    currentQuestion() {
      return this.questions[this.currentQuestionIndex];
    },
    finalComment() {
      if (this.score === this.questions.length) {
        return "Excellent travail ! 🎉";
      } else if (this.score >= this.questions.length / 2) {
        return "Pas mal ! Vous avez bien répondu ! 😊";
      } else {
        return "Il y a encore du travail à faire. Essayez encore ! 😅";
      }
    },
  },
  created() {
    this.fetchQuestions();
  },
  methods: {
    async fetchQuestions() {
      const category = this.$route.query.category || 9;
      const difficulty = this.$route.query.difficulty || 'easy';

      try {
        const response = await fetch(
          `https://opentdb.com/api.php?amount=10&type=multiple&difficulty=${difficulty}&category=${category}`
        );
        const data = await response.json();
        this.questions = data.results.map((item) => ({
          question: item.question,
          options: [...item.incorrect_answers, item.correct_answer].sort(() => Math.random() - 0.5),
          correctAnswer: item.correct_answer,
        }));
        this.startTimer();
      } catch (error) {
        console.error("Erreur lors de la récupération des questions :", error);
      }
    },
    selectOption(option) {
      if (!this.isOptionSelected) {
        this.selectedOption = option;
        this.isOptionSelected = true;
        if (this.selectedOption === this.currentQuestion.correctAnswer) {
          this.feedback = 'Correct ! 🎉';
          this.score++;
          this.goodStreak++;
          this.badStreak = 0;

          if (this.goodStreak > this.bestStreak) {
            this.bestStreak = this.goodStreak;
          }
        } else {
          this.feedback = 'Incorrect ! 😢';
          this.badStreak++;
          this.goodStreak = 0;
        }
        clearInterval(this.timerInterval);
      }
    },
    startTimer() {
      this.timer = 20;
      this.timerInterval = setInterval(() => {
        if (this.timer > 0) {
          this.timer--;
        } else {
          clearInterval(this.timerInterval);
          this.feedback = 'Temps écoulé ! 😢';
          this.nextQuestion();
        }
      }, 1000);
    },
    resetTimer() {
      clearInterval(this.timerInterval);
      this.startTimer();
    },
    nextQuestion() {
      this.selectedOption = null;
      this.feedback = '';
      this.isOptionSelected = false;
      this.currentQuestionIndex++;

      if (this.currentQuestionIndex >= this.questions.length) {
        this.isFinished = true;
        this.saveScore();
      } else {
        this.resetTimer();
      }
    },
    saveScore() {
      const currentScore = {
        points: this.score,
        bestStreak: this.bestStreak,
      };

      const scores = JSON.parse(localStorage.getItem('quizScores')) || [];
      scores.push(currentScore);
      localStorage.setItem('quizScores', JSON.stringify(scores));
    },
    restartQuiz() {
      this.currentQuestionIndex = 0;
      this.score = 0;
      this.isFinished = false;
      this.goodStreak = 0;
      this.badStreak = 0;
      this.bestStreak = 0;
      this.fetchQuestions();
    },
  },
};
</script>

<style>
.streak {
  font-size: 1.2em;
  margin-top: 15px;
}
.quiz-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.question {
  margin-bottom: 20px;
  font-size: 1.2em;
}

.options {
  display: flex;
  flex-direction: column;
}

.option {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin: 5px 0;
  cursor: pointer;
  transition: background-color 0.3s;
}

.option.disabled {
  pointer-events: none; 
}

.option:hover {
  background-color: #e6e6e6;
}

.next-button, .restart-button {
  margin-top: 20px;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  background-color: #42b983;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

.next-button:disabled {
  background-color: #ccc;
}

.next-button:hover:not(:disabled),
.restart-button:hover {
  background-color: #3a9c70;
}

.feedback {
  margin-top: 10px;
  font-size: 1em;
}

.progress {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  font-size: 1.1em;
  color: #333;
}

.progress-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: conic-gradient(#42b983 0%, #ddd 0%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin: 10px 0;
}

.timer {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.2em;
  color: #333;
}
.option.correct {
  background-color: #d4edda;
  border-color: #28a745;
  color: #155724;
}

.option.incorrect {
  background-color: #f8d7da;
  border-color: #dc3545;
  color: #721c24;
}
</style>