// types
import { Card } from 'models/common';

// images
import chicken from '../assets/images/chicken.png';
import tiger from '../assets/images/tiger.png';
import crab from '../assets/images/crab.png';
import penguin from '../assets/images/penguin.png';
import turtle from '../assets/images/turtle.png';
import donkey from '../assets/images/donkey.png';
import sheep from '../assets/images/sheep.png';
import bullDog from '../assets/images/bull-dog.png';
import cow from '../assets/images/cow.png';
import crabGlass from '../assets/images/crab-glass.png';
import fish from '../assets/images/fish.png';
import puffer from '../assets/images/puffer.png';
import squid from '../assets/images/squid.png';
import hmm from '../assets/images/hmm.png';

const cards: Card[] = [
  { photo: chicken, score: 100, label: 'chicken' },
  { photo: tiger, score: 100, label: 'tiger' },
  { photo: crab, score: 100, label: 'crab' },
  { photo: penguin, score: 100, label: 'penguin' },
  { photo: turtle, score: 100, label: 'turtle' },
  { photo: donkey, score: 100, label: 'donkey' },
  { photo: sheep, score: 100, label: 'sheep' },
  { photo: bullDog, score: 100, label: 'bullDog' },
  { photo: cow, score: 100, label: 'cow' },
  { photo: crabGlass, score: 100, label: 'crabGlass' },
  { photo: fish, score: 100, label: 'fish' },
  { photo: puffer, score: 100, label: 'puffer' },
  { photo: squid, score: 100, label: 'squid' },
  { photo: hmm, score: 400, label: 'hmm' },
];

const randomCards = () => {
  const randomCard = () => cards[Math.floor(Math.random() * cards.length)];

  const counter: { [key: string]: number } = {};

  return [...Array(3)].map(() => {
    const card = randomCard();

    counter[card.label] = (counter[card.label] || 0) + 1;

    return { ...card, score: counter[card.label] * card.score };
  });
};

export default randomCards;
