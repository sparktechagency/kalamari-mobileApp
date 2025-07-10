// import { IconsSearch } from "@/assets/Icon";
// import { MaterialIcons } from "@expo/vector-icons";
// import { router, useLocalSearchParams } from "expo-router";
// import { useEffect, useState } from "react";
// import { Text, TextInput, TouchableOpacity, View } from "react-native";
// import { SvgXml } from "react-native-svg";
// import { useDebounce } from "use-debounce";
// import tw from "../../lib/tailwind";
// import { useSearchByBookMarkQuery } from "../../redux/listApi/listApi";

// const ListView = () => {
//   const { name } = useLocalSearchParams();

//   // Normalize the name parameter to handle potential whitespace or case differences
//   const normalizedName = typeof name === "string" ? name.trim() : "";

//   const [index, setIndex] = useState();
//   const [searchByIndex, setSearchByIndex] = useState("");
//   const [debouncedSearch] = useDebounce(searchByIndex, 500);

//   useEffect(() => {
//     if (normalizedName === "Restaurants") {
//       setIndex(1);
//     } else if (normalizedName === "Recipes") {
//       setIndex(2);
//     }
//   }, [normalizedName]);

//   const { data, isLoading } = useSearchByBookMarkQuery({
//     type: index,
//     search: debouncedSearch,
//   });

//   console.log("data , ---------- ", data);

//   return (
//     <View style={tw`flex-1 bg-[#FDFFFE]`}>
//       <View style={tw`flex-1 px-[4%]`}>
//         {/* Header with back button */}
//         <View style={tw`flex-row items-center gap-2 my-6`}>
//           <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
//             <MaterialIcons name="arrow-back-ios" size={24} color="black" />
//           </TouchableOpacity>
//           <Text style={tw`text-4.2 text-[#121212] font-bold`}>Back</Text>
//         </View>

//         {/* Search section */}
//         <View style={tw`flex-col gap-4`}>
//           <View style={tw`flex-col gap-3`}>
//             <Text style={tw`text-xl font-inter-700`}>
//               Search By {normalizedName}
//             </Text>
//             <View
//               style={tw`bg-[#F3F3F3] flex-row items-center justify-between px-2 rounded-2 gap-2`}
//             >
//               <SvgXml xml={IconsSearch} />
//               <TextInput
//                 style={tw`py-4 flex-1 text-textPrimary`}
//                 placeholder="Search by Restaurants or Recipes"
//                 placeholderTextColor="#888888"
//                 selectionColor="#888888"
//                 returnKeyType="search"
//                 clearButtonMode="while-editing"
//                 value={searchByIndex}
//                 onChangeText={(text) => setSearchByIndex(text)}
//               />
//             </View>
//           </View>
//         </View>

//         {/* Content section */}
//       </View>
//     </View>
//   );
// };

// export default ListView;
// //

import { IconRestruernt, IconsSearch } from "@/assets/Icon";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";
import { useDebounce } from "use-debounce";
import tw from "../../lib/tailwind";
import { makeImage } from "../../redux/api/baseApi";
import { useSearchByBookMarkQuery } from "../../redux/listApi/listApi";
import { cardViewDate } from "../../utils/cardViewDate";

const ListView = () => {
  const { name } = useLocalSearchParams();

  // Normalize the name parameter
  const normalizedName = typeof name === "string" ? name.trim() : "";

  const [index, setIndex] = useState(0);
  const [searchByIndex, setSearchByIndex] = useState("Lulo");
  const [debouncedSearch] = useDebounce(searchByIndex, 500);

  useEffect(() => {
    if (normalizedName === "Restaurants") {
      setIndex(1);
    } else if (normalizedName === "Recipes") {
      setIndex(2);
    }
  }, [normalizedName]);

  const {
    data: searchData,
    isLoading,
    isError,
  } = useSearchByBookMarkQuery({
    type: 2,
    search: debouncedSearch,
  });

  console.log("index ", index);

  console.log("searchData", searchData);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        router.push(`/notifications/${item.id}`);
      }}
      activeOpacity={0.7}
    >
      <View style={tw`flex-col my-2 justify-between items-center`}>
        <View
          style={tw`flex-row gap-4 bg-[#D5D5D51A] p-2 rounded-2xl items-center`}
        >
          {/* Image with fallback */}
          <Image
            source={{ uri: makeImage(item?.photo[0]) }}
            style={tw`w-18 h-18 rounded-[8px]`}
            resizeMode="cover"
          />

          {/* Content */}
          <View style={tw`flex-1`}>
            {/* Title and Rating */}
            <View style={tw`flex-row justify-between gap-1`}>
              <View style={tw`flex-col gap-1.2 justify-between`}>
                <Text style={tw`text-base font-inter-700 text-textPrimary`}>
                  {item?.meal_name || "Unnamed Item"}
                </Text>
                <View style={tw`flex-row items-center`}>
                  <SvgXml xml={IconRestruernt} />
                  <Text style={tw`text-[#454545] ml-1 font-inter-400 text-sm`}>
                    {item?.location || "Location not specified"}
                  </Text>
                </View>
              </View>

              {/* Rating and Date */}
              <View style={tw`flex-col gap-1.2 mt-1 justify-between`}>
                {item?.rating && (
                  <View style={tw`flex-row items-center`}>
                    <FontAwesome name="star" size={16} color="#facc15" />
                    <Text style={tw`ml-1 text-textPrimary font-inter-600`}>
                      {item?.rating}
                      {/* Format rating to 1 decimal */}
                    </Text>
                  </View>
                )}

                <Text style={tw`text-[#454545] font-inter-400 text-sm`}>
                  {/* Consider adding actual date formatting here */}
                  {/* Open now */}
                  {cardViewDate(item?.created_at)}
                </Text>
              </View>
            </View>

            {/* Tags */}
            <View style={tw`flex-row justify-between items-center mt-2`}>
              <View style={tw`flex-row gap-2`}>
                {item?.food_type && (
                  <Text style={tw`text-[12px] font-inter-600 text-[#454545]`}>
                    {item.food_type}
                  </Text>
                )}
                {item?.have_it && (
                  <Text style={tw`text-[12px] font-inter-600 text-[#454545]`}>
                    {item.have_it}
                  </Text>
                )}
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderEmptyComponent = () => (
    <View style={tw`flex-1 justify-center items-center mt-10`}>
      <Text style={tw`text-lg text-gray-500`}>
        {searchByIndex ? "No results found" : "Search for something..."}
      </Text>
    </View>
  );

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
                placeholder={`Search by ${normalizedName}`}
                placeholderTextColor="#888888"
                selectionColor="#888888"
                returnKeyType="search"
                clearButtonMode="while-editing"
                value={searchByIndex}
                onChangeText={setSearchByIndex}
              />
            </View>
          </View>
        </View>

        {/* Content section */}
        {isLoading ? (
          <View style={tw`flex-1 justify-center items-center`}>
            <ActivityIndicator size="large" color="#F97316" />
          </View>
        ) : isError ? (
          <View style={tw`flex-1 justify-center items-center`}>
            <Text style={tw`text-lg text-red-500`}>
              Error loading data. Please try again.
            </Text>
          </View>
        ) : (
          <FlatList
            data={searchData?.data}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={tw`pb-6`}
            renderItem={renderItem}
            ListEmptyComponent={renderEmptyComponent}
          />
        )}
      </View>
    </View>
  );
};

export default ListView;
