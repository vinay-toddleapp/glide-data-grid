import { useState } from "react";
import BasicTable from "./components/BasicTable/BasicTable";
import EditableTable from "./components/EditableTable/EditableTable";
import DisableAnEditCellCoExist from "./components/DisableAnEditCellCoExist/DisableAnEditCellCoExist";
import DisableEditAndErrorState from "./components/DisableEditAndErrorState/DisableEditAndErrorState";
import CustomCellExample from "./components/CustomCell/CustomCell";
import GroupHeader from "./components/GroupHeader/GroupHeader";
import HtmlToCanvasCustomCell from "./components/HtmlToCanvasCustomCell/HtmlToCanvasCustomCell";
import FigmaDesign from "./components/FigmaDesign/FigmaDesign";
import CustomCellWithSvg from "./components/CustomCellWithSvg/CustomCellWithSvg";
import FigmaDesign2 from "./components/FigmaDesign2/FigmaDesign2";
import GradeOne from "./components/GradeOne/GradeOne";
import ContextMenu from "./components/ContextMenu/ContextMenu";
import DialogCell from "./components/DialogCell/DialogCell";

const App = () => {
  const demos = {
    basicTable: {
      name: "Basic Table",
      value: "basicTable",
      component: <BasicTable />,
    },
    editableTable: {
      name: "Editable Table",
      value: "editableTable",
      component: <EditableTable />,
    },
    disableAnEditCellCoExist: {
      name: "Disabled and edit cell co-exist",
      value: "disableAnEditCellCoExist",
      component: <DisableAnEditCellCoExist />,
    },
    disableEditAndErrorState: {
      name: "Disabled, edit and error state co-exist",
      value: "disableEditAndErrorState",
      component: <DisableEditAndErrorState />,
    },
    customCell: {
      name: "Cell with different react component",
      value: "customCell",
      component: <CustomCellExample />,
    },
    groupHeader: {
      name: "Group header",
      value: "groupHeader",
      component: <GroupHeader />,
    },
    htmlToCanvasCustomCell: {
      name: "Rendering custom component using `html to canvas` library",
      value: "htmlToCanvasCustomCell",
      component: <HtmlToCanvasCustomCell />,
    },
    figmaDesign: {
      name: "Replica of figma design data grid",
      value: "figmaDesign",
      component: <FigmaDesign />,
    },
    customCellWithSVG: {
      name: "Custom cell using SVG",
      value: "customCellWithSVG",
      component: <CustomCellWithSvg />,
    },
    figmaDesign2: {
      name: "Final clone of figma design",
      value: "figmaDesign2",
      component: <FigmaDesign2 />,
    },
    gradeOne: {
      name: "Grade 1 figma page clone",
      value: "gradeOne",
      component: <GradeOne />,
    },
    contextMenu: {
      name: "Open context menu on right click",
      value: "contextMenu",
      component: <ContextMenu />,
    },
    dialogCell: {
      name: "Open a dialog/modal on cell click",
      value: "dialogCell",
      component: <DialogCell />,
    },
  };
  const allDemo = Object.values(demos);
  const [currentValue, setCurrentValue] = useState<string>(
    allDemo[allDemo.length - 1].value
  );
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentValue(event.target.value);
  };

  return (
    <div className="p-10 space-y-10">
      <div className="w-fit">
        <label
          htmlFor="demos"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Select a Demo
        </label>
        <select
          name="demos"
          id="demos"
          value={currentValue}
          onChange={handleChange}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          {allDemo.map((demo, index) => (
            <option key={index} value={demo.value}>
              {demo.name}
            </option>
          ))}
        </select>
      </div>

      {demos[currentValue as keyof typeof demos].component}
    </div>
  );
};

export default App;
