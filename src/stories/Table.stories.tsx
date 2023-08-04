import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Table from "../components/Table";

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

export const Checked: Story = {
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
