<template>
  <div class="home">
    <h1>Bienvenue au Quiz de Culture Générale</h1>
    <p>Testez vos connaissances sur divers sujets et amusez-vous tout en apprenant !</p>
    
    <div class="select-options">
      <label>Catégorie :</label>
      <select v-model="selectedCategory">
        <option v-for="category in categories" :key="category.id" :value="category.id">
          {{ category.name }}
        </option>
      </select>

      <label>Difficulté :</label>
      <select v-model="selectedDifficulty">
        <option value="easy">Facile</option>
        <option value="medium">Moyenne</option>
        <option value="hard">Difficile</option>
      </select>
    </div>

    <div class="buttons">
      <button @click="startQuiz">Démarrer le Quiz</button>
      <button @click="viewScores">Voir mes Scores</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      selectedCategory: 9,
      selectedDifficulty: 'easy',
      categories: [
      { id: 9, name: "Culture Générale" },
      { id: 10, name: "Divertissement : Livres" },
      { id: 11, name: "Divertissement : Films" },
      { id: 12, name: "Divertissement : Musique" },
      { id: 13, name: "Divertissement : Comédies Musicales et Théâtres" },
      { id: 14, name: "Divertissement : Télévision" },
      { id: 15, name: "Divertissement : Jeux Vidéo" },
      { id: 16, name: "Divertissement : Jeux de Société" },
      { id: 17, name: "Sciences et Nature" },
      { id: 18, name: "Sciences : Informatique" },
      { id: 19, name: "Sciences : Mathématiques" },
      { id: 20, name: "Mythologie" },
      { id: 21, name: "Sports" },
      { id: 22, name: "Géographie" },
      { id: 23, name: "Histoire" },
      { id: 24, name: "Politique" },
      { id: 25, name: "Art" },
      { id: 26, name: "Animaux" },
      { id: 27, name: "Véhicules" },
      { id: 28, name: "Divertissement : BD" },
      { id: 29, name: "Science : Gadgets" },
      { id: 30, name: "Divertissement : Dessins Animés et Animations" },
      { id: 31, name: "Divertissement : Manga et Anime" },
      { id: 32, name: "Divertissement : Dessins Animés de Super Héros" }
    ],
    };
  },
  methods: {
    startQuiz() {
      this.$router.push({
        path: '/quiz',
        query: {
          category: this.selectedCategory,
          difficulty: this.selectedDifficulty,
        },
      });
    },
    viewScores() {
      this.$router.push('/score');
    },
  },
};
</script>

<style scoped>
  
  .home {
    max-width: 600px;
    margin: 20px auto; 
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    text-align: center; 
  }
  
  h1 {
    color: #4CAF50;
  }
  
  p {
    color: #555;
    margin-bottom: 20px; 
  }
  
  .buttons {
    display: flex;
    justify-content: center; 
  }
  
  button {
    background-color: #4CAF50; 
    color: white;
    border: none;
    padding: 10px 20px;
    margin: 10px;
    font-size: 1em;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  button:hover {
    background-color: #45a049; 
  }
</style>  