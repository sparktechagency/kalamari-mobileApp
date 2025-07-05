// import { AntDesign, EvilIcons, Feather } from "@expo/vector-icons";
// import { useState } from "react";
// import { Image, Modal, TouchableOpacity, View } from "react-native";
// import { Dialog, PanningProvider } from "react-native-ui-lib";
// import tw from "twrnc";

// import UserCamera from "./UserCamera";
// import UserProfileGallery from "./UserProfileGallery";

// const ProfileAlert = () => {
//   const [isVisible, setIsVisible] = useState(false);
//   const [isCameraVisible, setIsCameraVisible] = useState(false);
//   const [image, setImage] = useState(null);

//   return (
//     <View>
//       {/* Profile image or placeholder */}
//       {image ? (
//         <Image source={{ uri: image }} style={tw`w-20 h-20 rounded-full`} />
//       ) : (
//         <View
//           style={tw`w-20 h-20 rounded-full bg-gray-300 items-center justify-center`}
//         >
//           <Feather name="user" size={32} color="#888" />
//         </View>
//       )}

//       <TouchableOpacity onPress={() => setIsVisible(true)}>
//         <View
//           style={tw`absolute bottom-0 -right-0 bg-blue-500 p-2 rounded-full`}
//         >
//           <Feather name="camera" size={18} color="white" />
//         </View>
//       </TouchableOpacity>

//       {/* Gallery + options dialog */}
//       <Dialog
//         visible={isVisible}
//         onDismiss={() => setIsVisible(false)}
//         panDirection={PanningProvider.Directions.DOWN}
//         containerStyle={{
//           width: 300,
//           alignSelf: "center",
//           justifyContent: "center",
//           backgroundColor: "white",
//           borderRadius: 16,
//           padding: 20,
//         }}
//       >
//         <View>
//           <View style={tw` flex-row  justify-end `}>
//             <TouchableOpacity onPress={() => setIsVisible(false)}>
//               <AntDesign name="close" size={24} color="black" />
//             </TouchableOpacity>
//           </View>
//           <View style={tw` flex-row items-baseline `}>
//             <UserProfileGallery image={image} setImage={setImage} />

//             {/* Button to open camera */}
//             <TouchableOpacity
//               style={tw``}
//               onPress={() => {
//                 setIsVisible(false);
//                 setIsCameraVisible(true);
//               }}
//             >
//               <EvilIcons name="camera" size={65} color="#B0B0B0" />
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Dialog>

//       {/* Full screen camera modal */}
//       <Modal visible={isCameraVisible} animationType="slide">
//         <UserCamera onClose={() => setIsCameraVisible(false)} />
//       </Modal>
//     </View>
//   );
// };

// export default ProfileAlert;

import { AntDesign, EvilIcons, Feather } from "@expo/vector-icons";
import { useState } from "react";
import { Image, Modal, Text, TouchableOpacity, View } from "react-native";

import tw from "../../lib/tailwind";
import UserCamera from "./UserCamera";
import UserProfileGallery from "./UserProfileGallery";

const ProfileAlert = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [image, setImage] = useState(null);

  return (
    <View style={tw`items-center justify-center`}>
      {/* Profile Image */}
      {image ? (
        <Image source={{ uri: image }} style={tw`w-20 h-20 rounded-full`} />
      ) : (
        <View
          style={tw`w-20 h-20 rounded-full bg-gray-300 items-center justify-center`}
        >
          <Feather name="user" size={32} color="#888" />
        </View>
      )}

      {/* Camera Icon */}
      <TouchableOpacity onPress={() => setIsVisible(true)}>
        <View
          style={tw`absolute bottom-0  left-2 bg-blue-500 p-1.5 rounded-full`}
        >
          <Feather name="camera" size={18} color="white" />
        </View>
      </TouchableOpacity>

      <View>
        <Text style={tw`text-3 mt-2 text-textgray`}>@marke_7</Text>
      </View>

      {/* Custom Modal for options */}
      <Modal
        visible={isVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsVisible(false)}
      >
        <View style={tw`flex-1 justify-center items-center`}>
          <View style={tw`bg-white w-72 rounded-2xl p-5 shadow-2xl`}>
            {/* Close Button */}
            <View style={tw`items-end`}>
              <TouchableOpacity onPress={() => setIsVisible(false)}>
                <AntDesign name="close" size={24} color="black" />
              </TouchableOpacity>
            </View>

            {/* Gallery + Camera options */}
            <View style={tw`flex-row items-center justify-center gap-7 `}>
              <UserProfileGallery image={image} setImage={setImage} />
              <View>
                <TouchableOpacity
                  onPress={() => {
                    setIsVisible(false);
                    setIsCameraVisible(true);
                  }}
                >
                  <EvilIcons name="camera" size={65} color="#B0B0B0" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {/* Full screen camera modal */}
      <Modal visible={isCameraVisible} animationType="slide">
        <UserCamera onClose={() => setIsCameraVisible(false)} />
      </Modal>
    </View>
  );
};

export default ProfileAlert;
