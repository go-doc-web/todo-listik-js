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

const modal = basicLightbox.create(`
    <div class="modal">
     <h2>${title}</h2>
          <div class="modal-text">
           ${text}
          </div>
    </div>
`);

let items = data;

// Функция Рендер
const render = () => {
  refs.list.innerHTML = '';
  refs.list.insertAdjacentHTML('beforeend', getTaskTemplate(items));
};

const toggleComplited = id => {
  items = items.map(item => (item.id === id ? { ...item, isDone: !item.isDone } : item));
  render();
};
const toggleImpotant = id => {
  items = items.map(item => (item.id === id ? { ...item, isImpotant: !item.isImpotant } : item));
  render();
};
const viewTask = id => {
  const viewTask = items.find(item => item.id === id);
  modal.show();

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

const handleListClick = e => {
  if (e.target === e.currentTarget) return;

  const parentTask = e.target.closest('li');
  const dataAction = e.target.closest('[data-action]');
  const { id } = parentTask.dataset;

  const { action } = dataAction.dataset;

  console.log(action);

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

refs.form.addEventListener('submit', handleSubmit);
refs.list.addEventListener('click', handleListClick);
render();

//Modal
