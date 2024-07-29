import { useCallback, useEffect, useState } from "react";
import { customTableColumns, customTableData } from "../../helper/data";
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
import { ICustomTableData } from "../../helper/interface";

interface ICustomCellProps {
  kind: string;
  value: boolean | string;
}

interface ICustomCell extends CustomCell {
  kind: GridCellKind.Custom;
  data: ICustomCellProps;
}

const CustomCellExample = () => {
  const [tableData, setTableData] = useState(customTableData);

  const renderer: CustomRenderer<ICustomCell> = {
    kind: GridCellKind.Custom,
    provideEditor: () => {
      return ({ value, isHighlighted }) => {
        const { value: cellValue, kind } = value.data;
        if (kind === "checkbox") {
          return (
            <input
              type="checkbox"
              className="w-full h-full border-none outline-none"
              autoFocus={isHighlighted}
            />
          );
        } else if (kind === "select-dropdown") {
          return (
            <select
              name="assignedTo"
              id="assignedTo"
              value={cellValue as string}
            >
              <option value="Abhirup Bardhan">Abhirup Bardhan</option>
              <option value="Soumendu Prasad Sinha">
                Soumendu Prasad Sinha
              </option>
              <option value="Vinay Pratap Singh">Vinay Pratap Singh</option>
              <option value="Satish Kumar Narava">Satish Kumar Narava</option>
            </select>
          );
        }
      };
    },
    isMatch: (cell: GridCell): cell is ICustomCell => {
      return cell.kind === GridCellKind.Custom;
    },
    draw: (args: DrawArgs<ICustomCell>) => {
      return true;
    },
  };

  const getCellContent = useCallback(
    (cell: Item): GridCell => {
      const [col, row] = cell;
      const dataRow = tableData[row];
      const indexes: (keyof ICustomTableData)[] = [
        "sNo",
        "taskName",
        "isCompleted",
        "assignedTo",
      ];
      const key = indexes[col];
      const data = dataRow[key];

      if (key === "sNo") {
        return {
          kind: GridCellKind.Number,
          allowOverlay: true,
          readonly: false,
          data: data as number,
          displayData: data.toString(),
        };
      } else if (key === "taskName") {
        return {
          kind: GridCellKind.Text,
          allowOverlay: true,
          readonly: false,
          data: data as string,
          displayData: data as string,
        };
      } else if (key === "isCompleted") {
        return {
          kind: GridCellKind.Custom,
          allowOverlay: true,
          readonly: false,
          data: {
            kind: "checkbox",
            value: data as boolean,
          },
        } as CustomCell<any>;
      } else if (key === "assignedTo") {
        return {
          kind: GridCellKind.Custom,
          allowOverlay: true,
          readonly: false,
          data: {
            kind: "select-dropdown",
            value: data as string,
          },
        } as CustomCell<any>;
      } else {
        return {
          kind: GridCellKind.Text,
          allowOverlay: false,
          readonly: true,
          data: "Unknown",
          displayData: "Unknown",
        };
      }
    },
    [tableData]
  );

  const onCellEdited = useCallback((cell: Item, newValue: EditableGridCell) => {
    console.log(newValue, cell);
    if (newValue.kind !== GridCellKind.Text) return;

    // const indexes: (keyof ICustomTableData)[] = [
    //   "sNo",
    //   "taskName",
    //   "isCompleted",
    //   "assignedTo",
    // ];
    // const [col, row] = cell;
    // const key = indexes[col];
    // const newData = [...tableData];
    // // newData[row][key] = newValue.data;
    // setTableData([...newData]);
  }, []);

  return (
    <DataEditor
      getCellContent={getCellContent}
      onCellEdited={onCellEdited}
      columns={customTableColumns}
      rows={tableData.length}
      customRenderers={[renderer]}
      // cellActivationBehavior="single-click"
    />
  );
};

export default CustomCellExample;
