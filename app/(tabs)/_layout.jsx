import { StyleSheet, View, Text, Image } from "react-native";
import { Tabs, Redirect } from "expo-router";
import icons from "../../constants/icons";
import { StatusBar } from "expo-status-bar";

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View style={styles.tabView}>
      <Image
        source={icon}
        resizeMode ="contain"
        tintColor={color}
        style={[styles.tabImage, { tintColor: color }]}
      ></Image>
      <Text>{name}</Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
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
          name="configuration"
          options={{
            title: "Configuration",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.settings}
                color={color}
                name="configuration"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="about"
          options={{
            title: "About",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.alignJustify}
                color={color}
                name="about"
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>

      {/* <Loader isLoading={loading} /> */}
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default TabsLayout;

const styles = StyleSheet.create({
  tabImage: {
    weight: 24,
    height: 24,
  },
  tabView: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: 4, 
  },
  fontPsemibold: {
    fontFamily: "YourFontFamily",
    fontWeight: "400",
  },
  fontPregular: {
    fontFamily: "YourFontFamily",
    fontWeight: "400",
  },
});
