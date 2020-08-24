const config = {
  refreshTimeOffset: 480,
};

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
    section_highlight: '#section_highlight',
    username: '#username_field > span',
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
  background.setDaylight('day');
  character.setSprite('Indianapolis');
  character.setAnim('anim-floating');
  character.setIconAnim('anim-floating-icon');
  ui.setUsername('Alca');
  ui.initHud();
  ui.showHud();
}) ();
