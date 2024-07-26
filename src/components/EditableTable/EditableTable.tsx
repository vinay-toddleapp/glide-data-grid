import { useCallback, useState } from "react";
import { columns, data } from "../../helper/data";
import {
  DataEditor,
  EditableGridCell,
  GridCell,
  GridCellKind,
  Item,
} from "@glideapps/glide-data-grid";
import { IDataRow } from "../../helper/interface";

const EditableTable = () => {
  const [tableData, setTableData] = useState(data);

  const getCellContent = useCallback(
    (cell: Item): GridCell => {
      const [col, row] = cell;
      const dataRow = tableData[row];
      const indexes: (keyof IDataRow)[] = ["name", "company", "email", "phone"];
      const d = dataRow[indexes[col]];
      return {
        kind: GridCellKind.Text,
        allowOverlay: true,
        readonly: false,
        displayData: d,
        data: d,
      };
    },
    [tableData]
  );

  const onCellEdited = useCallback((cell: Item, newValue: EditableGridCell) => {
    if (newValue.kind !== GridCellKind.Text) return;

    const indexes: (keyof IDataRow)[] = ["name", "company", "email", "phone"];
    const [col, row] = cell;
    const key = indexes[col];
    const newData = [...tableData];
    newData[row][key] = newValue.data;
    setTableData([...newData]);
  }, []);

  return (
    <DataEditor
      getCellContent={getCellContent}
      onCellEdited={onCellEdited}
      columns={columns}
      rows={tableData.length}
    />
  );
};

export default EditableTable;
