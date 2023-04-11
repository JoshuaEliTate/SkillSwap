export const createUser = (userData) => {
  return fetch('/api/users', {
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

// remove saved book data for a logged in user
export const getUser = (userId, token) => {
  return fetch(`/api/users/user/${userId}`, {
    method: 'GET',
    //   headers: {
    //     authorization: `Bearer ${token}`,
    //   },
  });
};
