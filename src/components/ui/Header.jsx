import { IconMap, IconMenu, IconNotifi, IconSearch } from "@/assets/Icon";
import { router, useNavigation } from "expo-router";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import tw from "../../lib/tailwind";
import { makeImage } from "../../redux/api/baseApi";
import { useGetProfileQuery } from "../../redux/apiSlices/authApiSlice";
import { useGetAllNotificationQuery } from "../../redux/notificationApi/notificationApi";
import { DEFAULT_AVATAR } from "./CommentItem";

const Header = () => {
  const navigation = useNavigation();
  const [userId, setUserId] = useState([]);
  const [clicked, setClicked] = useState(false);

  const { data, isLoading, refetch } = useGetProfileQuery();
  // console.log("header Data", data);

  const imageUrl = makeImage(data?.data?.avatar);
  // console.log(imageUrl);

  const { data: allNotification, isLoading: loadingNotification } =
    useGetAllNotificationQuery();

  // console.log(id);

  console.log(allNotification?.unread_count);

  const handlePress = () => {
    if (!clicked) {
      // console.log(clicked);

      setClicked(true); // only once
    }

    router.push("/notifications");
  };

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
          onPress={handlePress}
          style={tw`p-2 rounded-full bg-[#3333331A] relative`}
          activeOpacity={0.7}
        >
          <SvgXml xml={IconNotifi} width={20} height={20} />

          {allNotification?.unread_count > 0 && (
            <View
              style={tw`absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-red-600 rounded-full justify-center items-center`}
            >
              <Text style={tw`text-white text-xs font-bold`}>
                {allNotification?.unread_count > 99
                  ? "99+"
                  : allNotification?.unread_count}
              </Text>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/(tab)/Profile")}
          activeOpacity={0.7}
        >
          <Image
            // source={require("@/assets/images/image.png")}
            source={{ uri: imageUrl || DEFAULT_AVATAR }}
            style={tw`w-8 h-8 rounded-full`}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
