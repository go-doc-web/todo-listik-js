// Refs

import { refs } from './refs.js';

// Модель данных
import { data } from './todo-db.js';

// Функция получения разметки
import { getTaskTemplate } from './getTaskTemplate.js';

// Function addTask add newTask

import { addTask } from './addTask.js';

const items = data;

// Функция Рендер

const render = () => {
  refs.list.innerHTML = '';
  refs.list.insertAdjacentHTML('beforeend', getTaskTemplate(items));
};

render();

const handleSubmit = e => {
  e.preventDefault();
  console.log(e.currentTarget);
  console.log(e.target);

  const title = e.target.elements.title.value;
  const text = e.target.elements.text.value;
  const isImpotant = e.target.elements.important.checked;

  console.log(isImpotant);
  addTask();

  console.log(newTask);

  render();
  refs.form.reset();
};

refs.form.addEventListener('submit', handleSubmit);
