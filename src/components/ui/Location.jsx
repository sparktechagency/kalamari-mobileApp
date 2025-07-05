import { IconLOcation } from "@/assets/Icon";
import axios from "axios";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import tw from "../../lib/tailwind";

const Location = ({ setSelectedLocation }) => {
  const [searchText, setSearchText] = useState("");
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  // const [selectedLocation, setSelectedLocation] = useState(null);

  // console.log( 'view new locations ' ,selectedLocation?.name);
  // console.log( 'view new   {"lat": 23.7520933, "lng": 90.4246379} ' ,selectedLocation?.geometry?.location);

  const handleSearchLocation = async (query) => {
    // location data is null
    setSelectedLocation(null);
    // What the user types in the input field is being stored in state.
    setSearchText(query);

    // spaces not a valid data
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
      console.log(error);
    }
  };

  return (
    <View style={tw` flex-1`}>
      {/* Search Section */}
      <View style={tw`flex-1`}>
        <Text style={tw`text-[16px] font-inter-600 text-[#121212 mb-2`}>
          Location
        </Text>
        <View
          style={tw`bg-[#F3F3F3] rounded-md flex-row items-center justify-between px-4`}
        >
          <TextInput
            placeholder="Search by location"
            style={tw`py-4`}
            placeholderTextColor={"#888888"}
            onChangeText={(text) => handleSearchLocation(text)}
            value={searchText}
            selectionColor="#888888"
          />
          <SvgXml xml={IconLOcation} />
        </View>

        {locationSuggestions.map((item, index) => (
          <TouchableOpacity
            key={item.place_id || index}
            onPress={() => {
              setSelectedLocation(item);
              setSearchText(item.name);
              setLocationSuggestions([]);
            }}
          >
            <View style={tw`py-2 border-b border-gray-300`}>
              <Text style={tw`font-bold text-black`}>{item.name}</Text>
              <Text style={tw`text-gray-600`}>{item.formatted_address}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Location;
