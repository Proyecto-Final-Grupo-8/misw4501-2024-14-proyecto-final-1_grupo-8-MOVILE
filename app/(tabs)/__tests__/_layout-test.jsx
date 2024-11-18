import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import TabsLayout from "../_layout";
import { useRouter } from "expo-router";

// Mock expo-router components and functions
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

describe("TabsLayout Component", () => {
  it("should render the layout with the header, tabs, and off-canvas menu", async () => {
    const { getByTestId, debug } = render(
      <SafeAreaProvider>
        <TabsLayout />
      </SafeAreaProvider>
    );

    // Debug to output the rendered tree
    debug();

    // Attempt to open the off-canvas menu
    const menuButton = getByTestId("menu-button");
    fireEvent.press(menuButton);

    // Wait for the profile menu item to appear
    await waitFor(() => {
      expect(getByTestId("profile-menu-item")).toBeTruthy();
    });
  });
});
