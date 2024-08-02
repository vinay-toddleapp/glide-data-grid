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
import html2canvas from "html2canvas";

interface ICustomCell extends CustomCell {
  kind: GridCellKind.Custom;
  data: IFigmaDesignCellData | string;
}

const HtmlToCanvasCustomCell = () => {
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
      const { cell, ctx, rect, col, row, imageLoader } = args;
      const { x, y, width, height } = rect;

      let prefixText = undefined,
        title = "",
        subTitle = undefined,
        suffixText = undefined;

      if (typeof cell.data === "number") {
        if (col === 4) {
          title = cell.data + " %";
        } else {
          title = cell.data;
        }
      } else {
        prefixText = cell?.data?.prefixText;
        suffixText = cell?.data?.suffixText;
        title = cell?.data?.title || "";
        subTitle = cell?.data?.subTitle;
      }

      const comp = document.createElement("div");
      comp.style.width = width + "px";
      comp.style.height = height + "px";
      comp.className = "flex items-center justify-between";
      // absolute top-[10000px] right-[10000px]

      const innerComp = `
    <div class="flex items-center gap-2" style={{width}}>
      ${
        prefixText
          ? `<div class="w-6 h-6 rounded-full flex items-center justify-center bg-red-500">
              ${prefixText}
            </div>`
          : ""
      }
      <div>
        <h4>${title}</h4>
        <p>${subTitle}</p>
      </div>
    </div>
    ${
      suffixText
        ? `<div class="h-5 w-5 rounded-sm bg-red-500">${suffixText}</div>`
        : ""
    }
  `;

      comp.innerHTML = innerComp;
      document.body.appendChild(comp);
      const canvas = await html2canvas(comp, { scale: 1 });
      const imgDataUrl = canvas.toDataURL("image/png");
      const img = document.createElement("img");
      img.src = imgDataUrl;
      document.body.appendChild(img);
      document.body.appendChild(comp);
      document.body.appendChild(canvas);

      const myImage = imageLoader.loadOrGetImage(imgDataUrl, col, row);
      if (myImage !== undefined) {
        ctx.drawImage(myImage, x, y, width, height);
      }

      if (comp.parentNode) {
        // comp.parentNode.removeChild(comp);
      }

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

export default HtmlToCanvasCustomCell;
