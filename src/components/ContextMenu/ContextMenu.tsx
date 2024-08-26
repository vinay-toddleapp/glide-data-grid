import {
  CustomRenderer,
  DataEditor,
  GridCell,
  GridCellKind,
  Item,
} from "@glideapps/glide-data-grid";
import { useCallback, useEffect } from "react";
import { columns, data } from "../../helper/data";
import { IDataRow } from "../../helper/interface";

const ContextMenu = () => {
  const getCellContent = useCallback((cell: Item): GridCell => {
    const [col, row] = cell;
    const dataRow = data[row];
    const indexes: (keyof IDataRow)[] = ["name", "company", "email", "phone"];
    const d = dataRow[indexes[col]];
    return {
      kind: GridCellKind.Custom,
      allowOverlay: false,
      data: d,
      copyData: JSON.stringify(d),
    };
  }, []);

  const renderer: CustomRenderer = {
    kind: GridCellKind.Custom,
    provideEditor: () => {
      return () => {
        return <></>;
      };
    },
    isMatch: (cell: GridCell) => {
      return cell.kind === GridCellKind.Custom;
    },
    draw: () => {
      return true;
    },
    onClick: (args) => {
      if (args.button === 2) {
        // Right-click detected
        console.log("Right-click on cell:", args.cell);
        // Show your custom context menu or handle right-click here
      } else {
        console.log("Left-click on cell:", args.cell);
      }
      return undefined;
    },
  };

  const handleContext = (args: any, data: any) => {
    console.log("handled", args, data);
  };

  useEffect(() => {
    const handleContextMenu = (e: any) => {
      e.preventDefault();
    };
    window.addEventListener("contextmenu", handleContextMenu);
    return () => {
      window.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  return (
    <DataEditor
      columns={columns}
      rows={data.length}
      getCellContent={getCellContent}
      customRenderers={[renderer]}
      onCellContextMenu={handleContext}
    />
  );
};

export default ContextMenu;
