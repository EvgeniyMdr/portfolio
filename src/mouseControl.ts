import { playMouseSound } from "./soundModel";

const cursor = document.getElementById("custom-cursor");
const buttons: NodeListOf<HTMLButtonElement> =
  document.querySelectorAll(".button");
document.addEventListener("mouseenter", () => {
  cursor?.classList.add("active");
});

document.addEventListener("mousemove", (e) => {
  (cursor as HTMLDivElement).style["left"] = `${e.clientX}px`;
  (cursor as HTMLDivElement).style["top"] = `${e.clientY}px`;
});

document.addEventListener("mouseleave", () => {
  cursor?.classList.remove("active");
});

buttons.forEach((el: HTMLButtonElement) => {
  el.addEventListener("mouseenter", () => {
    cursor?.classList.add("over-elem");
  });
  el.addEventListener("mouseleave", () => {
    cursor?.classList.remove("over-elem");
  });

  el.addEventListener("click", () => {
    playMouseSound();
  });
});
