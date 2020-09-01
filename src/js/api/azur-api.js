const azur_api = {
  shipgirls: {
    fetchAll: () => fetch('https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/ships.json')
      .then(response => response.json())
      .then(response => Object.values(response)),
  }
};
