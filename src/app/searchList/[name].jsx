import { IconsSearch } from "@/assets/Icon";
import { MaterialIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import MyList from "../../components/ui/MyList";
import MyRecipesList from "../../components/ui/MyRecipesList";
import tw from "../../lib/tailwind";

const ListView = () => {
  const { name } = useLocalSearchParams();
  // console.log(name);

  // Normalize the name parameter to handle potential whitespace or case differences
  const normalizedName = typeof name === "string" ? name.trim() : "";
  // console.log(normalizedName);

  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    if (normalizedName === "Restaurants") {
      setSearchName(1);
    } else if (normalizedName === "Recipes") {
      setSearchName(2);
    }
  }, [normalizedName]);

  console.log(searchName);

  return (
    <View style={tw`flex-1 bg-[#FDFFFE]`}>
      <View style={tw`flex-1 px-[4%]`}>
        {/* Header with back button */}
        <View style={tw`flex-row items-center gap-2 my-6`}>
          <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
            <MaterialIcons name="arrow-back-ios" size={24} color="black" />
          </TouchableOpacity>
          <Text style={tw`text-4.2 text-[#121212] font-bold`}>Back</Text>
        </View>

        {/* Search section */}
        <View style={tw`flex-col gap-4`}>
          <View style={tw`flex-col gap-3`}>
            <Text style={tw`text-xl font-inter-700`}>
              Search By {normalizedName}
            </Text>
            <View
              style={tw`bg-[#F3F3F3] flex-row items-center justify-between px-2 rounded-2 gap-2`}
            >
              <SvgXml xml={IconsSearch} />
              <TextInput
                style={tw`py-4 flex-1 text-textPrimary`}
                placeholder="Search by Restaurants or Recipes"
                placeholderTextColor="#888888"
                selectionColor="#888888"
                returnKeyType="search"
                clearButtonMode="while-editing"
              />
            </View>
          </View>
        </View>

        {/* Content section */}
        <View style={tw`flex-1 mt-4`}>
          {normalizedName === "Restaurants" && <MyList />}
          {normalizedName === "Recipes" && <MyRecipesList />}
        </View>
      </View>
    </View>
  );
};

export default ListView;
