// Refs
import { refs } from './refs.js';
// Модель данных
import { data } from './todo-db.js';
// Функция получения разметки
import { getTaskTemplate } from './getTaskTemplate.js';
// Function addTask add newTask
import { addTask } from './addTask.js';

import { closeModal, openModal } from './modal.js';
import { getTaskTemplateFull } from './getTaskTemplateFull.js';

let items = data;

// Функция Рендер
const render = () => {
  refs.list.innerHTML = '';
  refs.list.insertAdjacentHTML('beforeend', getTaskTemplate(items));
};

const toggleComplited = id => {
  items = items.map(item => (item.id === id ? { ...item, isDone: !item.isDone } : item));
  render();
  console.log(items);
};
const viewTask = id => {
  const viewTask = items.find(item => item.id === id);

  console.log(getTaskTemplateFull(viewTask));
  openModal();
  closeModal();
  const contentModal = document.querySelector('.content-modal');
  contentModal.innerHTML = '';
  contentModal.insertAdjacentHTML('beforeend', getTaskTemplateFull(viewTask));

  render();
};
const deleteTask = id => {
  items = items.filter(item => item.id !== id);

  render();
};

const handleSubmit = e => {
  e.preventDefault();

  const title = e.target.elements.title.value;
  const text = e.target.elements.text.value;
  const isImpotant = e.target.elements.important.checked;

  items.push(addTask(title, text, isImpotant));
  render();
  refs.form.reset();
};

const handleList = e => {
  if (e.target === e.currentTarget) return;

  const parent = e.target.closest('li');
  const { id } = parent.dataset;

  const { action } = e.target.dataset;

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

    default:
      break;
  }
};

refs.form.addEventListener('submit', handleSubmit);
refs.list.addEventListener('click', handleList);
render();