import { render, screen } from '@testing-library/vue';
import { createPinia, setActivePinia } from 'pinia';
import ScoresPage from '../src/views/ScorePage.vue';
import '@testing-library/jest-dom';

describe('ScoresPage', () => {
  beforeEach(() => {
    const pinia = createPinia();
    setActivePinia(pinia);
  });

  it('renders scores correctly', () => {
    const scores = [
      { points: 8, bestStreak: 5 },
      { points: 6, bestStreak: 3 },
    ];
    localStorage.setItem('quizScores', JSON.stringify(scores));

    render(ScoresPage);

    expect(screen.getByText('Meilleurs Scores')).toBeInTheDocument();
    expect(screen.getByText('Partie 1 :')).toBeInTheDocument();
    expect(screen.getByText('Score : 8/10, Meilleure série : 5')).toBeInTheDocument();
    expect(screen.getByText('Partie 2 :')).toBeInTheDocument();
    expect(screen.getByText('Score : 6/10, Meilleure série : 3')).toBeInTheDocument();
  });
});