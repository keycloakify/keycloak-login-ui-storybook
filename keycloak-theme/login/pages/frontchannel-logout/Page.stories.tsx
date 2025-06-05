import type { Meta, StoryObj } from "../../mocks/storybookTypes";
import { createKcPageStory } from "../../mocks/KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "frontchannel-logout.ftl" });

const meta = {
    title: "login/frontchannel-logout.ftl",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithoutRedirectUrl: Story = {
    args: {
        kcContext: {
            logout: {
                clients: []
            }
        }
    }
};
