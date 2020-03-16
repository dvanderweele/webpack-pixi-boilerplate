import * as PIXI from "pixi.js";
import logoGlitch from "./logo-glitch.png";
import { looper } from "./looper";

export const run = () => {
  let app;

  let width =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;

  let height =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;

  const startAspect = width > height ? "wide" : "tall";

  window.onload = () => {
    app = new PIXI.Application({
      /*
        aspect ratio calculations assume a game display area of 
          320 wide by 200 tall. remaining space is for touch controls

        wide aspect should 440 wide and 200 tall
        -- this enables space on sides for touch controls, 60 pixels each
        -- should stretch to full viewport height, also centered horizontally

        tall aspect ratio should be 320 wide by 260 tall
        -- this gives standard game area of 320 by 200
        -- leaves extra 60 pixels on bottom for touch controls
      */
      width: startAspect === "wide" ? 440 : 320,
      height: startAspect === "wide" ? 200 : 320,
      backgroundColor: 0x061639
    });
    document.body.appendChild(app.view);
    /*
      scale canvas to viewport
    */
    const wrapper = document.querySelector("body");
    wrapper.style.width = "100vw";
    wrapper.style.height = "100vh";
    wrapper.style.maxWidth = "100vw";
    wrapper.style.maxHeight = "100vh";
    wrapper.style.margin = "0";
    wrapper.style.padding = "0";
    wrapper.style.display = "flex";
    wrapper.style.flexDirection = startAspect === "wide" ? "row" : "column";
    wrapper.style.alignItems = "center";
    wrapper.style.justifyContent =
      startAspect === "wide" ? "center" : "flex-end";

    const canv = document.querySelector("canvas");
    if (startAspect === "wide") {
      if (width / height >= 440 / 200) {
        /* 
          page is wider aspect ratio than canvas or equal to
          ergo, we can make canvas height equal to page height
        */
        canv.style.height = "100vh";
        canv.style.width = String((height / 100) * height * 2.2) + "px";
      } else {
        /*
          page is wide aspect ratio but still narrower aspect 
          ratio than canvas. 
          ergo, make canvas stretch to full page width
        */
        canv.style.height = String((200 / 440) * width) + "px";
        canv.style.width = "100vw";
      }
    } else {
      canv.style.width = "100vw";
      canv.style.height = canv.style.width;
    }

    let keys = [];

    let logo = new PIXI.Sprite.from(logoGlitch);
    logo.anchor.set(0.5);
    // logo.width = app.view.width / 2.5;
    // logo.height = logo.width;
    logo.scale.set(0.25, 0.25);
    logo.x = app.view.width / 2;
    logo.y = app.view.height / 2;

    app.stage.addChild(logo);

    const vupper = 1;
    const aupper = 1;
    const vlower = -1;
    const alower = -1;
    let v = 0;
    let a = 0;

    const gameloop = dt => {
      if (keys["ArrowLeft"]) {
        a = a < aupper ? a + 0.01 : a;
        v = v < vupper ? v + a : v;
      } else if (keys["ArrowRight"]) {
        a = a > alower ? a - 0.01 : a;
        v = v > vlower ? v + a : v;
      } else {
        if (a > 0) {
          a -= 0.01;
        } else if (a < 0) {
          a += 0.01;
        }
        if (v > 0) {
          v -= 0.01;
        } else if (v < 0) {
          v += 0.01;
        }
      }
      logo.rotation += v * dt;
    };

    app.ticker.add(gameloop);

    const keysdown = e => {
      keys[e.key] = true;
    };

    const keysup = e => {
      keys[e.key] = false;
    };

    window.addEventListener("keydown", keysdown);
    window.addEventListener("keyup", keysup);

    // end onload
  };

  window.onresize = () => {
    width =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;

    height =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;

    let resizeAspect = width > height ? "wide" : "tall";
    app.width = startAspect === "wide" ? 440 : 320;
    app.height = startAspect === "wide" ? 200 : 320;
    /*
      scale canvas to viewport
    */
    const wrapper = document.querySelector("body");
    wrapper.style.width = "100vw";
    wrapper.style.height = "100vh";
    wrapper.style.maxWidth = "100vw";
    wrapper.style.maxHeight = "100vh";
    wrapper.style.margin = "0";
    wrapper.style.padding = "0";
    wrapper.style.display = "flex";
    wrapper.style.flexDirection = resizeAspect === "wide" ? "row" : "column";
    wrapper.style.alignItems = "center";
    wrapper.style.justifyContent =
      resizeAspect === "wide" ? "center" : "flex-end";

    const canv = document.querySelector("canvas");
    if (resizeAspect === "wide") {
      if (width / height >= 440 / 200) {
        /* 
          page is wider aspect ratio than canvas or equal to
          ergo, we can make canvas height equal to page height
        */
        canv.style.height = "100vh";
        canv.style.width = String((height / 100) * (height * 2.2)) + "px";
      } else {
        /*
          page is wide aspect ratio but still narrower aspect 
          ratio than canvas. 
          ergo, make canvas stretch to full page width
        */
        canv.style.height = String((200 / 440) * width) + "px";
        canv.style.width = "100vw";
      }
    } else {
      canv.style.width = "100vw";
      canv.style.height = canv.style.width;
    }
    // end onresize
  };
};
