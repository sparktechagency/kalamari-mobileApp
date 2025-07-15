import { IconsLists, IconsTopDropDown } from "@/assets/Icon";
import { MaterialIcons } from "@expo/vector-icons";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SvgXml } from "react-native-svg";
import tw from "../../lib/tailwind";

// Components
import BlockModal from "../../components/ui/BlockModal";
import RandomUserProfile from "../../components/ui/RandomUserProfile";
import RecentsActiveList from "../../components/ui/RecentsActiveList";
import RecipesActivityList from "../../components/ui/RecipesActivityList";

// Redux
import ReportInput from "../../components/ui/ReportInput";
import RestaurantsListRandomUser from "../../components/ui/RestaurantsListRandomUser";
import {
  useGeRandomuserUserDiscoveryToggleFollowMutation,
  useGetRandomuserUserQuery,
} from "../../redux/randomuserApi/randomuserApi";

const tabs = [
  {
    id: "1",
    label: "Restaurants",
  },
  { id: "2", label: "Recipes" },
];
const RandomUser = () => {
  const { id } = useLocalSearchParams();

  // console.log("id", id);

  const {
    data: randomUser,
    isLoading,
    refetch,
  } = useGetRandomuserUserQuery({ user_id: id });

  const bottomSheetRef = useRef(null);

  const [activeTab, setActiveTab] = useState(tabs[0]?.id);
  const [showRecent, setShowRecent] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalName, setModalName] = useState("");
  const [report, setReport] = useState(false);
  const [reportText, setReportText] = useState("");

  // console.log("randomUser ----", activeTab);

  const [toggleFollow, { isLoading: loadingFollow }] =
    useGeRandomuserUserDiscoveryToggleFollowMutation();

  const snapPoints = useMemo(() => ["50%", "80%"], []);

  const isFollowing = randomUser?.data?.status === "Following";

  const handleRandomUserFollow = async () => {
    try {
      const res = await toggleFollow({ user_id: id }).unwrap();
      if (res?.status) refetch();
    } catch (error) {
      console.error("Failed to toggle follow:", error);
    }
  };

  const openSheet = useCallback(() => {
    bottomSheetRef.current?.expand(); // or .present()
  }, []);

  const handleViewMode = (name) => {
    setModalVisible(true);
    setModalName(name);
  };

  const handleTabPress = (label) => {
    setShowRecent(false);
    setActiveTab(label);
  };

  const handleRecentPress = () => {
    setShowRecent(true);
    setActiveTab(null);
  };

  const handleReportSubmit = () => {
    if (reportText.trim()) {
      // Submit report (add mutation if needed)
      setReport(false);
      setReportText("");
    }
  };

  if (isLoading) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <ActivityIndicator size="large" color="#ED6237" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <SafeAreaView style={tw`flex-1 bg-primaryBg`}>
        <GestureHandlerRootView style={tw`flex-1`}>
          <View style={tw`p-[4%] flex-1`}>
            {/* Header */}
            <View style={tw`flex-row justify-between items-center`}>
              <View style={tw`flex-row items-center gap-2 my-2`}>
                <TouchableOpacity onPress={() => router.back()}>
                  <MaterialIcons
                    name="arrow-back-ios"
                    size={24}
                    color="black"
                  />
                </TouchableOpacity>
                <Text style={tw`text-4.2 text-[#121212] font-bold`}>Back</Text>
              </View>
              <TouchableOpacity onPress={openSheet}>
                <SvgXml xml={IconsTopDropDown} />
              </TouchableOpacity>
            </View>

            {/* Profile */}
            <RandomUserProfile randomUser={randomUser} id={id} />

            {/* Follow Button */}
            <View style={tw`w-full`}>
              <Pressable
                onPress={handleRandomUserFollow}
                disabled={loadingFollow}
                style={tw`${
                  isFollowing ? "border border-[#ED6237]" : "bg-orange"
                } px-4 py-3 rounded-full opacity-${
                  loadingFollow ? "40" : "100"
                }`}
              >
                <Text
                  style={tw`${
                    isFollowing ? "text-textPrimary" : "text-white"
                  } font-bold text-center`}
                >
                  {isFollowing ? "Unfollow" : "Follow"}
                </Text>
              </Pressable>
            </View>

            {/* Tabs */}
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
                {tabs.map(({ label }) => (
                  <Pressable
                    key={label}
                    onPress={() => handleTabPress(label)}
                    style={tw`flex-row items-center gap-1`}
                  >
                    <Text
                      style={tw`${
                        activeTab === label
                          ? "text-orange underline"
                          : "text-[#454545]"
                      } text-4 font-bold`}
                    >
                      {label}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            {/* Tab Content */}
            <View style={tw`flex-1`}>
              {showRecent ? (
                <RecentsActiveList user_id={id} />
              ) : activeTab === "Restaurants" ? (
                <RestaurantsListRandomUser id={id} />
              ) : (
                <RecipesActivityList id={id} />
              )}
            </View>

            {/* Bottom Sheet */}
            <BottomSheet
              ref={bottomSheetRef}
              index={-1}
              snapPoints={snapPoints}
              enablePanDownToClose
              onChange={() => {}}
            >
              <BottomSheetView style={styles.contentContainer}>
                <View style={tw`flex-col gap-4`}>
                  <TouchableOpacity onPress={() => handleViewMode("Block")}>
                    <Text style={tw`font-inter-500 text-orange`}>Block</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => setReport(!report)}>
                    <Text style={tw`font-inter-500 text-orange`}>Report</Text>
                  </TouchableOpacity>

                  {report && (
                    <ReportInput
                      reportUserData={randomUser}
                      id={id}
                      profileReport={report}
                      setProfileReport={setReport}
                    />
                  )}

                  <TouchableOpacity onPress={() => handleViewMode("Restrict")}>
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
              id={id}
            />
          </View>
        </GestureHandlerRootView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
});

export default RandomUser;
