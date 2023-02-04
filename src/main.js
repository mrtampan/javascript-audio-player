var slimSelectKu = new SlimSelect({
  select: '#chooseMusic',
});

const { Howl, Howler } = require('howler');
var playBtn,
  playList,
  playIndex,
  extension,
  sound,
  titlePlay,
  nextBtn,
  prevBtn,
  selectMusic,
  musicBank;
// Set Object References
playBtn = document.getElementById('playPause');
titlePlay = document.getElementById('titleMusic');
nextBtn = document.getElementById('nextPlay');
prevBtn = document.getElementById('prevPlay');
selectMusic = document.getElementById('chooseMusic');
modeSwitch = document.getElementsByName('modeS');

// Music Object

// gfriend = ['fever'];
// twice = ['candypop'];
// playList = twice.concat(gfriend);
playIndex = 0;
musicBank = 'https://mrtampan.github.io/caem_bank/';
// titlePlay.innerText = playList[playIndex];

// Setting Audio Player
extension = 'mp3';

// Event Listener Object
playBtn.addEventListener('click', playPause);
nextBtn.addEventListener('click', nextPlay);
prevBtn.addEventListener('click', prevPlay);
selectMusic.addEventListener('change', chooseMusic);

// Functional

function getDataMusic() {
  fetch(musicBank + 'data.json', {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((result) => {
      playList = result.music;

      console.log(result.music);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

function setOptionMusic() {
  var df = document.createDocumentFragment();
  console.log(playList);
  for (let i = 0; i < playList.length; i++) {
    let option = document.createElement('option');
    option.value = playList[i].source;
    option.appendChild(document.createTextNode(playList[i].name));
    df.appendChild(option);
  }
  selectMusic.appendChild(df);
}

function runHowler() {
  var howlcore = new Howl({
    src: [musicBank + playList[playIndex].source],
    format: ['mp3'],
    onend: onEnd,
    html5: true,
  });
  howlcore.play();
}

function playPause() {
  if (howlcore.playing() === false) {
    howlcore.play();
    playBtn.innerText = 'Pause';
  } else {
    howlcore.pause();
    playBtn.innerText = 'Play';
  }
}

function chooseMusic() {
  howlcore.stop();
  playIndex = selectMusic.selectedIndex;
  Howler.src([musicBank + playList[playIndex].source]);
  howlcore.play();
  changeTitle();
}

function changeTitle() {
  document.title = playList[playIndex].name;
  titlePlay.innerText = playList[playIndex].name;
}

function prevPlay() {
  howlcore.stop();
  if (playIndex == 0) {
    playIndex = 0;
    howlcore.play();
    changeTitle();
  } else {
    playIndex = playIndex - 1;
    console.log(playIndex);
    howlcore.play();
    changeTitle();
  }
}

function nextPlay() {
  howlcore.stop();
  if (playIndex >= playList.length - 1) {
    playIndex = 0;
    howlcore.play();
    changeTitle();
  } else {
    playIndex = playIndex + 1;
    howlcore.play();
    changeTitle();
  }
}

var onEnd = function () {
  if (playIndex >= playList.length - 1) {
    playIndex = 0;
    howlcore.play();
    changeTitle();
  } else {
    playIndex = playIndex + 1;
    howlcore.play();
    changeTitle();
  }
};

//Running System
async function run() {
  await getDataMusic();
  await setOptionMusic();
  await changeTitle();
  await runHowler();
}

run();
