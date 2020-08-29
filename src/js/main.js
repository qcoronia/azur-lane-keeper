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
    secretary_selector_inputs: '#secretary_selector > form > input[id^=secretary]',
  },
  clockInterval: -1,

  initHud: async () => {
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

    document.querySelector('#app').classList.add(curDaytime);

    const sidebarButtonTemplate = document.querySelector('#content_right > #sidebar_right > [template=button-sidebar]').outerHTML;
    document.querySelector(ui.hudElements.sidebar_right_buttons).innerHTML = config.active.sidebarButtons.map(sidebarButton => sidebarButtonTemplate
      .replace('template="button-sidebar"', '')
      .replace('{{label}}', sidebarButton.label)
      .replace('{{icon}}', sidebarButton.icon)
      .replace('{{highlighted}}', sidebarButton.highlighted ? 'highlighted' : ''))
      .join('');

    const shipNames = await service.getShipgirlNames();
    document.querySelector('#secretary_selector > form > #shipgirls').innerHTML = shipNames.map(c => `<option value="${c}">`).join('');
    document.querySelectorAll(ui.selectors.secretary_selector_inputs)
      .forEach((input, idx) => input.value = config.active.secretaries[idx]);
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
    config.secretaries = document.querySelectorAll(ui.selectors.secretary_selector_inputs).map(input => input.value);
    ui.toggleSecretarySelector();
  },
};

const secretary = {
  selector: '#secretary',
  selectorChibi: '#secretary_chibi',
  activeIdx: 0,

  changeActiveSecretary: async idx => {
    idx = isNaN(idx) ? 0 : idx;
    secretary.activeIdx = Math.min(Math.max(0, idx), 5);
    const name = config.active.secretaries[secretary.activeIdx];
    const shipgirls = await service.getShipgirlByName(name);
    const skin = shipgirls[0].skins.find(e => e.name === 'Default');
    document.querySelector(secretary.selector).style.backgroundImage = `url(${skin.image})`;
    document.querySelector(secretary.selectorChibi).style.backgroundImage = `url(${skin.chibi})`;
  },

  switchToNextSecretary: async () => {
    await secretary.changeActiveSecretary((secretary.activeIdx + 1) % 5);
  },

  setAnim: animName => {
    document.querySelector(secretary.selector).classList.add(animName);
  },

  setIconAnim: animName => {
    document.querySelector(secretary.selectorChibi).classList.add(animName);
  },

  tapped: () => {
    if (config.enableIdleAnimations) {
      document.querySelector(secretary.selector).classList.remove('anim-secretary-idle');
    }
    document.querySelector(secretary.selector).classList.add('anim-bob');
    setTimeout(() => {
      if (config.enableIdleAnimations) {
        document.querySelector(secretary.selector).classList.add('anim-secretary-idle');
      }
      document.querySelector(secretary.selector).classList.remove('anim-bob');
    }, 450);
  },
};

const main = {
  init: async () => {
    await main.waitForDeps();
    await service.init();
    config.load();
    await secretary.changeActiveSecretary(config.active.secretaries[0]);
    if (config.active.enableIdleAnimations) {
      secretary.setAnim('anim-secretary-idle');
      secretary.setIconAnim('anim-floating-icon');
    }

    ui.setUsername(config.active.username);
    await ui.initHud();
    document.querySelector('body').classList.toggle('loading');
  },
  waitForDeps: () => {
    return new Promise(resolve => {
      const checkDeps = () => {
        const isAllLoaded = [
          api,
          config,
          db,
          secretary,
          service,
          ui,
        ].every(dep => typeof dep !== 'undefined');
        if (isAllLoaded) {
          clearInterval(watchId);
          resolve();
        }
      };
      const watchId = setInterval(checkDeps, 500);
    });
  },
};

main.init();
