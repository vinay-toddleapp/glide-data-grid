import { useCallback, useState } from "react";
import { columns, disabledAndEditCellData } from "../../helper/data";
import {
  DataEditor,
  EditableGridCell,
  GridCell,
  GridCellKind,
  Item,
} from "@glideapps/glide-data-grid";
import { IDataRow } from "../../helper/interface";

const DisableAnEditCellCoExist = () => {
  const [tableData, setTableData] = useState(disabledAndEditCellData);

  const getCellContent = useCallback(
    (cell: Item): GridCell => {
      const [col, row] = cell;
      const dataRow = tableData[row];
      const indexes: (keyof IDataRow)[] = ["name", "company", "email", "phone"];
      const personDetail = dataRow[indexes[col]];
      const { value, isDisabled } = personDetail;
      return {
        kind: GridCellKind.Text,
        allowOverlay: isDisabled ? false : true,
        readonly: isDisabled ? true : false,
        displayData: value,
        data: value,
        themeOverride: { bgCell: isDisabled ? "gray" : "white" },
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
    newData[row][key].value = newValue.data;
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

export default DisableAnEditCellCoExist;
