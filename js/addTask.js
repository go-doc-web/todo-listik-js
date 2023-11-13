export const addTask = (title, text, isImpotant) => {
  const newTask = {
    id: Date.now(),
    title,
    text,
    isDone: false,
    isImpotant,
  };

  return newTask;
};
