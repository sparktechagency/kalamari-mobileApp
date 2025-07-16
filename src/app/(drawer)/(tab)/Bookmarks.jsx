import {
  IconsListRecipes,
  IconsListRestaurants,
  IconsSearch,
} from "@/assets/Icon";
import { Link } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import MyList from "../../../components/ui/MyList";
import MyRecipesList from "../../../components/ui/MyRecipesList";
import tw from "../../../lib/tailwind";
import { useGetAllBookMarkQuery } from "../../../redux/listApi/listApi";

// Define tab types

const Bookmarks = () => {
  // Tabs configuration
  const tabs = [
    {
      id: "1",
      label: "Restaurants",
    },
    { id: "2", label: "Recipes" },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const { data, isLoading, isError, refetch } = useGetAllBookMarkQuery({
    type: activeTab,
  });

  return isLoading ? (
    <View style={tw`flex-1 justify-center items-center`}>
      <ActivityIndicator size="large" color="#F97316" />
    </View>
  ) : (
    <View style={tw`flex-1 bg-white`}>
      <View style={tw`flex-1 px-4`}>
        {/* Header */}
        <Text style={tw`text-xl font-inter-700 py-4`}>My Lists</Text>

        {/* Search Bar */}
        <View style={tw`mb-4`}>
          <Link
            href={`/searchList/${
              activeTab === "1" ? "Restaurants" : "Recipes"
            }`}
            asChild
          >
            <TouchableOpacity>
              <View
                style={tw`bg-gray-100 flex-row items-center justify-between px-4 py-3 rounded-2xl gap-2`}
              >
                <SvgXml xml={IconsSearch} />
                <Text style={tw`flex-1 text-gray-700`}>
                  Search by {activeTab === "1" ? "Restaurants" : "Recipes"}
                </Text>
              </View>
            </TouchableOpacity>
          </Link>
        </View>

        {/* Tabs Navigation */}
        <View style={tw`flex-row items-center justify-between mb-4`}>
          <View style={tw`flex-row items-center`}>
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab.id}
                onPress={() => setActiveTab(tab.id)}
                style={tw`flex-row items-center mr-6`}
              >
                <Icons
                  size={20}
                  color={activeTab === tab.id ? "#F97316" : "#454545"}
                  style={tw`mr-2`}
                />
                <Text
                  style={[
                    tw`text-base font-inter-600`,
                    activeTab === tab.id
                      ? tw`text-orange underline`
                      : tw`text-gray-700`,
                  ]}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={tw`flex-row items-center gap-2`}>
            <SvgXml
              xml={activeTab === "1" ? IconsListRestaurants : IconsListRecipes}
            />
            <Text style={tw`text-gray-700`}>
              {/* {tabs.find((t) => t.id === activeTab)?.count} */}
              {data?.data?.length || 0}
            </Text>
          </View>
        </View>

        {/* Tab Content */}
        <View style={tw`flex-1`}>
          {activeTab === "1" && (
            <MyList isLoading={isLoading} data={data?.data} />
          )}
          {activeTab === "2" && (
            <MyRecipesList isLoading={isLoading} data={data?.data} />
          )}
        </View>
      </View>
    </View>
  );
};

export default Bookmarks;
