// import { Ionicons, Octicons, SimpleLineIcons } from "@expo/vector-icons";
// import { useState } from "react";
// import { Modal, Text, TouchableOpacity, View } from "react-native";
// import tw from "../../lib/tailwind";
// import { useGeRandomuserUserDiscoveryToggleFollowMutation } from "../../redux/randomuserApi/randomuserApi";
// import ReportInput from "./ReportInput";

// const ReportModal = ({ isVisible, closeModal, userPostInfo }) => {
//   // Fixed the initial state logic - now correctly shows "Unfollow" when status is "Following"
//   const [isFollowing, setIsFollowing] = useState(
//     userPostInfo?.status === "Following"
//   );
//   const [reportVisible, setReportVisible] = useState(false);

//   console.log(userPostInfo);

//   const [toggleFollow, { isLoading: loadingFollow }] =
//     useGeRandomuserUserDiscoveryToggleFollowMutation();

//   // const snapPoints = useMemo(() => ["50%", "80%"], []);

//   // const isFollowing = randomUser?.data?.status === "Following";

//   const handleFollowToggle = async (id) => {
//     try {
//       const res = await toggleFollow({ user_id: id }).unwrap();
//       console.log("user un follow ", res);

//       if (res?.status) {
//         setIsFollowing(!isFollowing);
//       }
//     } catch (error) {
//       console.error("Failed to toggle follow:", error);
//     }
//   };

//   return (
//     <Modal
//       animationType="fade"
//       transparent={true}
//       visible={isVisible}
//       onRequestClose={closeModal}
//     >
//       <View style={tw`flex-1 justify-end bg-black/40`}>
//         <View
//           style={tw`bg-white rounded-t-3xl p-5 min-h-[300px] shadow-lg shadow-black/10`}
//         >
//           {/* Actions List */}
//           <View style={tw`flex-col`}>
//             {/* Follow/Unfollow Button */}
//             <TouchableOpacity
//               style={tw`py-3 border-b border-gray-100`}
//               onPress={() => handleFollowToggle(userPostInfo?.user_id)}
//               accessibilityLabel={isFollowing ? "Unfollow user" : "Follow user"}
//             >
//               <View style={tw`flex-row items-center gap-2`}>
//                 {userPostInfo?.status ? (
//                   <>
//                     <SimpleLineIcons
//                       name="user-unfollow"
//                       size={16}
//                       color="red"
//                     />
//                     <Text style={tw`text-base font-inter-500 text-primary`}>
//                       Unfollow
//                     </Text>
//                   </>
//                 ) : (
//                   <>
//                     <SimpleLineIcons name="user-follow" size={16} color="red" />
//                     <Text style={tw`text-base font-inter-500 text-primary`}>
//                       Follow
//                     </Text>
//                   </>
//                 )}
//               </View>
//             </TouchableOpacity>

//             {/* Report Button */}
//             <TouchableOpacity
//               style={tw`flex-row items-center py-3 border-b border-gray-100`}
//               onPress={() => setReportVisible(!reportVisible)}
//               activeOpacity={0.7}
//               accessibilityLabel="Report content"
//             >
//               <Octicons
//                 name="report"
//                 size={16}
//                 color={tw.color("orange-500")}
//               />
//               <Text style={tw`ml-3 font-inter-500 text- text-base`}>
//                 Report
//               </Text>
//             </TouchableOpacity>

//             {/* Report Input */}
//             {reportVisible && (
//               <ReportInput
//                 reportVisible={reportVisible}
//                 setReportVisible={setReportVisible}
//                 reportUserData={userPostInfo}
//               />
//             )}

//             {/* Cancel Button */}
//             <TouchableOpacity
//               onPress={closeModal}
//               style={tw`flex-row py-3 gap-2 items-center`}
//               accessibilityLabel="Close modal"
//             >
//               <Ionicons name="close" size={20} color="#333" />
//               <Text style={tw`text-base text-textPrimary font-medium`}>
//                 Cancel
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     </Modal>
//   );
// };

// export default ReportModal;

import { Ionicons, Octicons, SimpleLineIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import tw from "../../lib/tailwind";
import { useGeRandomuserUserDiscoveryToggleFollowMutation } from "../../redux/randomuserApi/randomuserApi";
import ReportInput from "./ReportInput";

const ReportModal = ({ isVisible, closeModal, userPostInfo }) => {
  const [isFollowing, setIsFollowing] = useState(
    userPostInfo?.status === "Following"
  );
  const [reportVisible, setReportVisible] = useState(false);

  const [toggleFollow, { isLoading: loadingFollow }] =
    useGeRandomuserUserDiscoveryToggleFollowMutation();

  const handleFollowToggle = async (id) => {
    try {
      const res = await toggleFollow({ user_id: id }).unwrap();
      if (res?.status) {
        setIsFollowing((prev) => !prev);
      }
    } catch (error) {
      console.error("Failed to toggle follow:", error);
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent
      visible={isVisible}
      onRequestClose={closeModal}
    >
      <View style={tw`flex-1 justify-end bg-black/40`}>
        <View style={tw`bg-white rounded-t-3xl p-5 min-h-[300px] shadow-lg`}>
          {/* Actions */}
          <View style={tw`flex-col`}>
            {/* Follow / Unfollow */}
            <TouchableOpacity
              style={tw`py-3 border-b border-gray-100`}
              onPress={() => handleFollowToggle(userPostInfo?.user_id)}
              accessibilityLabel={isFollowing ? "Unfollow user" : "Follow user"}
            >
              <View style={tw`flex-row items-center gap-2`}>
                <SimpleLineIcons
                  name={isFollowing ? "user-unfollow" : "user-follow"}
                  size={16}
                  color="red"
                />
                <Text style={tw`text-base font-inter-500 text-primary`}>
                  {isFollowing ? "Unfollow" : "Follow"}
                </Text>
              </View>
            </TouchableOpacity>

            {/* Report */}
            <TouchableOpacity
              style={tw`flex-row items-center py-3 border-b border-gray-100`}
              onPress={() => setReportVisible(!reportVisible)}
              activeOpacity={0.7}
              accessibilityLabel="Report content"
            >
              <Octicons
                name="report"
                size={16}
                color={tw.color("orange-500")}
              />
              <Text style={tw`ml-3 font-inter-500 text-base text-[#333]`}>
                Report
              </Text>
            </TouchableOpacity>

            {/* Report Input */}
            {reportVisible && (
              <ReportInput
                reportVisible={reportVisible}
                setReportVisible={setReportVisible}
                reportUserData={userPostInfo}
              />
            )}

            {/* Cancel */}
            <TouchableOpacity
              onPress={closeModal}
              style={tw`flex-row py-3 gap-2 items-center`}
              accessibilityLabel="Close modal"
            >
              <Ionicons name="close" size={20} color="#333" />
              <Text style={tw`text-base text-textPrimary font-medium`}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ReportModal;
