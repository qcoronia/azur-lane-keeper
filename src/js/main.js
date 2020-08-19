const background = {
  setDaylight: function (daylight) {
    document.querySelector('body').classList.add(daylight);
  }
};

const character = {
  setSprite: function (name) {
    const imgUrl = `./assets/sprites/${name}.png`;
    document.querySelector('img#character').src = imgUrl;
  },

  setAnim: function (animName) {
    document.querySelector('img#character').classList.add(animName);
  },

  tapped: function () {
    document.querySelector('img#character').classList.remove('anim-floating');
    document.querySelector('img#character').classList.add('anim-bob');
    setTimeout(() => {
      document.querySelector('img#character').classList.add('anim-floating')
      document.querySelector('img#character').classList.remove('anim-bob')
    }, 500);
  }
};

/** MAIN */

(function () {
  background.setDaylight('day');
  character.setSprite('Indianapolis');
  character.setAnim('anim-floating');
  preventDrag();
}) ();
