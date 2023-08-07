import React from "react";
import Table, { SelectionType } from "./components/Table";

export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <Table
        useListLayout
        sortable
        selectable
        selectionType={SelectionType.Checkbox}
        headers={[
          {
            name: "operator",
            title: "Operator",
            sortable: true,
          },
          {
            name: "headsetDisplay",
            title: "Headset Display",
            sortable: true,
          },
          {
            name: "3gAvailability",
            title: "3G Availability",
          },
        ]}
        data={[
          {
            operator: "*Celcom Axiata (LTE)",
            headsetDisplay: "CELCOM / My Celcom / 502 19",
            "3gAvailability": "Yes",
          },
          {
            operator: "*DiGi Telecom (LTE)",
            headsetDisplay: "DiGi 1800 / DiGi /  MYMY18",
            "3gAvailability": "Yes",
          },
        ]}
      />
      <p>End test</p>
    </div>
  );
}
