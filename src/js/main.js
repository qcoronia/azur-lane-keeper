const config = {
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
    'LongIsland',
    'Javeline',
    'Ayanami',
    'Laffey',
    'Z23',
  ],
  username: 'Shikikan',
};

const characters = [
  'Indianapolis',
  'Grenville',
];

const background = {
  selector: 'body',
  setDaylight: daylight => {
    document.querySelector(background.selector).classList.add(daylight);
  }
};

const ui = {
  hudElements: {
    topbar: '#topbar',
    bottombar: '#bottombar',
    sidebar_right: '#sidebar_right',
    sidebar_right_buttons: '#sidebar_right > .buttons-configurable',
    section_highlight: '#section_highlight',
  },
  selectors: {
    username: '#username_field > span',
    secretary_selector: '#secretary_selector',
  },
  clockInterval: -1,

  initHud: () => {
    const curDate = new Date();
    const updateClock = () => {
      const date = new Date();
      document.querySelector('#counter_clock > .content').innerHTML = date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
    };
    updateClock();
    setTimeout(() => {
      ui.clockInterval = setInterval(updateClock, 1000);
    }, curDate.getMilliseconds() - 1000);

    const curHour = curDate.getHours();
    let curDaytime = 'day';
    if (curHour > 18) {
      curDaytime = 'night';
    } else if (curHour > 16) {
      curDaytime = 'twilight';
    } else if (curHour > 7) {
      curDaytime = 'day';
    } else if (curHour > 5) {
      curDaytime = 'twilight';
    } else if (curHour > 0) {
      curDaytime = 'night';
    }

    background.setDaylight(curDaytime);

    const sidebarButtonTemplate = document.querySelector('#content_right > #sidebar_right > [template=button-sidebar]').outerHTML;
    document.querySelector(ui.hudElements.sidebar_right_buttons).innerHTML = config.sidebarButtons.map(sidebarButton => sidebarButtonTemplate
      .replace('template="button-sidebar"', '')
      .replace('{{label}}', sidebarButton.label)
      .replace('{{icon}}', sidebarButton.icon)
      .replace('{{highlighted}}', sidebarButton.highlighted ? 'highlighted' : ''));

    document.querySelector('#secretary_selector > form > #shipgirls').innerHTML = characters.map(c => `<option value="${c}">`).join('');
    document.querySelectorAll('#secretary_selector > form > input[id^=secretary]')
      .forEach((input, idx) => input.value = config.secretaries[idx]);
    ui.toggleSecretarySelector();
  },

  showHud: () => {
    const selectors = Object.values(ui.hudElements).join(',');
    document.querySelectorAll(selectors).forEach(el => el.classList.toggle('hidden'));
  },

  hideHud: () => {
    const selectors = Object.values(ui.hudElements).join(',');
    document.querySelectorAll(selectors).forEach(el => el.classList.toggle('hidden'));
  },

  setUsername: username => {
    document.querySelector(ui.selectors.username).innerHTML = username;
  },

  toggleSecretarySelector: () => {
    document.querySelector(ui.selectors.secretary_selector).classList.toggle('hidden');
  },

  updateSecretaryRotation: () => {
    ui.toggleSecretarySelector();
  },
};

const character = {
  selector: '#character',
  selectorChibi: '#character_chibi',
  currentCharacter: '',

  setSprite: name => {
    if (document.querySelector(character.selector).classList.length > 0) {
      document.querySelector(character.selector).classList.remove(character.currentCharacter);
    }
    if (document.querySelector(character.selectorChibi).classList.length > 0) {
      document.querySelector(character.selectorChibi).classList.remove(character.currentCharacter);
    }
    character.currentCharacter = name;
    document.querySelector(character.selector).classList.add(name);
    document.querySelector(character.selectorChibi).classList.add(name);
  },

  setAnim: animName => {
    document.querySelector(character.selector).classList.add(animName);
  },

  setIconAnim: animName => {
    document.querySelector(character.selectorChibi).classList.add(animName);
  },

  tapped: () => {
    if (config.enableIdleAnimations) {
      document.querySelector(character.selector).classList.remove('anim-secretary-idle');
    }
    document.querySelector(character.selector).classList.add('anim-bob');
    setTimeout(() => {
      if (config.enableIdleAnimations) {
        document.querySelector(character.selector).classList.add('anim-secretary-idle');
      }
      document.querySelector(character.selector).classList.remove('anim-bob');
    }, 450);
  },
};

/** MAIN */

(function () {
  character.setSprite(config.secretaries[0]);
  if (config.enableIdleAnimations) {
    character.setAnim('anim-secretary-idle');
    character.setIconAnim('anim-floating-icon');
  }

  ui.setUsername(config.username);
  ui.initHud();
}) ();
