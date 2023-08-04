import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Radio from "../components/Radio";

const meta: Meta<typeof Radio> = {
  title: "Input/Radio",
  component: Radio,
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

type Story = StoryObj<typeof Radio>;

export const Selected: Story = {
  args: {
    children: "Test",
  },
};
