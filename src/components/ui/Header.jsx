import { IconMap, IconMenu, IconNotifi, IconSearch } from "@/assets/Icon";
import { router, useNavigation } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import tw from "../../lib/tailwind";

const Header = () => {
  const navigation = useNavigation();
  return (
    <View style={tw`flex-row justify-between items-center my-4 bg-[#FDFFFE]`}>
      {/* Left - Hamburger and Logo */}
      <View style={tw`flex-row gap-2 items-center`}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <SvgXml xml={IconMenu} />
        </TouchableOpacity>
        <Text style={tw`text-2xl  font-rubik-700 text-[#141A47]`}>
          Kalamari
        </Text>
      </View>

      {/* Right - Icons and Avatar */}
      <View style={tw`flex-row items-center gap-2`}>
        <TouchableOpacity
          onPress={() => router.push("/userSearch")}
          style={tw`p-2 rounded-full bg-[#3333331A]`}
          activeOpacity={0.7}
        >
          <SvgXml xml={IconSearch} width={20} height={20} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/map")}
          style={tw`p-2 rounded-full bg-[#3333331A]`}
          activeOpacity={0.7}
        >
          <SvgXml xml={IconMap} width={20} height={20} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/notifications")}
          style={tw`p-2 rounded-full bg-[#3333331A]`}
          activeOpacity={0.7}
        >
          <SvgXml xml={IconNotifi} width={20} height={20} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/(tab)/Profile")}
          activeOpacity={0.7}
        >
          <Image
            source={require("@/assets/images/image.png")}
            style={tw`w-8 h-8 rounded-full`}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
