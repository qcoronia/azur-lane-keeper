const service = {
  init: async () => {
    if (!db.instance) {
      await db.init({
        shipgirls: api.fetchShipgirls,
      });
    }
  },
  getShipgirlNames: async () => new Promise(resolve => {
    const shipgirls = db.getStore('shipgirls', 'readwrite');
    const req = shipgirls.getAll();
    req.onsuccess = () => {
      if (!!req.result) {
        resolve(req.result.map(e => e.names.en));
      }
    }
  }),
  getShipgirlByName: async name => new Promise(resolve => {
    const shipgirls = db.getStore('shipgirls', 'readwrite');
    const idx_name = shipgirls.index('idx_name');

    const req = idx_name.getAll(name);
    req.onsuccess = () => {
      if (!!req.result) {
        resolve(req.result);
      }
    }
  }),
};
