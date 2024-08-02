import { useCallback, useState } from "react";
import { figmaDesignColumn2, figmaDesignData2 } from "../../helper/data";
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
import { IStudentData } from "../../helper/interface";

interface ICustomCell extends CustomCell {
  kind: GridCellKind.Custom;
  data: IStudentData;
}

const FigmaDesign2 = () => {
  const [tableData, setTableData] = useState(figmaDesignData2);

  const getCellContent = useCallback(
    (cell: Item): GridCell => {
      const [col, row] = cell;
      const dataRow = tableData[row];
      const indexes: ("student" | "english" | "comment")[] = [
        "student",
        "english",
        "comment",
      ];

      const data = dataRow[indexes[col]];

      if (col === 0) {
        return {
          kind: GridCellKind.Custom,
          allowOverlay: false,
          readonly: true,
          data: data,
          copyData: data,
        } as CustomCell;
      } else if (col === 1) {
        return {
          kind: GridCellKind.Number,
          allowOverlay: true,
          readonly: false,
          data: data as number,
          displayData: data as string,
        };
      } else {
        return {
          kind: GridCellKind.Text,
          allowOverlay: true,
          readonly: false,
          data: data as string,
          displayData: data as string,
        };
      }
    },
    [tableData]
  );

  const renderer: CustomRenderer<ICustomCell> = {
    kind: GridCellKind.Custom,
    provideEditor: () => ({
      editor: () => {
        return <></>;
      },
      disablePadding: true,
      disableStyling: true,
    }),
    isMatch: (cell: GridCell): cell is ICustomCell => {
      return cell.kind === GridCellKind.Custom;
    },
    draw: (args: DrawArgs<ICustomCell>) => {
      const { cell, ctx, rect } = args;
      const { x, y, width, height } = rect;
      const {
        prefixBgColor = "",
        prefixText = "",
        prefixTextColor = "",
        subTitle = "",
        suffixBgColor = "",
        suffixText = "",
        suffixTextColor = "",
        title,
      } = cell.data;
      console.log(cell.data);
      const gap = 8;
      let titleX = x + gap;
      let titleY = y + height / 2;

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
      // Adjust title position for subtitle
      titleY = y + height / 2 - 8;

      // Draw title
      ctx.fillStyle = "black";
      ctx.font = "16px Arial";
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.fillText(title, titleX, titleY);

      // Draw subtitle
      ctx.fillStyle = "#717171";
      ctx.font = "500 12px Arial";
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.fillText(subTitle, titleX, titleY + 16);

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

  const onCellEdited = useCallback((cell: Item, newValue: EditableGridCell) => {
    // const [col, row] = cell;
    // const indexes: ("student" | "english" | "comment")[] = [
    //   "student",
    //   "english",
    //   "comment",
    // ];
    // const key = indexes[col];
    // const newData = [...tableData];
    // newData[row][key] = newValue.data;
    // setTableData([...newData]);
  }, []);

  return (
    <>
      <DataEditor
        getCellContent={getCellContent}
        onCellEdited={onCellEdited}
        columns={figmaDesignColumn2}
        rows={tableData.length}
        customRenderers={[renderer]}
        rowHeight={() => 44}
      />
    </>
  );
};

export default FigmaDesign2;
