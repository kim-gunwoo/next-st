import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import ButtonExamEmotion from "./ButtonExamEmotion";

export default {
  title: "Example/ButtonExamEmotion",
  component: ButtonExamEmotion,
  argTypes: {
    color: { control: "color" },
    number: { control: "number" },
  },
} as ComponentMeta<typeof ButtonExamEmotion>;

const Template: ComponentStory<typeof ButtonExamEmotion> = (args) => (
  <ButtonExamEmotion {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  color: "red",
  number: 0,
};
