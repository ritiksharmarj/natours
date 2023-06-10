export const hideAlert = () => {
  const el = document.querySelector('.alert');
  if (el) el.parentElement.removeChild(el);
};

/**
 * @param {String} type either "success" or "error"
 * @param {String} message alert message
 */
export const showAlert = (type, message) => {
  // first hide all the alerts that already exists.
  hideAlert();

  const markup = `<div class="alert alert--${type}">${message}</div>`;
  document.querySelector('body').insertAdjacentHTML('afterbegin', markup);

  // hide all the alerts after 5 seconds.
  window.setTimeout(hideAlert, 5000);
};
