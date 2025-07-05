import { useEffect, useState } from "react";
import {
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Ionicons, Octicons, SimpleLineIcons } from "@expo/vector-icons";
import Header from "../../../components/ui/Header";
import ReportInput from "../../../components/ui/ReportInput";
import UserPost from "../../../components/ui/UserPost";
import tw from "../../../lib/tailwind";
import { storage } from "../../../utils/storage";

const Home = () => {
  const tab = ["Following", "Discovery"];

  useEffect(() => {
    const fetchToken = async () => {
      const token = await storage.getString("token");
      if (token) {
        // router.push("/(tab)");
      }
    };
    fetchToken();
  }, []);

  const [isActiveTab, setIsActiveTab] = useState("Following");

  const [isVisible, setIsVisible] = useState(false);
  const openModal = () => {
    setIsVisible(true);
  };
  const closeModal = () => setIsVisible(false);
  // console.log(is);
  const [reportVisible, setReportVisible] = useState(false);

  const [isFollower, setIsFollower] = useState(false);

  const { width } = Dimensions.get("window");

  return (
    <View style={tw`flex-1  bg-[#FDFFFE] `}>
      {/* top header */}
      <View style={tw` flex-1 px-[4%] `}>
        <View>
          <Header />
          <View style={tw`pb-4`}>
            <View
              style={tw`flex-row gap-2 w-[70%]   items-center justify-center  bg-[#3333331A] p-2 rounded-full `}
            >
              {tab.map((item, index) => (
                <View key={index} style={tw``}>
                  <Pressable onPress={() => setIsActiveTab(item)}>
                    <Text
                      style={[
                        tw.style(
                          "font-inter-400 px-4 py-1",
                          isActiveTab === item
                            ? "text-white bg-orange rounded-full"
                            : "text-textgray"
                        ),
                        { fontSize: width * 0.04 }, // dynamic font size (e.g. ~15–18px)
                      ]}
                    >
                      {item}
                    </Text>
                  </Pressable>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* view all user post  */}
        <View style={tw` flex-1 `}>
          <UserPost openModal={openModal} isActiveTab={isActiveTab} />
        </View>
        {/*  j */}
      </View>

      {/* <BottomSheet
        style={{ backgroundColor: "#fffff" }}
        ref={bottomSheetRef}
        index={-1} // initially closed
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose={true} // optional: allows swiping down to close
      >
        <BottomSheetView style={styles.sheetContent}>
          <Text style={styles.sheetText}>Awesome 🎉</Text>
        </BottomSheetView>
      </BottomSheet> */}
      {/* <TouchableOpacity onPress={openModal}>
        <Entypo name="dots-three-vertical" size={16} color="black" />
      </TouchableOpacity> */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Actions List */}
            <View style={tw`flex-col p-5`}>
              <TouchableOpacity
                style={tw`py-3  border-b border-gray-100`}
                onPress={() => setIsFollower(!isFollower)}
              >
                {isFollower ? (
                  <View style={tw` flex-row items-center gap-2`}>
                    <SimpleLineIcons
                      name="user-follow"
                      size={16}
                      color="black"
                    />
                    <Text style={tw`text-[16px]   font-inter-500 text-black`}>
                      follow
                    </Text>
                  </View>
                ) : (
                  <View style={tw` flex-row items-center gap-2`}>
                    <SimpleLineIcons
                      name="user-unfollow"
                      size={16}
                      color="black"
                    />
                    <Text style={tw`text-[16px]   font-inter-500 text-black`}>
                      Unfollow
                    </Text>
                  </View>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={tw`flex-row items-center py-3 border-b border-gray-100`}
                onPress={() => setReportVisible(!reportVisible)}
                activeOpacity={0.7}
                accessibilityLabel="Report content"
              >
                <Octicons name="report" size={16} color={tw.color("orange")} />
                <Text style={tw`ml-3 text-orange font-inter-500 text-[16px]`}>
                  Report
                </Text>
              </TouchableOpacity>
              {/* report  */}
              {reportVisible && (
                <ReportInput
                  reportVisible={reportVisible}
                  setReportVisible={setReportVisible}
                />
              )}
              <TouchableOpacity
                onPress={closeModal}
                style={tw` flex-row py-3 gap-2 items-center `}
              >
                <Ionicons name="close" size={20} color="#333" />

                <Text style={tw` text-[16px] font-inter-500 `}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end", // bottom sheet-like effect
    // backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    padding: 20,
    minHeight: 300,

    // ✅ iOS Shadow
    shadowColor: "#000",
    shadowOffset: { width: 100, height: 10 },
    shadowOpacity: 10,
    shadowRadius: 100,

    // ✅ Android Shadow
    elevation: 50,
  },
  sheetText: {
    fontSize: 18,
    fontWeight: "600",
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#ddd",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  closeText: {
    fontSize: 16,
  },
});

export default Home;
