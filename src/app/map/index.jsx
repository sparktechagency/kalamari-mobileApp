import { EvilIcons, MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { router } from "expo-router";
import React, { Suspense, useState } from "react";

import {
  ActivityIndicator,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import tw from "../../lib/tailwind";

const MapView = React.lazy(() => import("../../components/ui/MapView"));

export default function MapPge() {
  const [searchText, setSearchText] = useState("");
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isShowMap, setisShowMap] = React.useState(false);

  // Default coordinates (Dhaka, Bangladesh)
  // const defaultLat = 23.7916557;
  // const defaultLng = 90.6535914;

  // Get coordinates from selected location or use defaults
  const lat = selectedLocation?.geometry?.location?.lat;
  const lng = selectedLocation?.geometry?.location?.lng;

  const handleSearchLocation = async (query) => {
    setSearchText(query);

    if (!query.trim()) {
      setLocationSuggestions([]);
      return;
    }

    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=AIzaSyARXa6r8AXKRaoeWqyesQNBI8Y3EUEWSnY`
      );
      setLocationSuggestions(response?.data?.results || []);
    } catch (error) {
      // console.log("Error fetching locations:", error);
    }
  };

  // Keyboard.addListener("keyboardDidShow",(e)=>{
  //   console.log(e, "open")
  //   setisShowMap(true)
  // })
  // Keyboard.addListener("keyboardDidHide",(e)=>{
  //   console.log(e,"close")
  //   setisShowMap(false)
  // })

  return (
    <View style={tw` flex-1 p-[4%] bg-primaryBg `}>
      {/* Back Button */}
      <View style={tw`flex-row items-center gap-2 my-4`}>
        <TouchableOpacity
          onPress={() => {
            router?.back();
          }}
        >
          <MaterialIcons name="arrow-back-ios" size={24} color="black" />
        </TouchableOpacity>
        <Text style={tw`text-4.2 text-[#121212] font-bold`}>
          Discover restaurants
        </Text>
      </View>

      <View style={tw`flex-1 flex-col gap-3`}>
        <View style={tw`absolute z-50 w-full`}>
          {/* Search Section */}

          <View
            style={tw` bg-[#e7e7e7] w-full p-3 rounded-t-md flex-row items-center  `}
          >
            <EvilIcons name="search" size={24} color="#454545" />
            <TextInput
              placeholder="Search by location"
              placeholderTextColor={"#454545"}
              onChangeText={handleSearchLocation}
              value={searchText}
              style={tw`flex-1`}
            />
          </View>

          {/* Suggestion List */}
          {locationSuggestions.length > 0 && (
            <View
              style={[
                tw`bg-white border border-gray-200 `,
                {
                  height: "43.4%",
                },
              ]}
            >
              <FlatList
                data={locationSuggestions}
                keyExtractor={(item) => item.place_id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedLocation(item);
                      setSearchText(item.name);
                      setLocationSuggestions([]);
                    }}
                    style={tw`p-2`}
                  >
                    <Text style={tw`font-bold text-black`}>{item.name}</Text>
                    <Text style={tw`text-gray-600`}>
                      {item.formatted_address}
                    </Text>
                  </TouchableOpacity>
                )}
                keyboardShouldPersistTaps="handled"
              />
            </View>
          )}
        </View>

        {/* Map View */}
        <Suspense
          style={tw`flex-1`}
          fallback={
            <View>
              <ActivityIndicator size={"large"} color={"Red"} />
            </View>
          }
        >
          <MapView latitude={lat} longitude={lng} />
        </Suspense>
      </View>
    </View>
  );
}
