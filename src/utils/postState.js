export const postState = (state) => {
  fetch('http://192.168.1.4/state', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ state })
  })
    .then((response) => response.text())
    .then((data) => console.log('POST_data', data))
    .catch((error) => console.error('Error:', error));
};
