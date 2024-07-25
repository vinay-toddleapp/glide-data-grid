import { useCallback, useState } from "react";
import { columns, data } from "../../helper/data";
import {
  DataEditor,
  GridCell,
  GridCellKind,
  Item,
} from "@glideapps/glide-data-grid";
import { IDataRow } from "../../helper/interface";

const BasicTable = () => {
  const [tableData] = useState(data);
  const getCellContent = useCallback(
    (cell: Item): GridCell => {
      const [col, row] = cell;
      const dataRow = tableData[row];
      const indexes: (keyof IDataRow)[] = ["name", "company", "email", "phone"];
      const d = dataRow[indexes[col]];
      return {
        kind: GridCellKind.Text,
        allowOverlay: false,
        displayData: d,
        data: d,
      };
    },
    [tableData]
  );

  return (
    <DataEditor
      getCellContent={getCellContent}
      columns={columns}
      rows={tableData.length}
    />
  );
};

export default BasicTable;
