import type { Meta, StoryObj } from "@storybook/react";
import ScoreSheetDialog, { ScoreSheetData } from "./ScoreSheetDialog";

const meta: Meta<typeof ScoreSheetDialog> = {
  title: "Components/ScoreSheetDialog",
  component: ScoreSheetDialog,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof ScoreSheetDialog>;

export const Default: Story = {
  args: {
    open: true,
    onClose: () => {
      console.log("Dialog closed");
    },
    onCheck: (data: ScoreSheetData) => {
      console.log("Checking data:", data);
    },
  },
};
