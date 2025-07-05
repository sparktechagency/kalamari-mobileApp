import { IconRestruernt, IconStar } from "@/assets/Icon";
import { router } from "expo-router";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import foodImage from "../../../assets/images/Recipes.png";
import tw from "../../lib/tailwind";

const DATA = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const RecipesActivityList = () => {
  const handleNavigate = () => {
    // console.log("asdfg");
    router.push(`/notifications/${1}`);
  };
  return (
    <View style={tw``}>
      {/* when the api changes ScrollView and adds flatList  */}
      <FlatList
        data={DATA}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`pb-6`}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={handleNavigate}>
            <View style={tw`flex-col my-2 justify-between items-center`}>
              <View
                style={tw`flex-row bg-[#D5D5D51A] p-2 rounded-2xl items-center`}
              >
                {/* Image */}

                {/* Content */}
                <View style={tw`flex-1`}>
                  <View style={tw`flex-row justify-between items-start`}>
                    {/* Title and Rating */}
                    <View style={tw`flex-row`}>
                      <Image
                        source={foodImage}
                        style={tw`w-18 h-18 rounded-[8px] mr-4`}
                      />
                      <View style={tw`flex-col justify-between`}>
                        <View style={tw`flex-col justify-between`}>
                          <Text
                            style={tw`text-base font-inter-700 text-textPrimary`}
                          >
                            Spaghetti
                          </Text>
                          <View style={tw`flex-row items-center mt-1`}>
                            <SvgXml xml={IconRestruernt} />
                            <Text
                              style={tw`text-[#454545] ml-1 font-inter-400 text-sm`}
                            >
                              78 Tampa, Florida
                            </Text>
                          </View>
                        </View>

                        {/* Tags */}
                        <View style={tw`flex-row `}>
                          <Text
                            style={tw`text-[12px] font-inter-600 text-[#454545] mr-2`}
                          >
                            Meal
                          </Text>
                          <Text
                            style={tw`text-[12px] font-inter-600 text-[#454545]`}
                          >
                            Restaurant
                          </Text>
                        </View>
                      </View>
                    </View>

                    {/* Location and Date */}
                    <View style={tw`flex-col justify-between items-end `}>
                      <View style={tw`flex-row items-center`}>
                        {/* <FontAwesome name="star" size={16} color="#facc15" /> */}
                        <SvgXml xml={IconStar} />
                        <Text style={tw`ml-1 text-textPrimary font-inter-600`}>
                          2.8
                        </Text>
                      </View>
                      <Text
                        style={tw`text-[#454545] font-inter-400 text-sm mt-1`}
                      >
                        May 13th
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default RecipesActivityList;
