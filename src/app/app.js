import logoGlitch from "./logo-glitch.png";
import * as PIXI from "pixi.js";

export const run = () => {
  // The application will create a renderer using WebGL, if possible,
  // with a fallback to a canvas render. It will also setup the ticker
  // and the root stage PIXI.Container
  const app = new PIXI.Application();

  // The application will create a canvas element for you that you
  // can then insert into the DOM
  document.body.appendChild(app.view);

  // load the texture we need
  app.loader.add("logoGlitch", logoGlitch).load((loader, resources) => {
    // This creates a texture from a 'logoGlitch.png' image
    const logoGlitch = new PIXI.Sprite(resources.logoGlitch.texture);

    // Setup the position of the logoGlitch
    logoGlitch.x = app.renderer.width / 2;
    logoGlitch.y = app.renderer.height / 2;

    // Rotate around the center
    logoGlitch.anchor.x = 0.5;
    logoGlitch.anchor.y = 0.5;

    // Add the logoGlitch to the scene we are building
    app.stage.addChild(logoGlitch);

    // Listen for frame updates
    app.ticker.add(() => {
      // each frame we spin the logoGlitch around a bit
      logoGlitch.rotation += 0.01;
    });
  });
};
