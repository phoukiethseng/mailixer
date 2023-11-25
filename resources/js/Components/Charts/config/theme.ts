import { type ThemeWithoutInheritance } from "@nivo/core";
// @ts-ignore
import { defaultTheme } from "@nivo/core";

// https://nivo.rocks/guides/theming/
const theme: ThemeWithoutInheritance = {
    ...defaultTheme,
    text: {
        fontSize: 12,
    }
};

export default theme;

