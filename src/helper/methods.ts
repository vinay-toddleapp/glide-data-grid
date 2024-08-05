import {
  BaseDrawArgs,
  BaseGridCell,
  roundedRect,
} from "@glideapps/glide-data-grid";

export function drawImage(
  args: BaseDrawArgs,
  data: readonly string[],
  rounding: number,
  contentAlign?: BaseGridCell["contentAlign"]
) {
  const { rect, col, row, theme, ctx, imageLoader } = args;
  const { x, y, height: h, width: w } = rect;
  const itemMargin = 4;

  const imgHeight = h - theme.cellVerticalPadding * 2;
  const images: (HTMLImageElement | ImageBitmap)[] = [];
  let totalWidth = 0;
  for (let index = 0; index < data.length; index++) {
    const i = data[index];
    if (i.length === 0) continue;
    const img = imageLoader.loadOrGetImage(i, col, row);

    if (img !== undefined) {
      images[index] = img;
      const imgWidth = img.width * (imgHeight / img.height);
      totalWidth += imgWidth + itemMargin;
    }
  }

  if (totalWidth === 0) return;
  totalWidth -= itemMargin;

  let drawX = x + theme.cellHorizontalPadding;
  if (contentAlign === "right")
    drawX = Math.floor(x + w - theme.cellHorizontalPadding - totalWidth);
  else if (contentAlign === "center")
    drawX = Math.floor(x + w / 2 - totalWidth / 2);

  for (const img of images) {
    if (img === undefined) continue; //array is sparse
    const imgWidth = img.width * (imgHeight / img.height);
    if (rounding > 0) {
      ctx.beginPath();
      roundedRect(
        ctx,
        drawX,
        y + theme.cellVerticalPadding,
        imgWidth,
        imgHeight,
        rounding
      );
      ctx.save();
      ctx.clip();
    }
    ctx.drawImage(
      img,
      drawX,
      y + theme.cellVerticalPadding,
      imgWidth,
      imgHeight
    );
    if (rounding > 0) {
      ctx.restore();
    }

    drawX += imgWidth + itemMargin;
  }
}
