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
import mySvg from "../../assets/prefix.svg";

interface ICustomCell extends CustomCell {
  kind: GridCellKind.Custom;
  data: IFigmaDesignCellData | string;
}

const CustomCellWithSvg = () => {
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

      if (col === 0) {
        return {
          kind: GridCellKind.Custom,
          allowOverlay: col !== 0 ? true : false,
          readonly: col !== 0 ? false : true,
          data: data,
          copyData: data,
        } as CustomCell;
      } else {
        return {
          kind: GridCellKind.Number,
          allowOverlay: col !== 0 ? true : false,
          readonly: col !== 0 ? false : true,
          data: Number(col === 3 ? total : col === 4 ? percentage : data),
          displayData: String(
            col === 3 ? total : col === 4 ? percentage : data
          ),
        };
      }
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
    draw: async (args: DrawArgs<ICustomCell>) => {
      const { ctx, rect, spriteManager, theme } = args;
      const { x, y, width, height } = rect;

      // const {
      //   prefixText,
      //   subTitle,
      //   suffixText,
      //   title = "",
      // } = cell.data as IFigmaDesignCellData;

      // Define the SVG content as a string
      const svgContent = `
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="16" fill="#FFE0E6" />
      <path d="M9.64108 11.504H12.9531C13.2731 11.504 13.5891 11.544 13.9011 11.624C14.2131 11.696 14.4891 11.82 14.7291 11.996C14.9771 12.164 15.1771 12.384 15.3291 12.656C15.4811 12.928 15.5571 13.256 15.5571 13.64C15.5571 14.12 15.4211 14.516 15.1491 14.828C14.8771 15.14 14.5211 15.364 14.0811 15.5V15.524C14.6171 15.596 15.0571 15.804 15.4011 16.148C15.7451 16.492 15.9171 16.952 15.9171 17.528C15.9171 17.992 15.8251 18.384 15.6411 18.704C15.4571 19.016 15.2131 19.268 14.9091 19.46C14.6131 19.652 14.2691 19.792 13.8771 19.88C13.4931 19.96 13.1011 20 12.7011 20H9.64108V11.504ZM11.1531 14.96H12.4971C13.0011 14.96 13.3851 14.86 13.6491 14.66C13.9131 14.46 14.0451 14.176 14.0451 13.808C14.0451 13.424 13.9091 13.152 13.6371 12.992C13.3651 12.832 12.9411 12.752 12.3651 12.752H11.1531V14.96ZM11.1531 18.728H12.5091C12.7011 18.728 12.9091 18.716 13.1331 18.692C13.3571 18.66 13.5611 18.6 13.7451 18.512C13.9371 18.424 14.0931 18.296 14.2131 18.128C14.3411 17.96 14.4051 17.736 14.4051 17.456C14.4051 17.008 14.2531 16.696 13.9491 16.52C13.6451 16.344 13.1851 16.256 12.5691 16.256H11.1531V18.728ZM19.1266 12.824H16.5226V11.504H23.2426V12.824H20.6386V20H19.1266V12.824Z" fill="#B04464" />
    </svg>
  `;

      const blob = new Blob([svgContent], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);

      const img = new Image();
      img.onload = () => {
        const imgSize = 70;
        const offsetX = x + width / 2 + imgSize;
        const offsetY = y + height / 2 + imgSize;

        ctx.drawImage(img, offsetX, offsetY, imgSize, imgSize);
        URL.revokeObjectURL(url);
      };

      img.src = url;

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

export default CustomCellWithSvg;
