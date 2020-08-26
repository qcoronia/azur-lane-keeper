const al_api = {
  cache_keyname: 'al_mgr_ship_names',
  fetchShipNames: () => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'document';
    xhr.open('get', 'https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/ships.json', false);
    xhr.send();
    const html = JSON.parse(xhr2.responseText);
    const nameList = Object.keys(html2).map(e => html2[e].names.en);
    return nameList;
  },
  ensureShipNamesCached: () => {
    const cache = window.localStorage.getItem(cache_keyname);
    if (!cache) {
      const shipNames = al_api.fetchShipNames();
      window.localStorage.setItem(cache_keyname, JSON.stringify(shipNames));
    }
  }
};
