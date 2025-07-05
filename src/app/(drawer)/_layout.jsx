// import Feather from "@expo/vector-icons/Feather";
// import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
// import Ionicons from "@expo/vector-icons/Ionicons";
// import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
// import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
// import { router, usePathname } from "expo-router";
// import { Drawer } from "expo-router/drawer";
// import { Text } from "react-native";
// import tw from "twrnc";

// const CustomDrawerContant = (props) => {
//   const path = usePathname();

//   return (
//     <DrawerContentScrollView {...props}>
//       <Text style={tw`text-3xl font-semibold`}>Navigation</Text>

//       <DrawerItem
//         icon={(color, size) => (
//           <Feather
//             name="home"
//             size={18}
//             color={path === "/" ? "#fff" : "#000"}
//           />
//         )}
//         label={"Home"}
//         labelStyle={{ color: path === "/" ? "#fff" : "#000" }}
//         style={{ backgroundColor: path === "/" ? "#C3570E" : "#fff" }}
//         onPress={() => {
//           router.push("/(tab)");
//         }}
//       />

//       <DrawerItem
//         icon={(color, size) => (
//           <MaterialCommunityIcons
//             name="post"
//             size={18}
//             color={path === "/Post" ? "#fff" : "#000"}
//           />
//         )}
//         labelStyle={{ color: path === "/Post" ? "#fff" : "#000" }}
//         style={{ backgroundColor: path === "/Post" ? "#C3570E" : "#fff" }}
//         label={"Post"}
//         onPress={() => {
//           router.push("/Post");
//         }}
//       />
//       <DrawerItem
//         icon={(color, size) => (
//           <Ionicons
//             name="bookmarks-outline"
//             size={18}
//             color={path === "/Bookmarks" ? "#fff" : "#000"}
//           />
//         )}
//         label={"Bookmarks"}
//         labelStyle={{ color: path === "/Bookmarks" ? "#fff" : "#000" }}
//         style={{ backgroundColor: path === "/Bookmarks" ? "#C3570E" : "#fff" }}
//         onPress={() => {
//           router.push("/Bookmarks");
//         }}
//       />
//       <DrawerItem
//         icon={(color, size) => (
//           <FontAwesome5
//             name="user"
//             size={18}
//             color={path === "/Profile" ? "#fff" : "#000"}
//           />
//         )}
//         labelStyle={{ color: path === "/Profile" ? "#fff" : "#000" }}
//         style={{ backgroundColor: path === "/Profile" ? "#C3570E" : "#fff" }}
//         label={"Profile"}
//         onPress={() => {
//           router.push("/Profile");
//         }}
//       />

//       <Text style={tw`text-3xl font-semibold`}>Account</Text>
//       <DrawerItem
//         label={"Change password"}
//         onPress={() => {
//           router.push("/ChangePassword");
//         }}
//       />
//       <DrawerItem
//         label={"Privacy policy"}
//         onPress={() => {
//           router.push("/PrivacyPolicy");
//         }}
//       />
//       <DrawerItem
//         label={"Terms & Conditions"}
//         onPress={() => {
//           router.push("/TermsAndConditions");
//         }}
//       />
//       <DrawerItem
//         label={"Our Mission"}
//         onPress={() => {
//           router.push("/Mission");
//         }}
//       />
//       <DrawerItem
//         label={"FAQ"}
//         onPress={() => {
//           router.push("/Faq");
//         }}
//       />
//     </DrawerContentScrollView>
//   );
// };

// export default function Layout() {
//   return (
//     <Drawer
//       screenOptions={{
//         headerShown: false,
//       }}
//       drawerContent={(props) => CustomDrawerContant({ ...props })}
//     />
//   );
// }

import tw from "@/src/lib/tailwind";
import { Drawer } from "expo-router/drawer";
import CustomDrawerContent from "../../components/ui/CustomDrawerContent";

export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: "#FF6B00",
        drawerLabelStyle: tw`text-base -ml-2 bg-black`, // Using tailwind directly
        drawerActiveBackgroundColor: "#000000",
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    ></Drawer>
  );
}
