import { HeaderIcon, SpriteMap, Theme } from "@glideapps/glide-data-grid";

export const IconMap = {
  comment: (colors: { fgColor: string; bgColor: string }) => {
    const { fgColor, bgColor } = colors;
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M123.6 391.3c12.9-9.4 29.6-11.8 44.6-6.4c26.5 9.6 56.2 15.1 87.8 15.1c124.7 0 208-80.5 208-160s-83.3-160-208-160S48 160.5 48 240c0 32 12.4 62.8 35.7 89.2c8.6 9.7 12.8 22.5 11.8 35.5c-1.4 18.1-5.7 34.7-11.3 49.4c17-7.9 31.1-16.7 39.4-22.7zM21.2 431.9c1.8-2.7 3.5-5.4 5.1-8.1c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208s-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6c-15.1 6.6-32.3 12.6-50.1 16.1c-.8 .2-1.6 .3-2.4 .5c-4.4 .8-8.7 1.5-13.2 1.9c-.2 0-.5 .1-.7 .1c-5.1 .5-10.2 .8-15.3 .8c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4c4.1-4.2 7.8-8.7 11.3-13.5c1.7-2.3 3.3-4.6 4.8-6.9l.3-.5z"/></svg>
    `;
  },
  prefix: () => {
    return `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="32" height="32" rx="16" fill="#FFE0E6"/>
<path d="M9.64108 11.504H12.9531C13.2731 11.504 13.5891 11.544 13.9011 11.624C14.2131 11.696 14.4891 11.82 14.7291 11.996C14.9771 12.164 15.1771 12.384 15.3291 12.656C15.4811 12.928 15.5571 13.256 15.5571 13.64C15.5571 14.12 15.4211 14.516 15.1491 14.828C14.8771 15.14 14.5211 15.364 14.0811 15.5V15.524C14.6171 15.596 15.0571 15.804 15.4011 16.148C15.7451 16.492 15.9171 16.952 15.9171 17.528C15.9171 17.992 15.8251 18.384 15.6411 18.704C15.4571 19.016 15.2131 19.268 14.9091 19.46C14.6131 19.652 14.2691 19.792 13.8771 19.88C13.4931 19.96 13.1011 20 12.7011 20H9.64108V11.504ZM11.1531 14.96H12.4971C13.0011 14.96 13.3851 14.86 13.6491 14.66C13.9131 14.46 14.0451 14.176 14.0451 13.808C14.0451 13.424 13.9091 13.152 13.6371 12.992C13.3651 12.832 12.9411 12.752 12.3651 12.752H11.1531V14.96ZM11.1531 18.728H12.5091C12.7011 18.728 12.9091 18.716 13.1331 18.692C13.3571 18.66 13.5611 18.6 13.7451 18.512C13.9371 18.424 14.0931 18.296 14.2131 18.128C14.3411 17.96 14.4051 17.736 14.4051 17.456C14.4051 17.008 14.2531 16.696 13.9491 16.52C13.6451 16.344 13.1851 16.256 12.5691 16.256H11.1531V18.728ZM19.1266 12.824H16.5226V11.504H23.2426V12.824H20.6386V20H19.1266V12.824Z" fill="#B04464"/>
</svg>`;
  },
};

function getColors(
  variant: "normal" | "selected" | "special",
  theme: Theme
): readonly [string, string] {
  if (variant === "normal") {
    return [theme.bgIconHeader, theme.fgIconHeader];
  } else if (variant === "selected") {
    return ["white", theme.accentColor];
  } else {
    return [theme.accentColor, theme.bgHeader];
  }
}

export class SpriteManager {
  private spriteMap: Map<string, HTMLCanvasElement> = new Map();
  private headerIcons: SpriteMap;
  private inFlight = 0;

  constructor(
    headerIcons: SpriteMap | undefined,
    private onSettled: () => void
  ) {
    this.headerIcons = headerIcons ?? IconMap; // Use IconMap by default
  }

  public drawSprite(
    sprite: HeaderIcon | string,
    variant: "normal" | "selected" | "special",
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number,
    theme: Theme,
    alpha: number = 1
  ) {
    const [bgColor, fgColor] = getColors(variant, theme);
    const rSize = size * Math.ceil(window.devicePixelRatio);
    const key = `${bgColor}_${fgColor}_${rSize}_${sprite}`;

    let spriteCanvas = this.spriteMap.get(key);
    if (spriteCanvas === undefined) {
      const spriteCb = this.headerIcons[sprite];

      if (spriteCb === undefined) return;

      spriteCanvas = document.createElement("canvas");
      const spriteCtx = spriteCanvas.getContext("2d");

      if (spriteCtx === null) return;

      const imgSource = new Image();
      imgSource.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
        spriteCb({ fgColor, bgColor })
      )}`;
      this.spriteMap.set(key, spriteCanvas);
      const promise: Promise<void> | undefined = imgSource.decode();

      if (promise === undefined) return;

      this.inFlight++;
      promise
        .then(() => {
          spriteCtx.drawImage(imgSource, 0, 0, rSize, rSize);
        })
        .finally(() => {
          this.inFlight--;
          if (this.inFlight === 0) {
            this.onSettled();
          }
        });
    } else {
      if (alpha < 1) {
        ctx.globalAlpha = alpha;
      }
      ctx.drawImage(spriteCanvas, 0, 0, rSize, rSize, x, y, size, size);
      if (alpha < 1) {
        ctx.globalAlpha = 1;
      }
    }
  }
}
