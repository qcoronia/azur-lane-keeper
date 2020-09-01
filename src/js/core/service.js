const service = {
  init: async () => {
    if (!db.instance) {
      await db.init({
        shipgirls: azur_api.shipgirls.fetchAll,
      });
    }
  },
  shipgirls: {
    getAllNames: async () => new Promise(resolve => {
      const shipgirls = db.getStore('shipgirls', 'readwrite');
      const req = shipgirls.getAll();
      req.onsuccess = () => {
        if (!!req.result) {
          resolve(req.result.map(e => e.names.en));
        }
      }
    }),
    getByName: async name => new Promise(resolve => {
      const shipgirls = db.getStore('shipgirls', 'readwrite');
      const idx_name = shipgirls.index('idx_name');

      const req = idx_name.getAll(name);
      req.onsuccess = () => {
        if (!!req.result) {
          resolve(req.result);
        }
      }
    }),
  },
};
