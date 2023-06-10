import axios from 'axios';
import { showAlert } from './alerts';

/**
 * @param {object} data user's name and email
 * @param {string} type either "password" or "data"
 */
export const updateSettings = async (data, type) => {
  try {
    const url =
      type === 'password'
        ? 'http://127.0.0.1:8000/api/v1/users/updateMyPassword'
        : 'http://127.0.0.1:8000/api/v1/users/updateMe';

    const response = await axios({
      method: 'PATCH',
      url,
      data,
    });

    if (response.data.status === 'success') {
      showAlert('success', `${type.toUpperCase()} updated successfully!`);
    }
  } catch (error) {
    showAlert('error', error.response.data.message);
  }
};
