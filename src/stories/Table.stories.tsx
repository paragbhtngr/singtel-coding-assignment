import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Table, { SelectionType } from "../components/Table";

const meta: Meta<typeof Table> = {
  title: "Input/Table",
  component: Table,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => {
      return (
        <div
          style={{
            width: 600,
            height: 500,
            border: `1px dashed #9747FF`,
            borderRadius: 4,
            padding: 20,
          }}
        >
          <Story />
        </div>
      );
    },
  ],
};

export default meta;

type Story = StoryObj<typeof Table>;

export const BaseTable: Story = {
  args: {
    headers: [
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
    ],
    data: [
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
    ],
  },
};

export const SortableTable: Story = {
  args: {
    headers: [
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
    ],
    data: [
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
    ],
  },
};

export const RadioSelectTable: Story = {
  args: {
    selectable: true,
    selectionType: SelectionType.Radio,
    headers: [
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
    ],
    data: [
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
    ],
  },
};

export const CheckboxSelectTable: Story = {
  args: {
    selectable: true,
    selectionType: SelectionType.Checkbox,
    headers: [
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
    ],
    data: [
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
    ],
  },
};

export const MobileLayoutTable: Story = {
  args: {
    name: "Contract details",
    useListLayout: true,
    selectable: true,
    selectionType: SelectionType.Radio,
    headers: [
      {
        name: "name",
        title: "Name",
      },
      {
        name: "mobile",
        title: "Mobile",
      },
      {
        name: "expiry",
        title: "Expiry",
      },
      {
        name: "penalty",
        title: "Penalty",
      },
    ],
    data: [
      {
        name: "Mavis Chen",
        mobile: "8899 7654",
        expiry: "Dec 2022",
        penalty: "$600",
      },
      {
        name: "Rodney Artichoke",
        mobile: "9988 7676",
        expiry: "Nov 2022",
        penalty: "$300",
      },
      {
        name: "Valentino Morose",
        mobile: "8900 7654",
        expiry: "Dec 2022",
        penalty: "$600",
      },
      {
        name: "Eric Widget",
        mobile: "9809 7654",
        expiry: "Dec 2022",
        penalty: "$600",
      },
    ],
  },
};
