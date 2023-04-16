
export {playList};

const playList = [
//   'music-gallery/nice.wav',
//   'music-gallery/emotional-inspiring-story-125992.wav',
//   'music-gallery/catch-it-117676.wav',
//   'music-gallery/inspired-ambient-141686.wav',
//   'music-gallery/synth-pop-110351.wav',
  ,,,,,
  'https://cdn.pixabay.com/download/audio/2021/12/26/audio_5190d794a0.mp3?filename=dog-with-a-ball-12893.mp3',
  'https://cdn.pixabay.com/download/audio/2022/05/16/audio_03b9ebe9e0.mp3?filename=uneven-111379.mp3',
  'https://cdn.pixabay.com/download/audio/2023/02/28/audio_9140513784.mp3?filename=corporate-rhythm-140895.mp3',
  'https://cdn.pixabay.com/download/audio/2021/09/06/audio_548d84e6fb.mp3?filename=come-on-boy-8018.mp3',
  'https://cdn.pixabay.com/download/audio/2023/04/03/audio_6ae388992a.mp3?filename=coffee-lounge-145030.mp3',
  'https://cdn.pixabay.com/download/audio/2021/11/29/audio_599f170f2d.mp3?filename=piano-fantasy-11434.mp3',
  'https://cdn.pixabay.com/download/audio/2021/12/27/audio_8053281309.mp3?filename=happy-ukulele-and-bells-12978.mp3',
  'https://cdn.pixabay.com/download/audio/2023/02/28/audio_6c12eb16c5.mp3?filename=deep-retro-pop-140901.mp3',
  'https://cdn.pixabay.com/download/audio/2022/01/24/audio_bd97b05fb4.mp3?filename=life-of-a-wandering-wizard-15549.mp3',
  'https://cdn.pixabay.com/download/audio/2022/02/11/audio_6867d9bf19.mp3?filename=mystery-70-mix-20641.mp3',
];

playList[0] = document.getElementById('js-play').src;
for (let index = 1; index < 5; index++) {
  playList[index] = document.getElementById(`js-play${index}`).src; 
}