import React from "react";
import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Radio from "../Radio";

test("renders the radio component", () => {
  render(<Radio id="test-radio">Test radio</Radio>);
  expect(screen.getByTestId("test-radio")).toBeDefined();
  expect(screen.getAllByText("Test radio")).toBeDefined();
  expect(screen.getByRole("radio")).not.toBeChecked();
});

test("renders the checked status", () => {
  render(
    <Radio id="test-radio" isSelected>
      Test radio
    </Radio>
  );
  expect(screen.getByTestId("test-radio")).toBeDefined();
  expect(screen.getAllByText("Test radio")).toBeDefined();
  expect(screen.getByRole("radio")).toBeChecked();
});
