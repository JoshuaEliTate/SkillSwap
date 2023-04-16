export const createUser = (userData) => {
  return fetch('/api/users/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
};

export const loginUser = (userData) => {
  return fetch('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
};

export const getUser = (userId, token) => {
  return fetch(`/api/users/user/${userId}`, {
    method: 'GET',
  });
};

export const getAllUsers = () => {
  return fetch(`/api/users/user/all`, {
    method: 'GET',
  });
};

export const createSkill = (skillData) => {
  return fetch(`/api/skill`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(skillData),
  });
};
