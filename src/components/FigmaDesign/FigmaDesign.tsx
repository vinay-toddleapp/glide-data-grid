import { useCallback, useState } from "react";
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
  data: IFigmaDesignCellData;
}

const FigmaDesign = () => {
  const [tableData] = useState(figmaDesignData);
  const getCellContent = useCallback(
    (cell: Item): GridCell => {
      const [col, row] = cell;
      const dataRow = tableData[row];
      const indexes: ("student" | "score" | "grade")[] = [
        "student",
        "score",
        "grade",
      ];
      const data = dataRow[indexes[col]];
      return {
        kind: GridCellKind.Custom,
        allowOverlay: true,
        readonly: false,
        data: data,
        copyData: data.title,
      } as CustomCell;
    },
    [tableData]
  );

  const renderer: CustomRenderer<ICustomCell> = {
    kind: GridCellKind.Custom,
    provideEditor: () => {
      return ({ value }) => {};
    },
    isMatch: (cell: GridCell): cell is ICustomCell => {
      return cell.kind === GridCellKind.Custom;
    },
    draw: (args: DrawArgs<ICustomCell>) => {
      const { cell, ctx, rect } = args;
      const { x, y, width, height } = rect;
      console.log(height);
      const { prefixText, subTitle, suffixText, title = "" } = cell.data;
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

        // Draw title next to prefix
        ctx.fillStyle = "black";
        ctx.font = "16px Arial";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillText(title, titleX, y + height / 2);

        if (suffixText) {
          // draw rectangular suffix
          const suffixWidth = 21;
          const suffixHeight = 24;
          const suffixX = x + width - suffixWidth - gap;
          const suffixY = y + (height - suffixHeight) / 2;

          ctx.fillStyle = suffixBgColor;
          ctx.fillRect(suffixX, suffixY, suffixWidth, suffixHeight);

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
    if (newValue.kind !== GridCellKind.Text) return;

    // const indexes: (keyof IDataRow)[] = ["name", "company", "email", "phone"];
    // const [col, row] = cell;
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
        columns={figmaDesignColumn}
        rows={tableData.length}
        customRenderers={[renderer]}
      />
    </>
  );
};

export default FigmaDesign;
