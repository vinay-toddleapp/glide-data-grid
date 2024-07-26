import { useCallback, useEffect, useState } from "react";
import { columns, disabledAndEditCellData } from "../../helper/data";
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
import { IDataRow } from "../../helper/interface";

interface ICustomCellProps {
  value: string;
  isDisabled: boolean;
  hasError: boolean;
}

interface ICustomCell extends CustomCell {
  kind: GridCellKind.Custom;
  data: ICustomCellProps;
}

const DisableEditAndErrorState = () => {
  const [tableData, setTableData] = useState(disabledAndEditCellData);

  const renderer: CustomRenderer<ICustomCell> = {
    kind: GridCellKind.Custom,
    provideEditor: () => {
      return ({ value, onChange, onFinishedEditing, isHighlighted }) => {
        const { value: currentValue } = value.data;
        const [inputValue, setInputValue] = useState(currentValue);

        useEffect(() => {
          if (isHighlighted) {
            onChange({ ...value, data: { ...value.data, value: inputValue } });
          }
        }, [isHighlighted, inputValue, onChange]);

        const handleChange = (event: any) => {
          const newValue = event.target.value;
          setInputValue(newValue);
          onChange({ ...value, data: { ...value.data, value: newValue } });
        };

        const handleBlur = () => {
          onFinishedEditing({
            ...value,
            data: { ...value.data, value: inputValue },
          });
        };

        return (
          <input
            className="w-full h-full border-none outline-none"
            value={inputValue}
            onChange={handleChange}
            onBlur={handleBlur}
            autoFocus={isHighlighted}
          />
        );
      };
    },
    isMatch: (cell: GridCell): cell is ICustomCell => {
      return cell.kind === GridCellKind.Custom;
    },
    draw: (args: DrawArgs<ICustomCell>) => {
      const { ctx, cell, theme, rect } = args;
      const { x, y, width, height } = rect;

      ctx.fillStyle = theme.bgCell;
      ctx.fillRect(x, y, width, height);

      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const textX = x + width / 2;
      const textY = y + height / 2;

      const { value, hasError } = cell.data;
      ctx.fillText(value, textX, textY);

      // draw error state if hasError
      if (hasError) {
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.moveTo(x + width, y);
        ctx.lineTo(x + width - 10, y);
        ctx.lineTo(x + width, y + 10);
        ctx.closePath();
        ctx.fill();
      }

      return true;
    },
  };

  const getCellContent = useCallback(
    (cell: Item): GridCell => {
      const [col, row] = cell;
      const dataRow = tableData[row];
      const indexes: (keyof IDataRow)[] = ["name", "company", "email", "phone"];
      const personDetail = dataRow[indexes[col]];
      const { value, isDisabled, hasError } = personDetail;
      if (hasError) {
        return {
          kind: GridCellKind.Custom,
          allowOverlay: isDisabled ? false : true,
          readonly: isDisabled ? true : false,
          data: {
            value,
            isDisabled,
            hasError,
          },
          themeOverride: { bgCell: isDisabled ? "gray" : "white" },
          copyData: value,
        };
      } else {
        return {
          kind: GridCellKind.Text,
          allowOverlay: isDisabled ? false : true,
          readonly: isDisabled ? true : false,
          data: value,
          themeOverride: { bgCell: isDisabled ? "gray" : "white" },
          displayData: value,
        };
      }
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
      customRenderers={[renderer]}
    />
  );
};

export default DisableEditAndErrorState;
