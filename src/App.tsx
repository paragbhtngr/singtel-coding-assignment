import React from "react";
import "./assets/styles/globals.css";

export default function App() {
  return (
    <div className="App">
      <h1>Singtel - Frontend Developer Coding Assignment</h1>
      <h2>Table Component</h2>
      <p>
        Component library based on the{" "}
        <a href="https://www.figma.com/file/LRl3kQFCXnmViiKHkfdBwo/Table-Component-1?node-id=0%3A1&t=MvGVuuJaC9LrBNzR-0">
          Figma Design
        </a>{" "}
        provided here. Built using ReactJS, TypeScript, and Storybook for
        component documentation and playground
      </p>
      <h2>Features</h2>
      <ul>
        <li>Components for Checkbox, Radio and Table Components</li>
        <li>
          Responsive designs and ability to change layout based on
          mobile/desktop view (View storybook for examples)
        </li>
        <li>Sorting, radio select and multi-select features</li>
        <li>Customisable theming for headers, rows and selectors</li>
      </ul>
      <h2>To view Storybook playground</h2>
      <ul>
        <li>
          Run <code>yarn</code> to install packages, if installing locally. Skip
          if viewing CodeSandbox
        </li>
        <li>
          Run <code>yarn storybook</code> and go to <code>localhost:6006</code>
        </li>
      </ul>
    </div>
  );
}
