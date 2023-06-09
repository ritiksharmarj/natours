const login = async (email, password) => {
  console.log(email, password);

  try {
    const response = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:8000/api/v1/users/login',
      data: {
        email,
        password,
      },
    });

    console.log(response);
  } catch (error) {
    console.log(error.response.data.message);
  }
};

// Getting email and password from "/login" form
document.querySelector('.form').addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  login(email, password);
});
