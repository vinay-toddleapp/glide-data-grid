import React, { useCallback, useState } from "react";
import { figmaDesignColumn, figmaDesignData } from "../../helper/data";
import {
  CustomCell,
  CustomRenderer,
  DataEditor,
  DrawArgs,
  EditableGridCell,
  GridCell,
  GridCellKind,
  Item,
} from "@glideapps/glide-data-grid";
import { IFigmaDesignCellData } from "../../helper/interface";

interface ICustomCell extends CustomCell {
  kind: GridCellKind.Custom;
  data: IFigmaDesignCellData | string;
}

const FigmaDesign = () => {
  const [tableData, setTableData] = useState(figmaDesignData);

  const getCellContent = useCallback(
    (cell: Item): GridCell => {
      const [col, row] = cell;
      const dataRow = tableData[row];
      const indexes: (
        | "student"
        | "english"
        | "maths"
        | "total"
        | "percentage"
      )[] = ["student", "english", "maths", "total", "percentage"];

      const data = dataRow[indexes[col]];
      let total = 0;
      const { english = 0, maths = 0 } = dataRow;
      if (col === 3) {
        total = total + english + maths;
      }
      let percentage = 0;
      if (col === 4) {
        percentage = (english + maths) * 5;
      }

      return {
        kind: GridCellKind.Custom,
        allowOverlay: col !== 0 ? true : false,
        readonly: col !== 0 ? false : true,
        data: col === 3 ? total : col === 4 ? percentage : data,
        copyData: col === 3 ? total : col === 4 ? percentage : data,
      } as CustomCell;
    },
    [tableData]
  );

  const renderer: CustomRenderer<ICustomCell> = {
    kind: GridCellKind.Custom,
    provideEditor: () => ({
      editor: (args) => {
        const { target, value, onChange } = args;
        const { width, height } = target;
        const [input, setInput] = useState(value.data as string);
        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          const { value } = event.target;
          setInput(value);
          onChange({
            kind: GridCellKind.Custom,
            data: value,
            copyData: value,
            allowOverlay: true,
            readonly: false,
          });
        };
        return (
          <div
            style={{ height, width }}
            className="flex items-center justify-center"
          >
            <input
              type="text"
              value={input}
              className="outline-none border-none m-2 h-5 text-center"
              onChange={handleChange}
            />
          </div>
        );
      },
      disablePadding: true,
      disableStyling: true,
    }),
    isMatch: (cell: GridCell): cell is ICustomCell => {
      return cell.kind === GridCellKind.Custom;
    },
    draw: (args: DrawArgs<ICustomCell>) => {
      const { cell, ctx, rect, col } = args;
      const { x, y, width, height } = rect;
      let prefixText = undefined,
        title = "",
        subTitle = undefined,
        suffixText = undefined;
      if (typeof cell.data === "number") {
        if (col === 4) {
          title = cell.data + " %";
        } else {
          title = cell.data;
        }
      } else {
        prefixText = cell?.data?.prefixText;
        suffixText = cell?.data?.suffixText;
        title = cell?.data?.title || "";
        subTitle = cell?.data?.subTitle;
      }
      const prefixBgColor = "#E3E3FC";
      const prefixTextColor = "#5050C5";
      const suffixBgColor = "#EBFFFA";
      const suffixTextColor = "#1C725D";

      // Center title if no prefix and suffix
      if (!prefixText && !suffixText) {
        ctx.fillStyle = "#222222";
        ctx.font = "500 14px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(title, x + width / 2, y + height / 2);
      } else {
        const gap = 8;
        let titleX = x + gap;
        let titleY = y + height / 2;

        if (prefixText) {
          // draw circular prefix
          const prefixRadius = 16;
          const prefixCenterX = x + prefixRadius + gap;
          const prefixCenterY = y + height / 2;

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

          titleX = prefixCenterX + prefixRadius + gap;
        }

        // Adjust title position if subtitle exists
        if (subTitle) {
          titleY = y + height / 2 - 8;
        }

        // Draw title
        ctx.fillStyle = "black";
        ctx.font = "16px Arial";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillText(title, titleX, titleY);

        // Draw subtitle if it exists
        if (subTitle) {
          ctx.fillStyle = "#717171";
          ctx.font = "500 12px Arial";
          ctx.textAlign = "left";
          ctx.textBaseline = "middle";
          ctx.fillText(subTitle, titleX, titleY + 16);
        }

        if (suffixText) {
          // draw rectangular suffix with border radius
          const suffixWidth = 21;
          const suffixHeight = 24;
          const suffixX = x + width - suffixWidth - gap;
          const suffixY = y + (height - suffixHeight) / 2;
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
          ctx.lineTo(
            suffixX + suffixWidth,
            suffixY + suffixHeight - borderRadius
          );
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
          ctx.quadraticCurveTo(
            suffixX,
            suffixY,
            suffixX + borderRadius,
            suffixY
          );
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
        }
      }

      return true;
    },
  };

  const onCellEdited = useCallback((cell: Item, newValue: EditableGridCell) => {
    const [col, row] = cell;
    const indexes: (
      | "student"
      | "english"
      | "maths"
      | "total"
      | "percentage"
    )[] = ["student", "english", "maths", "total", "percentage"];
    const key = indexes[col];
    const newData = [...tableData];
    newData[row][key] = Number(newValue.data);
    setTableData([...newData]);
  }, []);

  return (
    <>
      <DataEditor
        getCellContent={getCellContent}
        onCellEdited={onCellEdited}
        columns={figmaDesignColumn}
        rows={tableData.length}
        customRenderers={[renderer]}
        rowHeight={() => 44}
      />
    </>
  );
};

export default FigmaDesign;
