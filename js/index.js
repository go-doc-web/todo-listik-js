import { nanoid } from '../node_modules/nanoid/nanoid.js';

// Refs
import { refs } from './refs.js';
// Модель данных
// import { data } from './todo-db.js';
// Функция получения разметки
import { getTaskTemplate } from './getTaskTemplate.js';

import { closeModal, openModal } from './modal.js';
import { getTaskTemplateFull } from './getTaskTemplateFull.js';
import { createTodo, fetchTodos, deleteTodo, updateTodo } from './todoApi.js';

let items = [];

// Функция Рендер
const render = () => {
  refs.list.innerHTML = '';
  refs.list.insertAdjacentHTML('beforeend', getTaskTemplate(items));
};
const addTask = item => {
  items.push(item);
};

const toggleComplited = id => {
  items = items.map(item => (item.id === id ? { ...item, isDone: !item.isDone } : item));
  updateTodo(items);
  render();
};
const toggleImpotant = id => {
  items = items.map(item => (item.id === id ? { ...item, isImpotant: !item.isImpotant } : item));
  updateTodo(items);

  render();
};
const viewTask = id => {
  const viewTask = items.find(item => item.id === id);

  openModal();
  closeModal();
  const contentModal = document.querySelector('.content-modal');
  contentModal.innerHTML = '';
  contentModal.insertAdjacentHTML('beforeend', getTaskTemplateFull(viewTask));

  render();
};
const deleteTask = id => {
  items = items.filter(item => item.id !== id);
  deleteTodo(items);
  render();
};

const handleSubmit = e => {
  e.preventDefault();

  const { value: title } = e.target.elements.title;
  const { value: text } = e.target.elements.text;
  const { checked: isImpotant } = e.target.elements.important;

  const payload = {
    id: nanoid(),
    title,
    text,
    isDone: false,
    isImpotant,
  };

  addTask(payload);
  createTodo(items);

  render();
  refs.form.reset();
};

const handleListClick = e => {
  if (e.target === e.currentTarget) return;
  if (e.target.nodeName === 'LI') return;
  if (e.target.classList.contains('item-text')) return;

  const parentTask = e.target.closest('li');
  const dataAction = e.target.closest('[data-action]');
  const { id } = parentTask.dataset;

  const { action } = dataAction.dataset;

  switch (action) {
    case 'completed':
      toggleComplited(id);
      break;
    case 'view':
      viewTask(id);
      break;
    case 'delete':
      deleteTask(id);
      break;
    case 'impotant':
      toggleImpotant(id);
      break;

    default:
      break;
  }
};

const loadData = () => {
  items = fetchTodos();
};

refs.form.addEventListener('submit', handleSubmit);
refs.list.addEventListener('click', handleListClick);
loadData();
render();

//Modal
