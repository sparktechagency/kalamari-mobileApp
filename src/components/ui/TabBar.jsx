import { Text, TouchableOpacity, View } from "react-native";
import tw from "../../lib/tailwind";

const TabBar = ({ activeTab, onTabChange }) => {
  return (
    <View style={tw`flex-row items-center px-4 py-3 bg-white`}>
      {/* <SvgXml xml={IconsLists} width={20} height={20} style={tw`mr-4`} /> */}

      {["lists", "recents"].map((tab) => (
        <TouchableOpacity
          key={tab}
          onPress={() => onTabChange(tab)}
          style={tw``}
        >
          <Text
            style={[
              tw`text-base font-bold`,
              activeTab === tab ? tw`text-[#121212]` : tw`text-gray-400`,
            ]}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </Text>
          {activeTab === tab && (
            <View style={tw`h-1 bg-[#121212] rounded-full mt-1`} />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default TabBar;
