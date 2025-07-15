import { useEffect, useState } from "react";
import { Dimensions, Pressable, Text, View } from "react-native";

// import * as Contacts from "expo-contacts";
import { router } from "expo-router";
import Header from "../../../components/ui/Header";
import UserPost from "../../../components/ui/UserPost";
import tw from "../../../lib/tailwind";
import { storage } from "../../../utils/storage";

const Home = () => {
  const tab = ["Following", "Discovery"];

  useEffect(() => {
    const fetchToken = async () => {
      const token = await storage.getString("token");
      if (!token) {
        router.push("/auth");
      }
    };
    fetchToken();
  }, []);

  // useEffect(() => {
  //   (async () => {
  //     const { status } = await Contacts.requestPermissionsAsync();
  //     if (status === "granted") {
  //       const { data } = await Contacts.getContactsAsync({
  //         fields: [Contacts.Fields.Emails],
  //       });

  //       if (data.length > 0) {
  //         const contact = data[0];
  //         console.log(contact);
  //       }
  //     }
  //   })();
  // }, []);

  const [isActiveTab, setIsActiveTab] = useState("Following");

  const { width } = Dimensions.get("window");

  return (
    // <Text style={tw`flex-1  bg-[#FDFFFE] `}>Loading</Text>
    <View style={tw`flex-1  bg-[#FDFFFE] `}>
      {/* top header */}
      <View style={tw` flex-1 px-[4%] `}>
        <View>
          <Header />
          <View style={tw`pb-4`}>
            <View
              style={tw`flex-row gap-2 w-[70%]   items-center justify-center  bg-[#3333331A] p-2 rounded-full `}
            >
              {tab.map((item, index) => (
                <View key={index} style={tw``}>
                  <Pressable onPress={() => setIsActiveTab(item)}>
                    <Text
                      style={[
                        tw.style(
                          "font-inter-400 px-4 py-1",
                          isActiveTab === item
                            ? "text-white bg-orange rounded-full"
                            : "text-textgray"
                        ),
                        { fontSize: width * 0.04 }, // dynamic font size (e.g. ~15–18px)
                      ]}
                    >
                      {item}
                    </Text>
                  </Pressable>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* view all user post  */}
        <View style={tw` flex-1 `}>
          <UserPost isActiveTab={isActiveTab} />
        </View>
        {/*  j */}
      </View>
    </View>
  );
};

export default Home;
