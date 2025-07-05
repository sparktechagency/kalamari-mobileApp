import { IconLogOut } from "@/assets/Icon";
import { router } from "expo-router";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import tw from "../../lib/tailwind";
import { storage } from "../../utils/storage";

const Logout = () => {
  const handleLogout = () => {
    Alert.alert("Confirm Logout", "Are you sure you want to log out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Log out",
        style: "destructive",
        onPress: async () => {
          await storage.delete("token");
          router.replace("/auth"); // আপনি যেই স্ক্রীনে নিতে চান logout এর পরে
        },
      },
    ]);
  };

  return (
    <View>
      <TouchableOpacity
        onPress={handleLogout}
        style={tw`flex-row items-center gap-2`}
      >
        <SvgXml xml={IconLogOut} />
        <Text style={tw`text-[#E53E3E] font-medium`}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Logout;
