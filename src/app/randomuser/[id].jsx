import { IconsLists, IconsTopDropDown } from "@/assets/Icon";
import { MaterialIcons } from "@expo/vector-icons";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import { useCallback, useMemo, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SvgXml } from "react-native-svg";
import BlockModal from "../../components/ui/BlockModal";
import RandomUserProfile from "../../components/ui/RandomUserProfile";
import RecentActivityListRandomUser from "../../components/ui/RecentActivityListRandomUser";
import RecentsActiveList from "../../components/ui/RecentsActiveList";
import RecipesActivityList from "../../components/ui/RecipesActivityList";
import tw from "../../lib/tailwind";

// tabs name and icons
const tabs = [{ label: "Restaurants" }, { label: "Recipes" }];

const RandomUser = () => {
  const [activeTab, setActiveTab] = useState(null); // Start with no tab selected
  const [report, setReport] = useState(false); // Start with no tab selected
  const [isFollower, setIsFollower] = useState(true);
  const bottomSheetRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalName, setModalName] = useState("");
  const [showRecent, setShowRecent] = useState(true); // Start with Recents shown

  const snapPoints = useMemo(() => ["50%", "80%"], []);

  const handleSheetChanges = useCallback((index) => {
    // console.log("Sheet position changed to:", index);
  }, []);

  const openSheet = () => {
    bottomSheetRef.current?.snapToIndex(0);
  };

  const handleViewMode = (name) => {
    setModalVisible(true);
    setModalName(name);
  };

  const handleTabPress = (label) => {
    setShowRecent(false); // Hide Recents when a tab is selected
    setActiveTab(label);
  };

  const handleRecentPress = () => {
    setShowRecent(true); // Show Recents
    setActiveTab(null); // Clear active tab
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <GestureHandlerRootView style={tw`flex-1 bg-primaryBg`}>
        <View style={tw`p-[4%] flex-1`}>
          {/* Header */}
          <View style={tw`flex-row justify-between items-center`}>
            <View style={tw`flex-row items-center gap-2 my-2`}>
              <TouchableOpacity onPress={() => router.back()}>
                <MaterialIcons name="arrow-back-ios" size={24} color="black" />
              </TouchableOpacity>
              <Text style={tw`text-4.2 text-[#121212] font-bold`}>Back</Text>
            </View>
            <TouchableOpacity onPress={openSheet}>
              <SvgXml xml={IconsTopDropDown} />
            </TouchableOpacity>
          </View>

          {/* Profile Card */}
          <RandomUserProfile />

          {/* Follow / Unfollow Button */}
          <View style={tw`w-full`}>
            <Pressable
              onPress={() => setIsFollower(!isFollower)}
              style={tw`${
                isFollower ? "border border-[#ED6237]" : "bg-orange"
              } px-4 py-3 rounded-full`}
            >
              <Text
                style={tw`${
                  isFollower ? "text-textPrimary" : "text-white"
                } font-bold text-center`}
              >
                {isFollower ? "Unfollow" : "Follow"}
              </Text>
            </Pressable>
          </View>

          {/* Tabs Header */}
          <View style={tw`py-4 flex-row justify-between items-center`}>
            <TouchableOpacity
              onPress={handleRecentPress}
              style={tw`flex-row items-center gap-2`}
            >
              <SvgXml xml={IconsLists} />
              <Text
                style={tw`text-4 font-bold ${
                  showRecent ? "text-orange underline" : "text-[#121212]"
                }`}
              >
                Recents
              </Text>
            </TouchableOpacity>

            <View style={tw`flex-row items-center gap-4`}>
              {tabs.map((item) => (
                <Pressable
                  key={item.label}
                  onPress={() => handleTabPress(item.label)}
                  style={tw`flex-row items-center gap-1`}
                >
                  <Text
                    style={tw`${
                      activeTab === item.label
                        ? "text-orange underline"
                        : "text-[#454545]"
                    } text-4 font-bold`}
                  >
                    {item.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Tab Content */}
          <View style={tw`flex-1`}>
            {showRecent ? (
              <RecentsActiveList />
            ) : activeTab === "Restaurants" ? (
              <RecentActivityListRandomUser />
            ) : (
              <RecipesActivityList />
            )}
          </View>

          {/* Bottom Sheet */}
          <BottomSheet
            ref={bottomSheetRef}
            index={-1}
            snapPoints={snapPoints}
            enablePanDownToClose={true}
            onChange={handleSheetChanges}
          >
            <BottomSheetView style={styles.contentContainer}>
              <View style={tw`flex-col gap-4`}>
                <TouchableOpacity
                  onPress={() => handleViewMode("Block")}
                  style={tw`py-2`}
                >
                  <Text style={tw`font-inter-500 text-orange`}>Block</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setReport(!report)}
                  style={tw`py-2`}
                >
                  <Text style={tw`font-inter-500 text-orange`}>Report</Text>
                </TouchableOpacity>

                {report && (
                  <View style={tw`mt-4`}>
                    {/* Text Input Box */}
                    <View style={tw`bg-[#F3F3F3] rounded-md`}>
                      <TextInput
                        style={tw`p-3 text-textPrimary text-left text-sm h-32`}
                        placeholder="Report"
                        multiline
                        numberOfLines={6}
                        textAlignVertical="top"
                        placeholderTextColor="#888888"
                        // onChangeText={(text) => setDescription(text)}
                        // value={description}
                        selectionColor="#888888"
                      />
                    </View>

                    {/* Submit Button */}
                    <TouchableOpacity
                      style={tw`mt-4 self-start bg-[#F15A29] px-6 py-2 rounded`}
                      onPress={() => {
                        setReport(false);
                      }}
                    >
                      <Text
                        style={tw`text-white text-base font-semibold text-center`}
                      >
                        Submit
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}

                <TouchableOpacity
                  onPress={() => handleViewMode("Restrict")}
                  style={tw`py-2`}
                >
                  <Text style={tw`font-inter-500 text-orange`}>Restrict</Text>
                </TouchableOpacity>
              </View>
            </BottomSheetView>
          </BottomSheet>

          {/* Modal */}
          <BlockModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            modalName={modalName}
          />
        </View>
      </GestureHandlerRootView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  container: {
    flex: 1,
  },
});

export default RandomUser;
