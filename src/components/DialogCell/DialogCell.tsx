import React, { useCallback, useEffect, useState } from "react";
import { customTableColumns, customTableData } from "../../helper/data";
import {
  CustomRenderer,
  DataEditor,
  EditableGridCell,
  GridCell,
  GridCellKind,
  Item,
  ProvideEditorComponent,
} from "@glideapps/glide-data-grid";
import { ICustomTableData } from "../../helper/interface";
import Modal from "react-modal";
import { Editor } from "@toast-ui/react-editor";
import CustomModal from "../Modal/CustomModal";

const DialogCell = () => {
  const [tableData] = useState(customTableData);

  const ArticleCellEditor: ProvideEditorComponent<any> = () => {
    const onKeyDown = React.useCallback((e: React.KeyboardEvent) => {
      e.stopPropagation();
    }, []);

    const onSave = React.useCallback(() => {}, []);

    const onClose = React.useCallback(() => {}, []);

    return (
      <div id="gdg-markdown-wysiwyg" onKeyDown={onKeyDown}>
        <Editor
          initialEditType="wysiwyg"
          autofocus={true}
          initialValue={"vinay"}
          hideModeSwitch={true}
          // onChange={setTempValue}
          height="75vh"
          usageStatistics={false}
          toolbarItems={[
            ["heading", "bold", "italic", "strike"],
            ["hr", "quote"],
            ["ul", "ol", "task", "indent", "outdent"],
            ["table", "link"],
            ["code", "codeblock"],
          ]}
        />
        <div className="gdg-footer">
          <button className="gdg-close-button" onClick={onClose}>
            Close
          </button>
          <button className="gdg-save-button" onClick={onSave}>
            Save
          </button>
        </div>
      </div>
    );
  };

  const renderer = {
    kind: GridCellKind.Custom,

    provideEditor: () => ({
      editor: () => {
        const [isOpen, setIsOpen] = useState(true);
        return (
          <React.Suspense fallback={null}>
            <div>
              <button onClick={() => setIsOpen(!isOpen)}>Open Modal</button>
              <CustomModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <h2>Hello</h2>
                <div>I am a custom modal</div>
                <form>
                  <input placeholder="Type here..." />
                  <button>Submit</button>
                </form>
              </CustomModal>
            </div>
          </React.Suspense>
        );
      },
      styleOverride: {
        position: "fixed",
        left: "12.5vw",
        top: "12.5vh",
        width: "75vw",
        borderRadius: "9px",
        maxWidth: "unset",
        maxHeight: "unset",
      },
      disablePadding: true,
    }),

    isMatch: (cell) => {
      return cell.kind === GridCellKind.Custom;
    },

    draw: () => {
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

      return {
        kind: GridCellKind.Custom,
        allowOverlay: true,
        readonly: false,
        data: {
          value: data,
        },
        copyData: JSON.stringify(data),
      };
    },
    [tableData]
  );

  const onCellEdited = useCallback((cell: Item, newValue: EditableGridCell) => {
    console.log(newValue, cell);
    if (newValue.kind !== GridCellKind.Text) return;
  }, []);

  return (
    <DataEditor
      getCellContent={getCellContent}
      onCellEdited={onCellEdited}
      columns={customTableColumns}
      rows={tableData.length}
      customRenderers={[renderer]}
    />
  );
};

export default DialogCell;
