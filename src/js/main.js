const config = {
  refreshTimeOffset: 480,
};

const characters = [
  "Indianapolis",
  "Grenville",
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
    setTimeout(() => {
      ui.clockInterval = setInterval(updateClock, 1000);
    }, curDate.getMilliseconds() - 1000);

    const curHour = curDate.getHours();
    let curDaytime = 'day';
    if (curHour > 0) {
      curDaytime = 'night';
    } else if (curHour > 5) {
      curDaytime = 'twilight';
    } else if (curHour > 7) {
      curDaytime = 'day';
    } else if (curHour > 16) {
      curDaytime = 'twilight';
    } else if (curHour > 18) {
      curDaytime = 'night';
    }
    
    background.setDaylight(curDaytime);

    const sidebarButtons = [
      { label: 'AL Facebook', icon: 'fab fa-facebook-square', url: '' },
      { label: 'AL Twitter', icon: 'fab fa-twitter', url: '' },
      { label: 'AL Reddit', icon: 'fab fa-reddit', url: '' },
      { label: 'Email', icon: 'fa fa-envelope', url: '', highlighted: true },
    ];
    const sidebarButtonTemplate = document.querySelector('#content_right > #sidebar_right > [template=button-sidebar]').outerHTML;
    document.querySelector(ui.hudElements.sidebar_right_buttons).innerHTML = sidebarButtons.map(sidebarButton => sidebarButtonTemplate
      .replace('template="button-sidebar"', '')
      .replace('{{label}}', sidebarButton.label)
      .replace('{{icon}}', sidebarButton.icon)
      .replace('{{highlighted}}', sidebarButton.highlighted ? 'highlighted' : ''));

    document.querySelectorAll('#secretary_selector > datalist[id^=secretary]').forEach(el => {
      el.innerHTML = characters.map(c => `<option value=${c}/>`);
    });
  },
  showHud: () => {
    const selectors = Object.values(ui.hudElements).join(',');
    document.querySelectorAll(selectors).forEach(el => el.classList.remove('hidden'));
    document.querySelectorAll(selectors).forEach(el => el.classList.add('visible'));
  },
  hideHud: () => {
    const selectors = Object.values(ui.hudElements).join(',');
    document.querySelectorAll(selectors).forEach(el => el.classList.remove('visible'));
    document.querySelectorAll(selectors).forEach(el => el.classList.add('hidden'));
  },
  setUsername: username => {
    document.querySelector(ui.hudElements.username).innerHTML = username;
  },
  characterIconClicked: () => {
    document.querySelector(ui.hudElements.secretary_selector).classList.remove('hidden');
    document.querySelector(ui.hudElements.secretary_selector).classList.remove('visible');
  },
  closeSecretarySelector: () => {
    document.querySelector(ui.hudElements.secretary_selector).classList.remove('visible');
    document.querySelector(ui.hudElements.secretary_selector).classList.remove('hidden');
  },
};

const character = {
  selector: '#character',
  selectorChibi: '#character_chibi',
  currentCharacter: '',
  setSprite: name => {
    if (document.querySelector(character.selectorChibi).classList.lenght > 0) {
      document.querySelector(character.selectorChibi).classList.remove(character.currentCharacter);
    }
    character.currentCharacter = name;
    const imgUrl = `./assets/sprites/${name}.png`;
    document.querySelector(character.selector).src = imgUrl;
    document.querySelector(character.selectorChibi).classList.add(name);
  },

  setAnim: animName => {
    document.querySelector(character.selector).classList.add(animName);
  },

  setIconAnim: animName => {
    document.querySelector(character.selectorChibi).classList.add(animName);
  },

  tapped: () => {
    document.querySelector(character.selector).classList.remove('anim-floating');
    document.querySelector(character.selector).classList.add('anim-bob');
    setTimeout(() => {
      document.querySelector(character.selector).classList.add('anim-floating');
      document.querySelector(character.selector).classList.remove('anim-bob');
    }, 450);
  }
};

/** MAIN */

(function () {
  character.setSprite('Indianapolis');
  character.setAnim('anim-floating');
  character.setIconAnim('anim-floating-icon');
  ui.setUsername('Alca');
  ui.initHud();
  ui.showHud();
}) ();
