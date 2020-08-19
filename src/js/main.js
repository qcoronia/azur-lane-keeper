const elements = {
  background: 'body',
  character: '#character',
};

const background = {
  setDaylight: function (daylight) {
    document.querySelector(elements.background).classList.add(daylight);
  }
};

const character = {
  setSprite: function (name) {
    const imgUrl = `./assets/sprites/${name}.png`;
    document.querySelector(elements.character).src = imgUrl;
  },

  setAnim: function (animName) {
    document.querySelector(elements.character).classList.add(animName);
  },

  tapped: function () {
    document.querySelector(elements.character).classList.remove('anim-floating');
    document.querySelector(elements.character).classList.add('anim-bob');
    setTimeout(() => {
      document.querySelector(elements.character).classList.add('anim-floating')
      document.querySelector(elements.character).classList.remove('anim-bob')
    }, 500);
  }
};

/** MAIN */

(function () {
  background.setDaylight('day');
  character.setSprite('Indianapolis');
  character.setAnim('anim-floating');
}) ();
