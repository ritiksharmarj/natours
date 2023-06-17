export const hideAlert = () => {
  const el = document.querySelector('.alert');
  if (el) el.parentElement.removeChild(el);
};

/**
 * @param {String} type either "success" or "error"
 * @param {String} message alert message
 * @param {Number} time time in seconds
 */
export const showAlert = (type, message, time = 5) => {
  // first hide all the alerts that already exists.
  hideAlert();

  const markup = `<div class="alert alert--${type}">${message}</div>`;
  document.querySelector('body').insertAdjacentHTML('afterbegin', markup);

  // hide all the alerts after 5 seconds.
  window.setTimeout(hideAlert, time * 1000);
};
