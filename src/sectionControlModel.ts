import { createEffect, createEvent, forward } from "effector";

const introSection = document.querySelector('[data-section="section-intro"]');

export const hideIntroSection = createEvent();

const introSectionFx = createEffect(() => {
  introSection?.remove();
});

forward({
  from: hideIntroSection,
  to: introSectionFx,
});
