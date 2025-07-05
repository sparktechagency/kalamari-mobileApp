// import { useState } from "react";
// import { Pressable, Text, View } from "react-native";
// import tw from "../../lib/tailwind";
// import { Dialog, PanningProvider } from "react-native-ui-lib";

// const UserSideMenu = ({ isVisible }) => {
//   const [isFollower, setIsFollower] = useState(false);

//   return (
//     <View style>
//       {/* {isActiveTab === "Discovery" ? (
//         <View>
//           <Pressable
//             onPress={() => setIsFollower(!isFollower)}
//             style={tw`  ${
//               isFollower ? " border-2 border-[#E53E3E]  " : "bg-orange"
//             }  py-1 px-5  rounded-full `}
//           >
//             <Text
//               style={tw` ${
//                 isFollower
//                   ? "text-[#E53E3E] font-inter-700"
//                   : "text-white font-inter-700"
//               }  `}
//             >
//               {" "}
//               {isFollower ? "Unfollow" : "follow"}{" "}
//             </Text>
//           </Pressable>
//         </View>
//       ) : (
//         ""
//       )} */}

// <Dialog
//         visible={isVisible}
//         onDismiss={() => setIsVisible(false)}
//         panDirection={PanningProvider.Directions.DOWN}
//         containerStyle={{
//           width: 324,
//           alignSelf: "center",
//           backgroundColor: "white",
//           borderRadius: 16,
//           padding: 24,
//         }}
//       >
//         <View center>
//           <View
//             style={{
//               backgroundColor: "#F0F0F0",
//               padding: 16,
//               borderRadius: 50,
//               marginBottom: 16,
//             }}
//           >
//             {/* <AntDesign name="checkcircle" size={32} color="black" /> */}
//           </View>

//           <Text text60BO marginB-8>
//             Successful!
//           </Text>
//           <Text text70 color="#6B7280" marginB-20>
//             Your post was successful
//           </Text>

//           {/* <Button
//             label="Done"
//             onPress={() => setIsVisible(false)}
//             backgroundColor="black"
//             labelStyle={{ color: "white", fontWeight: "bold" }}
//             style={{ borderRadius: 999, paddingVertical: 12, width: "100%" }}
//           /> */}
//         </View>
//       </Dialog>

//     </View>
//   );
// };

// export default UserSideMenu;

import { Text, View } from "react-native";

const UserSideMenu = () => {
  return (
    <View>
      <Text>UserSideMenu</Text>
    </View>
  );
};

export default UserSideMenu;
