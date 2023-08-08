import React from "react";
import { screen, render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Checkbox from "../Checkbox";

test("renders the checkbox component", () => {
  render(<Checkbox id="test-checkbox">Test checkbox</Checkbox>);
  expect(screen.getByTestId("test-checkbox")).toBeDefined();
  expect(screen.getAllByText("Test checkbox")).toBeDefined();
  expect(screen.getByRole("checkbox")).not.toBeChecked();
});

test("renders the checked status", () => {
  render(
    <Checkbox id="test-checkbox" isSelected>
      Test checkbox
    </Checkbox>
  );
  expect(screen.getByTestId("test-checkbox")).toBeDefined();
  expect(screen.getAllByText("Test checkbox")).toBeDefined();
  expect(screen.getByRole("checkbox")).toBeChecked();
});
