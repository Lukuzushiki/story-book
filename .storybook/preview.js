import { initialize, mswLoader } from "msw-storybook-addon";

initialize({
  onUnhandledRequest: "bypass",
});

const preview = {
  parameters: {
    backgrounds: {
      default: "light",
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export const loaders = [mswLoader];

export default preview;
