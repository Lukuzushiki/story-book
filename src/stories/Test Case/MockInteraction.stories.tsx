import { ComponentMeta, Story } from "@storybook/react";

import { rest } from "msw";
import MockInteraction from "./MockInteraction";
import { userEvent, waitFor, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

export default {
  title: "Test/Mock Interaction Pages",
  component: MockInteraction,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof MockInteraction>;

export const MainFlow: Story = {
  args: {},
  parameters: {
    msw: {
      handlers: [
        rest.get("/api/test/", (req, res, ctx) => {
          return res(
            ctx.json({
              results: [
                {
                  id: 0,
                  text: "(Mockup) First Data",
                },
                {
                  id: 1,
                  text: "(Mockup) Second Data",
                },
                {
                  id: 3,
                  text: "(Mockup) Third Data",
                },
                {
                  id: 4,
                  text: "(Mockup) Fourth Data",
                },
              ],
            })
          );
        }),
      ],
    },
  },
};
MainFlow.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await expect(canvas.getByTestId("loading-section")).toBeInTheDocument();
  await waitFor(() => {
    expect(canvas.getByTestId("loading-section")).toBeInTheDocument();
  });
  await waitFor(async () => {
    const buttonAction = canvas.getByTestId("btn-next");

    await expect(canvas.getByTestId("text-alert-0")).toBeInTheDocument();
    await userEvent.click(buttonAction);
    await expect(canvas.getByTestId("text-alert-1")).toBeInTheDocument();
    await userEvent.click(buttonAction);
    await expect(canvas.getByTestId("text-alert-2")).toBeInTheDocument();
  });
};

export const ErrorFlow: Story = {
  args: {},
  parameters: {
    msw: {
      handlers: [
        rest.get("/api/test/", (req, res, ctx) => {
          return res(ctx.status(500));
        }),
      ],
    },
  },
};
