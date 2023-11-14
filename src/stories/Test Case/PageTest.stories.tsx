import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import PageTest from "./PageTest";

import { expect } from "@storybook/jest";

export default {
  title: 'Test/Interaction Test Pages',
  component: PageTest,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof PageTest>;

const Template: ComponentStory<typeof PageTest> = (args) => <PageTest {...args} />;

export const MainFlow = Template.bind({});
MainFlow.play = async({canvasElement}) => {
  const canvas = within(canvasElement);

  const buttonAction = await canvas.getByTestId('btn-next');

  // if(!canvas.getByText("Finally")){
  //   await userEvent.click(buttonAction)
  // }else{
  //   // await expect(canvas.getByTestId("header")).toBeInTheDocument();
  //   // await expect(canvas.getByText("This")).toBeInTheDocument()
  //   await expect(canvas.getByText((_, element) => element.textContent === 'This is 1 pages')).toBeInTheDocument()
  // }
  
  await expect(
    canvas.getByText(
      'This is 1 pages'
    )
  ).toBeInTheDocument();
  await userEvent.click(buttonAction)
  await expect(
    canvas.getByText(
      'Hi the second pages'
    )
  ).toBeInTheDocument();
  await userEvent.click(buttonAction)
  await expect(
    canvas.getByText(
      'Almost done! 3rd pages here'
    )
  ).toBeInTheDocument();
  await userEvent.click(buttonAction)
  await expect(
    canvas.getByText(
      'Finally done'
    )
  ).toBeInTheDocument();
}