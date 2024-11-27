import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import TabsLayout from "../_layout";

// Mock dependencies
jest.mock("expo-router", () => ({
  ...jest.requireActual("expo-router"),
  useRouter: () => ({ push: jest.fn() }),
  Tabs: ({ children }) => <>{children}</>,
  Redirect: jest.fn(),
}));

jest.mock("react-native-safe-area-context", () => {
  const ActualSafeAreaContext = jest.requireActual("react-native-safe-area-context");
  return {
    ...ActualSafeAreaContext,
    SafeAreaProvider: ({ children }) => <>{children}</>,
  };
});

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

jest.mock("../../components/LanguageSwitcher", () => "LanguageSwitcher");

// Test Suite
// describe("TabsLayout Component", () => {
//   it("should render the layout with the header, tabs, and off-canvas menu", async () => {
//     const { getByTestId } = render(
//       <SafeAreaProvider>
//         <TabsLayout />
//       </SafeAreaProvider>
//     );

//     // Simulate menu button press
//     const menuButton = getByTestId("menu-button");
//     fireEvent.press(menuButton);

//     // Verify off-canvas menu is visible
//     await waitFor(() => {
//       expect(getByTestId("profile-menu-item")).toBeTruthy();
//     });
//   });
// });
