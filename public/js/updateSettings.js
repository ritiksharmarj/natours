import axios from 'axios';
import { showAlert } from './alerts';

/**
 * @param {String} name user's full name
 * @param {String} email user's correct email
 */
export const updateData = async (name, email) => {
  try {
    const response = await axios({
      method: 'PATCH',
      url: 'http://127.0.0.1:8000/api/v1/users/updateMe',
      data: {
        name,
        email,
      },
    });

    if (response.data.status === 'success') {
      showAlert('success', 'Data updated successfully!');
    }
  } catch (error) {
    showAlert('error', error.response.data.message);
  }
};
