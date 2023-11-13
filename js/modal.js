export const closeModal = () => {
  const btnCloseModal = document.querySelector('.btn-close-modal');

  btnCloseModal.addEventListener('click', () => {
    document.body.classList.remove('show-modal');
  });
};

export const openModal = () => {
  document.body.classList.add('show-modal');
};
