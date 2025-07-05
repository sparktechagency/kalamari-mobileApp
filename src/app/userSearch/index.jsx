import { Fontisto, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDebounce } from "use-debounce";
import tw from "../../lib/tailwind";
import { useSearchUserQuery } from "../../redux/homeApi/homeApi";

const Search = () => {
  const [searchPeople, setSearchPeople] = useState("");
  const [debouncedSearch] = useDebounce(searchPeople, 500);

  const { data, isLoading, error } = useSearchUserQuery(
    { user_name: debouncedSearch },
    { skip: !debouncedSearch.trim() }
  );
  // Use useMemo to avoid recalculating users list unless `data` changes.
  // If `data.data` exists, use it; otherwise, fallback to an empty array.
  const users = useMemo(() => data?.data || [], [data]);

  // Check if the API returned any users
  const hasResults = users.length > 0;

  // Show placeholder only if the search input is completely empty
  const showPlaceholder = !debouncedSearch.trim();

  // Show loading indicator only when API is loading AND user typed something
  const showLoading = isLoading && debouncedSearch.trim();

  // Show "No users found" message only when:
  // - it's NOT loading
  // - there are NO results
  // - and the user has typed something (search is not empty)
  const showNoResults = !showLoading && !hasResults && debouncedSearch.trim();

  const renderUserItem = ({ item: user }) => (
    <TouchableOpacity
      onPress={() => router.push(`/randomuser/${user?.id}`)}
      style={tw`flex-row items-center justify-between p-3`}
    >
      <View style={tw`flex-row flex-1 items-center`}>
        <Image
          source={{
            uri: user?.avatar || "https://i.ibb.co/hFKjJHpC/Ellipse-4-1.png",
          }}
          style={tw`w-10 h-10 rounded-full mr-3`}
        />
        <View style={tw`flex-1`}>
          <Text style={tw`font-bold text-textPrimary`}>
            {user?.name || "Unnamed"}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={tw`flex-1 bg-primaryBg p-4`}>
      {/* Header */}
      <View style={tw`flex-row items-center gap-2 my-4`}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="arrow-back-ios" size={24} color="black" />
        </TouchableOpacity>
        <Text style={tw`text-xl text-[#121212] font-bold`}>Search User</Text>
      </View>

      {/* Search Input */}
      <View style={tw`mb-6`}>
        <View
          style={tw`flex-row items-center bg-[#F3F3F3] rounded-4 px-4 py-2`}
        >
          <Fontisto name="search" size={20} color="#888888" style={tw`mr-2`} />
          <TextInput
            style={tw`flex-1 text-base text-textPrimary`}
            onChangeText={setSearchPeople}
            value={searchPeople}
            placeholder="Search"
            placeholderTextColor="#888"
            clearButtonMode="while-editing"
            returnKeyType="search"
          />
        </View>
      </View>

      {/* Results Section */}
      <Text style={tw`text-lg py-4 text-[#121212] font-semibold`}>
        All Users
      </Text>

      {/* Results List */}
      {showPlaceholder ? (
        <Text style={tw`text-center text-textgray py-4`}>
          Type something to search users
        </Text>
      ) : showLoading ? (
        <ActivityIndicator style={tw`my-4`} size="large" color="#ED6237" />
      ) : showNoResults ? (
        <Text style={tw`text-center text-textgray py-4`}>No users found</Text>
      ) : (
        <FlatList
          data={users}
          renderItem={renderUserItem}
          keyExtractor={(user) => user.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={tw`pb-4`}
        />
      )}
    </View>
  );
};

export default Search;
