import axios from 'axios';

const API_URL = 'http://localhost:3000/api/user';

class AuthService {
  login(user) {
    return axios
      .post(API_URL + '/login', {
        userName: user[0],
        password: user[1]
      })
      .then(response => {
        console.log(response.data)
        if (response.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios.post(API_URL + '/registro', {
      userName: user.userName,
      name: user.name,
      lastname: user.lastname,
      password: user.password,
      email: user.email,
      city: user.city,
    });
  }
}

export default new AuthService();
