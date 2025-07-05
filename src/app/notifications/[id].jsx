import {
  IconHeart,
  IconLOcation,
  IconLove,
  IconRestruernt,
  IconStar,
  IconVerify,
} from "@/assets/Icon";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import BookMark from "../../components/ui/BookMark";
import ButtomSheet from "../../components/ui/ButtomSheet";
import ShareButton from "../../components/ui/ShareButton";
import TacoSlider from "../../components/ui/TacoSlider";
import tw from "../../lib/tailwind";
// Example icons as SVG XML
const IconLocation = `<svg fill="#9ca3af" viewBox="0 0 24 24" height="14" width="14"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/></svg>`;

const TacoPostCard = () => {
  const [isHeart, setIsHeart] = useState(false);

  return (
    <View style={tw`bg-primaryBg flex-1`}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Top: Profile info */}
        <View style={tw`flex-col gap-1.2 p-[4%] `}>
          <View style={tw`flex-row items-center gap-2 my-4`}>
            <TouchableOpacity
              onPress={() => {
                router?.back();
              }}
            >
              <MaterialIcons name="arrow-back-ios" size={24} color="black" />
            </TouchableOpacity>
            <Text style={tw`text-4.2 text-[#121212] font-bold`}>Back</Text>
          </View>
          <View style={tw`flex-row items-center justify-between mb-3`}>
            <View style={tw`flex-row items-center`}>
              <Image
                source={{
                  uri: "https://i.ibb.co/hFKjJHpC/Ellipse-4-1.png",
                }}
                style={tw`w-10 h-10 rounded-full`}
              />
              <View style={tw`ml-3`}>
                <View style={tw`flex-row items-center gap-1`}>
                  <Text style={tw`text-sm font-bold text-black`}>
                    Emma Johnson
                  </Text>
                  <SvgXml xml={IconVerify} />
                </View>
                <View style={tw`flex-row gap-2 items-center `}>
                  <View style={tw`flex-row gap-1 items-center `}>
                    <SvgXml xml={IconRestruernt} />
                    <Text style={tw` text-3 font-inter-400 text-[#454545] `}>
                      Pizzaburg
                    </Text>
                  </View>
                  <View style={tw`flex-row gap-1 items-center `}>
                    <SvgXml xml={IconLOcation} />
                    <Text style={tw` text-3 font-inter-400 text-[#454545] `}>
                      Portland, Oregon
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View style={tw`flex-col gap-1.2 `}>
            {/* Post Image */}
            <TacoSlider />

            <View style={tw`flex-col gap-1.2 `}>
              {/* Post actions */}
              {/* details view wrapp Like comment  */}
              <View
                style={tw`flex-row gap-4 items-center  justify-between mt-3`}
              >
                {/*  */}
                <View style={tw`flex-row gap-4 justify-center items-center  `}>
                  {/* heart icon */}
                  <View style={tw`flex-row justify-center gap-1 items-center `}>
                    <TouchableOpacity onPress={() => setIsHeart(!isHeart)}>
                      {/* <SvgXml xml={IconLove} /> */}
                      {isHeart ? (
                        <SvgXml xml={IconHeart} />
                      ) : (
                        <SvgXml xml={IconLove} />
                      )}
                    </TouchableOpacity>

                    <Text style={tw` text-3 font-inter-600 text-[#454545] `}>
                      1111
                    </Text>
                  </View>
                  {/* message */}
                  <View style={tw`flex-row gap-1 justify-center items-center `}>
                    <ButtomSheet />
                    <Text style={tw` text-3 font-inter-600 text-[#454545] `}>
                      1,253
                    </Text>
                  </View>
                  {/* share */}
                  <View>
                    <ShareButton />
                  </View>
                </View>

                {/* bookMark */}
                <View>
                  <BookMark />
                </View>
              </View>

              {/* Post Info */}
              <View style={tw`flex-col gap-1.2 `}>
                <View style={tw`flex-row justify-between items-center `}>
                  <Text style={tw`text-lg font-semibold text-black`}>
                    Spicy taco
                  </Text>
                  <View style={tw`flex-row items-center`}>
                    {/* <Text style={tw`text-yellow-500 font-bold`}>★</Text> */}
                    <SvgXml xml={IconStar} />
                    <Text style={tw`ml-1 text-black font-semibold`}>4.0</Text>
                  </View>
                </View>

                {/* Categories + Date */}
                <View style={tw`flex-row justify-between items-center `}>
                  <View style={tw`flex-row gap-2`}>
                    <Text style={tw`text-xs text-gray-500 font-semibold`}>
                      Meal
                    </Text>
                    <Text style={tw`text-xs text-gray-500 font-semibold`}>
                      Restaurant
                    </Text>
                  </View>
                  <Text style={tw`text-xs text-gray-500`}>03/15/2026</Text>
                </View>

                {/* Description */}
                <Text style={tw`mt-1 text-sm text-gray-700 leading-5`}>
                  Indulge in a creamy fettuccine Alfredo, tossed with tender
                  chicken and fresh parsley.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default TacoPostCard;
