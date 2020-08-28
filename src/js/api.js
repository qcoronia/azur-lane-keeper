const api = {
  fetch: url => new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('get', url, true);
    xhr.onload = evt => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        resolve(response);
      } else {
        console.error(xhr.statusText);
        reject();
      }
    };
    xhr.send();
  }),
  fetchShipgirls: () => api.fetch('https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/ships.json').then(response => {
    const entities = Object.values(response);
    return entities;
  }),
};
