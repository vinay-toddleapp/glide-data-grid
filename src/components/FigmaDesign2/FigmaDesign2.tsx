import { useCallback, useState } from "react";
import { figmaDesignColumn2, figmaDesignData2 } from "../../helper/data";
import {
  CustomCell,
  CustomRenderer,
  DataEditor,
  DrawArgs,
  GridCell,
  GridCellKind,
  Item,
} from "@glideapps/glide-data-grid";
import { IFigmaDesignData2, IStudentData } from "../../helper/interface";

interface ICustomCell extends CustomCell {
  kind: GridCellKind.Custom;
  data: IStudentData;
}

const FigmaDesign2 = () => {
  const [tableData] = useState(figmaDesignData2);

  const getCellContent = useCallback(
    (cell: Item): GridCell => {
      const [col, row] = cell;
      const dataRow = tableData[row];
      const indexes: (keyof IFigmaDesignData2)[] = [
        "student",
        "english",
        "comment",
      ];
      const key = indexes[col];
      const data = dataRow[key];

      if (col === 0) {
        return {
          kind: GridCellKind.Custom,
          allowOverlay: false,
          readonly: true,
          data: 0,
          copyData: data.toString(),
        };
      } else if (col === 1) {
        return {
          kind: GridCellKind.Number,
          allowOverlay: true,
          readonly: false,
          data: data as number,
          displayData: String(data) || "unknown",
        };
      } else {
        return {
          kind: GridCellKind.Text,
          allowOverlay: true,
          readonly: false,
          data: data as string,
          displayData: String(data),
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
      return true;
    },
  };

  const onCellEdited = useCallback(() => {}, []);

  return (
    <DataEditor
      getCellContent={getCellContent}
      onCellEdited={onCellEdited}
      columns={figmaDesignColumn2}
      rows={tableData.length}
      customRenderers={[renderer]}
    />
  );
};

export default FigmaDesign2;
