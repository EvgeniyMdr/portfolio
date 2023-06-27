import { createEffect, createEvent, createStore, sample } from "effector";
import startAudioSrc from "./assets/sounds/start.mp3";
import clickAudioSrc from "./assets/sounds/click.mp3";
import { hideIntroSection } from "./sectionControlModel";

export const isUseSound = createStore<boolean | null>(null);

export const setIsUseSound = createEvent<boolean>();
export const playMouseSound = createEvent();

const playStartAudioFx = createEffect((isPlay: boolean | null) => {
  if (isPlay) {
    const startAudio = new Audio(startAudioSrc);
    startAudio.play();
  }
  hideIntroSection();
});

const playMouseSoundFx = createEffect(
  ({ isUseSound }: { isUseSound: null | boolean }) => {
    if (isUseSound) {
      const clickAudio = new Audio(clickAudioSrc);
      clickAudio.play();
    }
  }
);

isUseSound.on(setIsUseSound, (_, payload) => {
  return payload;
});

sample({
  clock: isUseSound,
  target: playStartAudioFx,
});

sample({
  clock: playMouseSound,
  source: {
    isUseSound: isUseSound,
  },
  target: playMouseSoundFx,
});
