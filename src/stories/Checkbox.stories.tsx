import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Checkbox from "../components/Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Input/Checkbox",
  component: Checkbox,
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
            width: 200,
            height: 200,
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

type Story = StoryObj<typeof Checkbox>;

export const Checked: Story = {
  args: {
    children: "Test",
  },
};
