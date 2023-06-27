import { createEffect, createEvent, createStore, sample } from "effector";

type Section = "section-preview" | "section-2" | "section-3" | "section-4";

const sections: Section[] = [
  "section-preview",
  "section-2",
  "section-3",
  "section-4",
];

export const setActiveSection = createEvent<Section>();
export const setActiveNextSection = createEvent();
export const setActivePrevSection = createEvent();
export const handleWheelEvent = createEvent<WheelEvent>();
export const setInterfaceIsActive = createEvent();

const activeSection = createStore<Section>(sections[0]);
const interfaceIsActive = createStore<boolean>(false);

interfaceIsActive.on(setInterfaceIsActive, () => true);

activeSection
  .on(setActiveSection, (_, payload) => {
    return payload;
  })
  .on(setActiveNextSection, (state) => {
    const currSectionIndex = sections.findIndex((el) => el === state);
    if (currSectionIndex < sections.length - 1) {
      return sections[currSectionIndex + 1];
    } else {
      return sections[0];
    }
  })
  .on(setActivePrevSection, (state) => {
    const currSectionIndex = sections.findIndex((el) => el === state);
    if (currSectionIndex > 1) {
      return sections[currSectionIndex - 1];
    } else {
      return sections[sections.length - 1];
    }
  });

const sectionChangerFx = createEffect((section: Section) => {
  document.body.setAttribute("data-active-section", section);
});

let scrollTimer: number | null = null;

const wheelHandlerFx = createEffect((e: WheelEvent) => {
  const isActive = interfaceIsActive.getState();
  if (isActive) {
    if (!scrollTimer) {
      if (e.deltaY > 1) {
        setActiveNextSection();
      } else if (e.deltaY < -2) {
        setActivePrevSection();
      }
      scrollTimer = setTimeout(() => {
        scrollTimer = null;
      }, 2000);
    }
  }
});

sample({
  clock: [setActiveSection, setActivePrevSection, setActiveNextSection],
  source: activeSection,
  target: sectionChangerFx,
});

sample({
  clock: [handleWheelEvent],
  target: wheelHandlerFx,
});
