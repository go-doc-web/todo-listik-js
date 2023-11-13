export const addTask = (id, title, text, isImpotant) => {
  const newTask = {
    id: Date.now(),
    title,
    text,
    isDone: false,
    isImpotant,
  };

  items.push(newTask);
};
