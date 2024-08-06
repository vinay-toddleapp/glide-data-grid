import { useCallback, useMemo, useState } from "react";
import { gradeOneColumn, gradeOneData } from "../../helper/data";
import {
  CustomCell,
  CustomRenderer,
  DataEditor,
  DrawArgs,
  GridCell,
  GridCellKind,
  GridColumn,
  Item,
} from "@glideapps/glide-data-grid";
import { IGradeOneData, IStudentData } from "../../helper/interface";
import { IconMap, SpriteManager } from "../../helper/Sprite/SpriteManager";

interface ICustomCell extends CustomCell {
  kind: GridCellKind.Custom;
  data: IStudentData;
}

const GradeOne = () => {
  const [tableData] = useState(gradeOneData);
  const [cols, setCols] = useState(gradeOneColumn);

  const spriteManager = useMemo(() => new SpriteManager(IconMap, () => {}), []);

  const getCellContent = useCallback(
    (cell: Item): GridCell => {
      const [col, row] = cell;
      const dataRow = tableData[row];
      const indexes: (keyof IGradeOneData)[] = [
        "student",
        "term1TotalScore",
        "term1TotalGrade",
        "classwork1Marks",
        "classwork1Comment",
        "classwork2Marks",
        "classwork2Comment",
        "homework1Marks",
        "homework1Comment",
        "homework2Marks",
        "homework2Comment",
        "classTest1Marks",
        "classTest1Comment",
        "classTest2Marks",
        "classTest2Comment",
      ];
      const key = indexes[col];
      const data = dataRow[key];

      if (col === 1) {
        return {
          kind: GridCellKind.Text,
          allowOverlay: true,
          readonly: false,
          data: data as string,
          displayData: String(data),
        };
      } else if (
        col === 2 ||
        col === 3 ||
        col === 5 ||
        col === 7 ||
        col === 9 ||
        col === 11 ||
        col === 13
      ) {
        return {
          kind: GridCellKind.Number,
          allowOverlay: true,
          readonly: false,
          data: data as number,
          displayData: String(data) || "unknown",
          contentAlign: "center",
        };
      } else {
        return {
          kind: GridCellKind.Custom,
          allowOverlay: false,
          readonly: true,
          data: data,
          copyData: data.toString(),
        };
      }
    },
    [tableData]
  );

  const renderer: CustomRenderer<ICustomCell> = {
    kind: GridCellKind.Custom,
    provideEditor: () => {
      return () => {
        return <></>;
      };
    },
    isMatch: (cell: GridCell): cell is ICustomCell => {
      return cell.kind === GridCellKind.Custom;
    },
    draw: (args: DrawArgs<ICustomCell>) => {
      const { cell, ctx, rect, theme, col } = args;
      const { x, y, width, height } = rect;
      const {
        prefixBgColor,
        prefixText,
        prefixTextColor,
        subTitle,
        suffixBgColor,
        suffixText,
        suffixTextColor,
        title,
      } = cell.data;

      // draw comment using spirit manager
      if (
        col === 4 ||
        col === 6 ||
        col === 8 ||
        col === 10 ||
        col === 12 ||
        col === 14
      ) {
        spriteManager.drawSprite(
          "comment",
          "normal",
          ctx,
          x + width / 2 - 10,
          y + height / 2 - 10,
          20,
          theme
        );
        return;
      }

      const paddingX = 8;
      const gap = 8;
      const centerY = y + height / 2;

      // Draw circular prefix
      const prefixRadius = 16;
      const prefixCenterX = x + paddingX + prefixRadius;
      const prefixCenterY = centerY;

      ctx.beginPath();
      ctx.arc(prefixCenterX, prefixCenterY, prefixRadius, 0, Math.PI * 2);
      ctx.fillStyle = prefixBgColor;
      ctx.fill();
      ctx.closePath();

      ctx.fillStyle = prefixTextColor;
      ctx.font = "600 12px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(prefixText, prefixCenterX, prefixCenterY);

      const titleX = prefixCenterX + prefixRadius + gap;

      // Measure title and subtitle heights
      ctx.font = "16px Arial";
      const titleMetrics = ctx.measureText(title);
      const titleHeight =
        titleMetrics.actualBoundingBoxAscent +
        titleMetrics.actualBoundingBoxDescent;

      ctx.font = "500 12px Arial";
      const subTitleMetrics = ctx.measureText(subTitle);
      const subTitleHeight =
        subTitleMetrics.actualBoundingBoxAscent +
        subTitleMetrics.actualBoundingBoxDescent;

      const totalTextHeight = titleHeight + subTitleHeight + gap;
      const textStartY = centerY - totalTextHeight / 2;

      // Draw title
      ctx.fillStyle = "black";
      ctx.font = "500 14px Arial";
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillText(title, titleX, textStartY);

      // Draw subtitle
      ctx.fillStyle = "#717171";
      ctx.font = "500 12px Arial";
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillText(subTitle, titleX, textStartY + titleHeight + gap);

      // Draw rectangular suffix with border radius
      const suffixWidth = 21;
      const suffixHeight = 24;
      const suffixX = x + width - paddingX - suffixWidth;
      const suffixY = centerY - suffixHeight / 2;
      const borderRadius = 3;

      ctx.beginPath();
      ctx.moveTo(suffixX + borderRadius, suffixY);
      ctx.lineTo(suffixX + suffixWidth - borderRadius, suffixY);
      ctx.quadraticCurveTo(
        suffixX + suffixWidth,
        suffixY,
        suffixX + suffixWidth,
        suffixY + borderRadius
      );
      ctx.lineTo(suffixX + suffixWidth, suffixY + suffixHeight - borderRadius);
      ctx.quadraticCurveTo(
        suffixX + suffixWidth,
        suffixY + suffixHeight,
        suffixX + suffixWidth - borderRadius,
        suffixY + suffixHeight
      );
      ctx.lineTo(suffixX + borderRadius, suffixY + suffixHeight);
      ctx.quadraticCurveTo(
        suffixX,
        suffixY + suffixHeight,
        suffixX,
        suffixY + suffixHeight - borderRadius
      );
      ctx.lineTo(suffixX, suffixY + borderRadius);
      ctx.quadraticCurveTo(suffixX, suffixY, suffixX + borderRadius, suffixY);
      ctx.closePath();

      ctx.fillStyle = suffixBgColor;
      ctx.fill();

      ctx.fillStyle = suffixTextColor;
      ctx.font = "500 12px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(
        suffixText,
        suffixX + suffixWidth / 2,
        suffixY + suffixHeight / 2
      );

      return true;
    },
  };

  const onCellEdited = useCallback(() => {}, []);

  const onColumnResize = useCallback(
    (col: GridColumn, newSize: number) => {
      const id = col.id;
      const newColsData = [...cols];
      for (const col of newColsData) {
        if (col.id === id) {
          col.width = newSize;
          break;
        }
      }
      setCols([...newColsData]);
    },
    [cols]
  );

  return (
    <DataEditor
      getCellContent={getCellContent}
      onCellEdited={onCellEdited}
      columns={cols}
      rows={tableData.length}
      customRenderers={[renderer]}
      rowHeight={44}
      onColumnResize={onColumnResize}
    />
  );
};

export default GradeOne;
