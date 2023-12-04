import lockal from './lockalstorage.js';

export const fetchTodos = () => {
  try {
    const todos = localStorage.getItem('todos');
    const res = JSON.parse(todos);

    return res || [];
  } catch (error) {
    console.log('pisdets');
    return [];
  }
};

export const createTodo = payload => {
  lockal.save('todos', payload);
  // const convertedJson = JSON.stringify(payload);
  // localStorage.setItem('todos', convertedJson);
};
export const updateTodo = payload => {
  lockal.save('todos', payload);
  // const convertedJson = JSON.stringify(payload);
  // localStorage.setItem('todos', convertedJson);
};
export const deleteTodo = payload => {
  lockal.save('todos', payload);
  // const convertedJson = JSON.stringify(payload);
  // localStorage.setItem('todos', convertedJson);
};
