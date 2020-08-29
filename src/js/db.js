window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange

if (!window.indexedDB) {
   window.alert("Your browser doesn't support a stable version of IndexedDB.")
}

const db = {
  instance: null,
  init: (initDataSource) => new Promise(resolve => {
    const req_open = window.indexedDB.open('al_keeper');
    req_open.onupgradeneeded = evt => {
      const store_shipgirls = evt.target.result.createObjectStore('shipgirls', { keyPath: 'id' });
      store_shipgirls.createIndex('idx_name', 'names.en');
    };
    req_open.onsuccess = evt => {
      db.instance = evt.target.result;

      const req_record_count = db.getStore('shipgirls').count();
      req_record_count.onsuccess = evt => {
        if (evt.target.result <= 0) {
          initDataSource.shipgirls().then(shipgirls => {
            const store = db.getStore('shipgirls', 'readwrite');
            shipgirls.forEach(e => {
              store.add(e);
            });
          });
        }
        
        resolve();
      }
    };
  }),
  getStore: (store, permission) => db.instance
    .transaction(store, permission)
    .objectStore(store),
};
