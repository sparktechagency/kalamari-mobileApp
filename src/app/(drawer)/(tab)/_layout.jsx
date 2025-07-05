import {
  IconActive,
  IconHome,
  IconListActive,
  IconListinActive,
  IconPostActive,
  IconPostinActive,
  IconProfileActive,
  IconProfileinActive,
} from "@/assets/Icon";
import { Tabs } from "expo-router";
import { Platform, View } from "react-native";
import { SvgXml } from "react-native-svg";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#ED6237",
        tabBarInactiveTintColor: "#454545",
        tabBarStyle: {
          height: 70,
          paddingBottom: Platform.OS === "ios" ? 25 : 10,
          paddingTop: 10,
          borderTopWidth: 0,
          // position: "absolute", // for floating effect
          alignItems: "center",
          justifyContent: "center",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <View style={{ marginTop: 4 }}>
              <SvgXml
                xml={focused ? IconActive : IconHome}
                width={28}
                height={28}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="Post"
        options={{
          title: "Post",
          tabBarIcon: ({ focused }) => (
            <View style={{ marginTop: 4 }}>
              <SvgXml
                xml={focused ? IconPostinActive : IconPostActive}
                width={28}
                height={28}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="Bookmarks"
        options={{
          title: "Lists",
          tabBarIcon: ({ focused }) => (
            <View style={{ marginTop: 4 }}>
              <SvgXml
                xml={focused ? IconListActive : IconListinActive}
                width={28}
                height={28}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <View style={{ marginTop: 4 }}>
              <SvgXml
                xml={focused ? IconProfileActive : IconProfileinActive}
                width={28}
                height={28}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
