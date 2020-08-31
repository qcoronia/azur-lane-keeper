const service = {
  init: async () => {
    if (!db.instance) {
      await db.init({
        shipgirls: api.shipgirls.fetchAll,
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
    fetchAndCacheImage: async url => new Promise(resolve => {
      const images = db.getStore('images', 'readwrite');
      const req = images.get(url);
      req.onsuccess = () => {
        if (!!req.result) {
          resolve(req.result.dataUri);
        } else {
          fetch(url).then(res => {
            res.arrayBuffer().then(buffer => {
              const base64 = btoa([].slice.call(new Uint8Array(buffer))
                .reduce((p, c) => p + String.fromCharCode(c), ''));
              const dataUri = `data:image/png;base64,${base64}`;

              const images2 = db.getStore('images', 'readwrite');
              const entry = { url: url, dataUri: dataUri };
              const req2 = images2.add(entry);
              req2.onsuccess = () => {
                console.warn('added to db: ', entry);
                resolve(dataUri);
              };
            });
          });
        }
      };
    }),
  },
};
