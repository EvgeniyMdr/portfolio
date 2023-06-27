import { setIsUseSound } from "./soundModel";
import "./mouseControl";
import "./scrollAnimation";
import "./activeSectionController";
import "normalize.css";
import "./style.css";
import {
  handleWheelEvent,
  setActiveSection,
  setInterfaceIsActive,
} from "./activeSectionController";
import { hideIntroSection } from "./sectionControlModel";

const buttonSoundEnabled = document.querySelector(
  '[data-item="intro-sound-enable"]'
);
const buttonSoundDisabled = document.querySelector(
  '[data-item="intro-sound-disable"]'
);

buttonSoundEnabled?.addEventListener("click", () => {
  setIsUseSound(true);
  hideIntroSection();
  setInterfaceIsActive();
  setActiveSection("section-preview");
});

buttonSoundDisabled?.addEventListener("click", () => {
  setIsUseSound(false);
  hideIntroSection();
  setInterfaceIsActive();
  setActiveSection("section-preview");
});

window.addEventListener("wheel", handleWheelEvent);
