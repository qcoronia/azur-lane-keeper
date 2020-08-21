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
    section_highlight: '#section-highlight',
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
};

const character = {
  selector: '#character',
  setSprite: name => {
    const imgUrl = `./assets/sprites/${name}.png`;
    document.querySelector(character.selector).src = imgUrl;
  },

  setAnim: animName => {
    document.querySelector(character.selector).classList.add(animName);
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
  ui.showHud();
}) ();
