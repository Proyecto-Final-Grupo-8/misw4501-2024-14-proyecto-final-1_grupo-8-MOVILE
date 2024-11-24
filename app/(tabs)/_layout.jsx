import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Animated,
  PanResponder,
  Dimensions,
} from "react-native";
import { Tabs, Redirect } from "expo-router";
import icons from "../../constants/icons";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../../components/LanguageSwitcher";

const TabIcon = ({ icon, color, name, focused }) => (
  <View style={styles.tabView}>
    <Image
      source={icon}
      resizeMode="contain"
      tintColor={color}
      style={[styles.tabImage, { tintColor: color }]}
    />
    {/* <Text>{name}</Text> */}
  </View>
);

const TabsLayout = () => {
  const { t } = useTranslation();
  const [isOffCanvasVisible, setOffCanvasVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-300)).current;

  const toggleOffCanvas = () => {
    if (isOffCanvasVisible) {
      closeOffCanvas();
    } else {
      openOffCanvas();
    }
  };

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (_, gestureState) => {
      // Detect horizontal drag when off-canvas is open
      return isOffCanvasVisible && Math.abs(gestureState.dx) > 20;
    },
    onPanResponderMove: (_, gestureState) => {
      // If swiping to the left, allow dragging
      if (gestureState.dx < 0) {
        slideAnim.setValue(gestureState.dx);
      }
    },
    onPanResponderRelease: (_, gestureState) => {
      // If swipe exceeds a threshold, close the off-canvas
      if (gestureState.dx < -100) {
        closeOffCanvas();
      } else {
        // Reset to original position if swipe was not strong enough
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start();
      }
    },
  });

  const navigateToPage = (route) => {
    closeOffCanvas();
    router.push(route);
  };

  const openOffCanvas = () => {
    setOffCanvasVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeOffCanvas = () => {
    Animated.timing(slideAnim, {
      toValue: -300,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setOffCanvasVisible(false));
  };

  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          {/* Header Section */}
          <View style={styles.viewHeader}>
            <TouchableOpacity onPress={toggleOffCanvas}>
              <Image source={icons.vertical_lines} style={styles.menuIcon} />
            </TouchableOpacity>
            <Image source={icons.abclogo_name} style={styles.logo} />
          </View>

          {/* Off-Canvas Menu */}
          {isOffCanvasVisible && (
            <Animated.View
              {...panResponder.panHandlers}
              style={[
                styles.offCanvas,
                { transform: [{ translateX: slideAnim }] },
              ]}
            >
              <View style={styles.offCanvasContent}>
                <View>
                  <Text
                    testID="profile-menu-item"
                    style={styles.menuItem}
                    onPress={() => navigateToPage("/profile")}
                  >
                    {t("My Profile")}
                  </Text>
                  <Text
                    testID="profile-issues-item"
                    style={styles.menuItem}
                    onPress={() => navigateToPage("/issues")}
                  >
                    {t("My Issues")}
                  </Text>
                  <Text
                    testID="profile-chat-item"
                    style={styles.menuItem}
                    onPress={() => navigateToPage("/chat")}
                  >
                    {t("My Chat")}
                  </Text>
                  <LanguageSwitcher />
                </View>
                <View>
                  <TouchableOpacity
                    testID="menu-button"
                    accessibilityLabel="Menu Button"
                    onPress={toggleOffCanvas}
                  >
                    <Image
                      source={icons.vertical_lines}
                      style={styles.menuIcon}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </Animated.View>
          )}

          {/* Tabs Navigation */}
          <Tabs
            screenOptions={{
              tabBarShowLabel: false,
            }}
          >
            <Tabs.Screen
              name="home"
              options={{
                title: t("Home"),
                headerShown: false,
                tabBarIcon: ({ color, focused }) => (
                  <TabIcon
                    icon={icons.home}
                    color={color}
                    name="home"
                    focused={focused}
                  />
                ),
              }}
            />
            <Tabs.Screen
              name="profile"
              options={{
                title: t("Profile"),
                headerShown: false,
                tabBarIcon: ({ color, focused }) => (
                  <TabIcon
                    icon={icons.user}
                    color={color}
                    name="profile"
                    focused={focused}
                  />
                ),
              }}
            />
            <Tabs.Screen
              name="chat"
              options={{
                title: t("Chat"),
                headerShown: false,
                tabBarIcon: ({ color, focused }) => (
                  <TabIcon
                    icon={icons.comments}
                    color={color}
                    name="chat"
                    focused={focused}
                  />
                ),
              }}
            />
            <Tabs.Screen
              name="issues"
              options={{
                title: t("Issues"),
                headerShown: false,
                tabBarIcon: ({ color, focused }) => (
                  <TabIcon
                    icon={icons.newspaper}
                    color={color}
                    name="issues"
                    focused={focused}
                  />
                ),
              }}
            />
            <Tabs.Screen
              name="incident/[id]"
              options={{
                headerShown: false,
                href: null,
              }}
            />
          </Tabs>
        </View>
      </SafeAreaView>
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default TabsLayout;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#161622" },
  container: { flex: 1 },
  viewHeader: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    backgroundColor: "white",
    zIndex: 10,
    height: 90,
    paddingBottom: 10,
  },
  menuIcon: {
    width: 22,
    height: 22,
    resizeMode: "contain",
  },
  logo: {
    width: 150,
    height: 30,
    resizeMode: "contain",
  },
  offCanvas: {
    position: "absolute",
    left: 0,
    top: 0,
    width: 250,
    height: "100%",
    backgroundColor: "#c8d6e5",
    zIndex: 999,
    paddingTop: 40,
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  offCanvasContent: {
    flex: 1,
    justifyContent: "space-between",
    height: 100,
    paddingBottom: 15,
  },
  menuItem: { padding: 10, color: "#333", fontSize: 18 },
  exitButton: {
    position: "absolute",
    bottom: 0,
    left: 20,
    right: 20,
    fontSize: 18,
    color: "#2e3a59",
    fontWeight: "bold",
    textAlign: "center",
  },
  tabView: { alignItems: "center", justifyContent: "center" },
  tabImage: { width: 24, height: 24 },
});
