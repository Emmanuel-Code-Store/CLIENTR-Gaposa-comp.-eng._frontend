import type { Meta, StoryObj } from "@storybook/react"
import AddTeacherComment from "./AddTeacherComment"

const meta: Meta<typeof AddTeacherComment> = {
  title: "Components/AddTeacherComment",
  component: AddTeacherComment,
  parameters: {
    layout: "centered",
  },
}

export default meta

type Story = StoryObj<typeof AddTeacherComment>

export const Default: Story = {
  args: {
    open: true,
    onClose: () => {},
    onSave: (comment: string) => {
      console.log("Saving comment:", comment)
    },
  },
}

