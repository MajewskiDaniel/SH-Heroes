import React from "react";
import { StoryWrapper } from "../src/storybook/StoryWrapper";
import { StaticRouter } from "react-router-dom";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};

export const decorators = [
  (Story) => (
    <StoryWrapper>
      <StaticRouter location="/">
        <Story />
      </StaticRouter>
    </StoryWrapper>
  ),
];
