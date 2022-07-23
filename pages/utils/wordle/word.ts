import wordsList from './wordsList.json';
import targetWords from './targetWords.json';

export const isWordInList = (word: string) =>
  targetWords.includes(word) || wordsList.includes(word);

export const getRandomTargetWord = (): string => {
  return targetWords[Math.floor(Math.random() * targetWords.length)];
};
