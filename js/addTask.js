import { nanoid } from '../node_modules/nanoid/nanoid.js';

export const addTask = (title, text, isImpotant) => {
  const newTask = {
    id: nanoid(),
    title,
    text,
    isDone: false,
    isImpotant,
  };

  return newTask;
};
