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
      'Long Island',
      'Javelin',
      'Ayanami',
      'Laffey',
      'Z23',
    ],
    username: 'Shikikan',
  },
  active: {},
  keyname: 'al_mgr_cfg',
  init: () => {
    config.load();
  },
  load: () => {
    config.active = {
      ...config.default,
      ...JSON.parse(window.localStorage.getItem(config.keyname) || '{}'),
    };
  },
  save: () => {
    window.localStorage.setItem(config.keyname, JSON.stringify(config.active));
  },
};
