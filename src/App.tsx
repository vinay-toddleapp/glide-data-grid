import { useState } from "react";
import BasicTable from "./components/BasicTable/BasicTable";

const App = () => {
  const demos = {
    basicTable: {
      name: "Basic Table",
      value: "basicTable",
      component: <BasicTable />,
    },
  };
  const allDemo = Object.values(demos);
  const [currentValue, setCurrentValue] = useState<string>(allDemo[0].value);
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
