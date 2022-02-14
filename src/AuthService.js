var users = [
  {
    username: 'crasu341@gmail.com',
    password: 'test',
    firstName: 'abc',
    lastName: 'inc',
    layout: 'LayoutOne',
  },
];
const login = (username, password) => {
  
  return new Promise((resolve, reject) => {

    let responseJson="";
    // find if any user matches login credentials

    let filteredUsers = users.filter((user) => {
      return user.username === username && user.password === password;
    });

    if (filteredUsers.length) {
      // if login details are valid return user details and fake jwt token
      let user = filteredUsers[0];
    
      let responseJson = {
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        layout:  user.layout,
      };
      resolve( JSON.stringify(responseJson));
      localStorage.setItem('user', JSON.stringify(responseJson));
    } else {
      // else return error
      reject('Username or password is incorrect');
    }
    return responseJson;
  });
};
const logout = () => {
  localStorage.removeItem('user');
};

export default {
  login,
  logout,
};
