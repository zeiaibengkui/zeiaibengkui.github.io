import { marked } from "marked";
import { isGithubIO } from "./util";

window.addEventListener("click", async (e) => {
  let target = e.target as HTMLAnchorElement;
  target = target.querySelector("a") || target;
  if (target.tagName != "A" || !target.href.includes("article://")) return;
  console.log("open in article");
  e.preventDefault();

  const m = target.href.match(/[0-9]/);
  if (!m) throw new Error("url parse failed:>> " + target.href);
  const href = isGithubIO ? `/public/articles/${m[0]}` : `/articles/${m[0]}`;
  console.log("href: ", href);

  const articleEl = document.getElementsByTagName("article")[0];

  // 动画关键帧

  // 播放消失动画
  const disappear = articleEl.animate(
    [
      {
        transform: "perspective(800px) translateZ(0)",
        filter: "blur(0)",
        opacity: 1,
        transformOrigin: "center 0vh",
      },
      {
        transform: "perspective(800px) translateZ(-25px)",
        filter: "blur(2px)",
        opacity: 0,
        transformOrigin: "center 0vh",
      },
    ],
    { ...{ duration: 300, easing: "ease-out" }, direction: "normal" }
  );

  let r = fetch(href + "/index.md");

  disappear.onfinish = async () => {
    articleEl.innerHTML = /*html*/`<div class=loading></div>`;
    let t = await (await r).text();
    t = t.replaceAll("%path%", href);
    const html = await marked(t);
    articleEl.innerHTML = html;

    // 播放出现动画
    articleEl.animate(
      [
        {
          transform: "perspective(800px) translateZ(0)",
          filter: "blur(0)",
          opacity: 1,
          transformOrigin: "center -20vh",
        },
        {
          transform: "perspective(800px) translateZ(-25px)",
          filter: "blur(2px)",
          opacity: 0,
          transformOrigin: "center 200vh",
        },
      ],
      {
        easing: "ease-in",
        direction: "reverse",
        duration: 1200,
      }
    );
  };
});
