const config = {
  default: {
    refreshTimeOffset: 480,
    enableIdleAnimations: true,
    enableBlur: true,
    sidebarButtons: [
      { label: 'AL Facebook', icon: 'fab fa-facebook-square', url: '' },
      { label: 'AL Twitter', icon: 'fab fa-twitter', url: '' },
      { label: 'AL Reddit', icon: 'fab fa-reddit', url: '' },
      { label: 'Email', icon: 'fa fa-envelope', url: '', highlighted: true },
    ],
    secretaries: [
      { name: 'Long Island', skin: 'Default' },
      { name: 'Javelin', skin: 'Default' },
      { name: 'Ayanami', skin: 'Default' },
      { name: 'Laffey', skin: 'Default' },
      { name: 'Z23', skin: 'Default' },
    ],
    activeSecretaryIdx: 0,
    username: 'Shikikan',
  },
  active: {},
  keyname: 'al_keeper_usrcfg',
  init: () => {
    config.load();
  },
  load: () => {
    config.active = {
      ...config.default,
      ...JSON.parse(window.localStorage.getItem(config.keyname) || '{}'),
    };
    if (!window.localStorage.getItem(config.keyname)) {
      config.save();
    }
  },
  save: () => {
    window.localStorage.setItem(config.keyname, JSON.stringify(config.active));
  },
};
