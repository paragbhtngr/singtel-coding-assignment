import React from "react";
import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Table, { SelectionType } from "../Table";

test("render base table component", () => {
  render(
    <Table
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
  );

  const table = screen.getAllByRole("table")[0];
  const headers = table.querySelectorAll("th");

  expect(headers.length).toBe(3);
  expect(headers[0].querySelectorAll("span")[0].innerHTML).toBe("Operator");
  expect(headers[1].querySelectorAll("span")[0].innerHTML).toBe(
    "Headset Display"
  );
  expect(headers[2].querySelectorAll("span")[0].innerHTML).toBe(
    "3G Availability"
  );
});

test("sortable table component", async () => {
  render(
    <Table
      sortable
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
          headsetDisplay: "DiGi 1800 / DiGi / MYMY18",
          "3gAvailability": "Yes",
        },
      ]}
    />
  );

  const table = screen.getAllByRole("table")[0];
  const headers = table.querySelectorAll("th");

  expect(headers.length).toBe(3);
  expect(headers[0].querySelectorAll("span")[1].innerHTML).toContain(
    "arrow-both.svg"
  );
  expect(headers[1].querySelectorAll("span")[1].innerHTML).toContain(
    "arrow-both.svg"
  );
  expect(headers[2].querySelectorAll("span").length).toBe(1);

  let data = table.querySelectorAll("tr > td");
  expect(data[0].innerHTML).toBe("*Celcom Axiata (LTE)");
  expect(data[1].innerHTML).toBe("CELCOM / My Celcom / 502 19");
  expect(data[2].innerHTML).toBe("Yes");

  expect(data[3].innerHTML).toBe("*DiGi Telecom (LTE)");
  expect(data[4].innerHTML).toBe("DiGi 1800 / DiGi / MYMY18");
  expect(data[5].innerHTML).toBe("Yes");

  fireEvent.click(headers[0].querySelectorAll("span > button")[0]);

  await waitFor(() => {
    expect(headers[0].querySelectorAll("span")[1].innerHTML).toContain(
      "arrow-down.svg"
    );
  });

  data = table.querySelectorAll("tr > td");
  expect(data[0].innerHTML).toBe("*Celcom Axiata (LTE)");
  expect(data[1].innerHTML).toBe("CELCOM / My Celcom / 502 19");
  expect(data[2].innerHTML).toBe("Yes");

  expect(data[3].innerHTML).toBe("*DiGi Telecom (LTE)");
  expect(data[4].innerHTML).toBe("DiGi 1800 / DiGi / MYMY18");
  expect(data[5].innerHTML).toBe("Yes");

  fireEvent.click(headers[0].querySelectorAll("span > button")[0]);

  await waitFor(() => {
    expect(headers[0].querySelectorAll("span")[1].innerHTML).toContain(
      "arrow-up.svg"
    );
  });

  data = table.querySelectorAll("tr > td");
  expect(data[0].innerHTML).toBe("*DiGi Telecom (LTE)");
  expect(data[1].innerHTML).toBe("DiGi 1800 / DiGi / MYMY18");
  expect(data[2].innerHTML).toBe("Yes");

  expect(data[3].innerHTML).toBe("*Celcom Axiata (LTE)");
  expect(data[4].innerHTML).toBe("CELCOM / My Celcom / 502 19");
  expect(data[5].innerHTML).toBe("Yes");
});

test("selectable radio table component", async () => {
  render(
    <Table
      sortable
      selectable
      selectionType={SelectionType.Radio}
      headers={[
        {
          name: "operator",
          title: "Operator",
        },
        {
          name: "headsetDisplay",
          title: "Headset Display",
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
          headsetDisplay: "DiGi 1800 / DiGi / MYMY18",
          "3gAvailability": "Yes",
        },
      ]}
    />
  );

  const table = screen.getAllByRole("table")[0];
  const headers = table.querySelectorAll("th");

  expect(headers.length).toBe(4);

  let data = table.querySelectorAll("tr > td");
  expect(data.length).toBe(8);
  expect(data[0].innerHTML).toContain("radio");
  expect(data[4].innerHTML).toContain("radio");

  fireEvent.click(data[0].querySelectorAll("div.radio ")[0]);

  await waitFor(() => {
    expect(data[0].querySelectorAll("div.radio input")[0]).toBeChecked();
  });

  expect(table.querySelectorAll("tbody > tr")[0].className).toContain(
    "selected"
  );
  expect(table.querySelectorAll("tbody > tr")[1].className).not.toContain(
    "selected"
  );

  fireEvent.click(data[4].querySelectorAll("div.radio ")[0]);

  await waitFor(() => {
    expect(data[4].querySelectorAll("div.radio input")[0]).toBeChecked();
  });

  expect(table.querySelectorAll("tbody > tr")[0].className).not.toContain(
    "selected"
  );
  expect(table.querySelectorAll("tbody > tr")[1].className).toContain(
    "selected"
  );
});

test("selectable checkbox table component", async () => {
  render(
    <Table
      sortable
      selectable
      selectionType={SelectionType.Checkbox}
      headers={[
        {
          name: "operator",
          title: "Operator",
        },
        {
          name: "headsetDisplay",
          title: "Headset Display",
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
          headsetDisplay: "DiGi 1800 / DiGi / MYMY18",
          "3gAvailability": "Yes",
        },
      ]}
    />
  );

  const table = screen.getAllByRole("table")[0];
  const headers = table.querySelectorAll("th");

  expect(headers.length).toBe(4);

  let data = table.querySelectorAll("tr > td");
  expect(data.length).toBe(8);
  expect(data[0].innerHTML).toContain("checkbox");
  expect(data[4].innerHTML).toContain("checkbox");

  fireEvent.click(data[0].querySelectorAll("div.checkbox")[0]);

  await waitFor(() => {
    expect(data[0].querySelectorAll("div.checkbox input")[0]).toBeChecked();
  });

  expect(table.querySelectorAll("tbody > tr")[0].className).toContain(
    "selected"
  );
  expect(table.querySelectorAll("tbody > tr")[1].className).not.toContain(
    "selected"
  );

  fireEvent.click(data[4].querySelectorAll("div.checkbox")[0]);

  await waitFor(() => {
    expect(data[4].querySelectorAll("div.checkbox input")[0]).toBeChecked();
  });

  expect(table.querySelectorAll("tbody > tr")[0].className).toContain(
    "selected"
  );
  expect(table.querySelectorAll("tbody > tr")[1].className).toContain(
    "selected"
  );

  fireEvent.click(data[0].querySelectorAll("div.checkbox")[0]);

  await waitFor(() => {
    expect(data[0].querySelectorAll("div.checkbox input")[0]).not.toBeChecked();
  });

  expect(table.querySelectorAll("tbody > tr")[0].className).not.toContain(
    "selected"
  );
  expect(table.querySelectorAll("tbody > tr")[1].className).toContain(
    "selected"
  );
});
