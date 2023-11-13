export const getTaskTemplate = items => {
  const murkup = items
    .map(
      ({ id, title, text, isDone, isImpotant }) => `<li data-id="${id}" class="list-item">
            <div class="wrap">
              <input type="checkbox"  id="" data-action="completed" ${isDone ? 'checked' : ''} />
              <span class="item-text">${
                isImpotant ? '<span class="impotant">!</span>' : ''
              }  ${title}</span>
            </div>
            <div>
              <button class="btn" type="button" data-action="view">view</button>
              <button class="btn" type="button" data-action="delete">delete</button>
            </div>
          </li>
    `
    )
    .join('');
  return murkup;
};
