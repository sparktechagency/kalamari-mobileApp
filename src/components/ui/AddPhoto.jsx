// import { IconAddPhoto, IconsImageDeleted } from "@/assets/Icon";
// import * as ImagePicker from "expo-image-picker";
// import { useState } from "react";
// import {
//   FlatList,
//   Image,
//   Modal,
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";

// import { SvgXml } from "react-native-svg";
// import tw from "../../lib/tailwind";

// export default function AddPhoto({ setImage, modalVisible, setModalVisible }) {
//   // console.log(image);

//   const [storeImage, setStoreImage] = useState([]);

//   setImage(storeImage);

//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       cameraType: ImagePicker.CameraType.front,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     console.log(result);

//     if (!result.canceled && result.assets && result.assets.length > 0) {
//       // Extract just the image object from assets[0]
//       const imageObj = {
//         ...result.assets[0],
//       };

//       setStoreImage((prev) => [...prev, imageObj]);
//       setImage((prev) => [...prev, imageObj]);
//     }
//   };

//   // removed the image from the array
//   const handleImageRemoved = (uri) => {
//     setStoreImage(storeImage?.filter((item) => item !== uri));
//   };

//   //clear data image array
//   const handleClearAll = () => {
//     setStoreImage([]);
//     setModalVisible(!modalVisible);
//     setImage("");
//   };

//   // console.log(image);

//   return (
//     <View style={tw` `}>
//       <SafeAreaView style={styles.centeredView}>
//         <Modal
//           animationType="slide"
//           transparent={true}
//           visible={modalVisible}
//           onRequestClose={() => setModalVisible(!modalVisible)}
//         >
//           <View style={tw` bg-white flex-1`}>
//             <View style={tw` bg-white flex-1 p-4`}>
//               <View style={{ flex: 1 }}>
//                 <View style={tw` py-4 flex-row items-center justify-between `}>
//                   <Text style={tw` text-textPrimary font-inter-600`}>
//                     Image Gallery ({storeImage?.length})
//                   </Text>

//                   <TouchableOpacity
//                     onPress={handleClearAll}
//                     style={tw` bg-orange px-4 py-2 rounded`}
//                   >
//                     <Text style={tw` text-white font-inter-600 `}>
//                       Clear All
//                     </Text>
//                   </TouchableOpacity>
//                 </View>

//                 <>
//                   <FlatList
//                     data={storeImage}
//                     keyExtractor={(item, index) => `${item}-${index}`}
//                     renderItem={({ item }) => (
//                       <View style={tw`relative my-2`}>
//                         <Image
//                           source={{ uri: item }}
//                           style={tw`rounded w-full h-40`}
//                           resizeMode="cover"
//                         />

//                         <TouchableOpacity
//                           onPress={() => handleImageRemoved(item)}
//                           style={tw`absolute right-2 top-2 p-1 bg-orange rounded`}
//                         >
//                           <SvgXml xml={IconsImageDeleted} />
//                         </TouchableOpacity>
//                       </View>
//                     )}
//                     showsVerticalScrollIndicator={false}
//                   />
//                 </>
//               </View>
//               <TouchableOpacity
//                 style={tw` bg-orange py-2 rounded `}
//                 onPress={() => setModalVisible(!modalVisible)}
//               >
//                 <Text style={tw` font-inter-700 text-white text-center`}>
//                   Close Modal
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </Modal>
//       </SafeAreaView>

//       <TouchableOpacity onPress={pickImage}>
//         {/* {image ? (
//         <Image source={{ uri: image }} style={styles.image} />
//       ) : (
//         <>
//           <View
//             style={tw`flex-row px-4 items-center justify-center gap-2 border-[1px] border-[#B0B0B0]  rounded-md  py-1.8  `}
//           >
//             <View style={tw` `}>
//               <SvgXml xml={IconAddPhoto} />
//             </View>
//             <Text style={tw`text-[16px] font-bold text-[#121212] `}>
//               Add photo
//             </Text>
//           </View>
//         </>
//       )} */}

//         <View
//           style={tw`flex-row px-4 items-center justify-center gap-2 border-[1px] border-[#B0B0B0]  rounded-md  py-1.8  `}
//         >
//           <View style={tw` `}>
//             <SvgXml xml={IconAddPhoto} />
//           </View>
//           <Text style={tw`text-[16px] font-bold text-[#121212] `}>
//             Add Photo
//           </Text>
//         </View>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {},
//   image: {
//     width: 100,
//     height: 100,
//   },

//   modalView: {
//     backgroundColor: "white",
//     borderRadius: 20,
//     padding: 35,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   button: {
//     borderRadius: 20,
//     padding: 10,
//     elevation: 2,
//   },
//   buttonOpen: {
//     backgroundColor: "#F194FF",
//   },
//   buttonClose: {
//     backgroundColor: "#2196F3",
//   },
//   textStyle: {
//     color: "white",
//     fontWeight: "bold",
//     textAlign: "center",
//   },
//   modalText: {
//     marginBottom: 15,
//     textAlign: "center",
//   },
// });

import { IconAddPhoto, IconsImageDeleted } from "@/assets/Icon";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";
import tw from "../../lib/tailwind";

export default function AddPhoto({ setImage, modalVisible, setModalVisible }) {
  const [storeImage, setStoreImage] = useState([]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],

      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets?.[0]) {
      const newImage = result.assets[0];
      setStoreImage((prev) => [...prev, newImage]);
      setImage((prev) => [...prev, newImage]);
    }
  };

  const handleImageRemoved = (uri) => {
    const updatedImages = storeImage.filter((item) => item.uri !== uri);
    setStoreImage(updatedImages);
    setImage(updatedImages);
  };

  const handleClearAll = () => {
    setStoreImage([]);
    setImage([]);
    setModalVisible(false);
  };

  return (
    <View style={tw``}>
      <SafeAreaView>
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={tw`bg-white flex-1 p-4`}>
            <View style={tw`py-4 flex-row items-center justify-between`}>
              <Text style={tw`text-textPrimary font-inter-600`}>
                Image Gallery ({storeImage?.length})
              </Text>
              <TouchableOpacity
                onPress={handleClearAll}
                style={tw`bg-orange px-4 py-2 rounded`}
              >
                <Text style={tw`text-white font-inter-600`}>Clear All</Text>
              </TouchableOpacity>
            </View>

            <FlatList
              data={storeImage}
              keyExtractor={(item, index) => `${item.uri}-${index}`}
              renderItem={({ item }) => (
                <View style={tw`relative my-2`}>
                  <Image
                    source={{ uri: item.uri }}
                    style={tw`rounded w-full h-40`}
                    resizeMode="cover"
                  />
                  <TouchableOpacity
                    onPress={() => handleImageRemoved(item.uri)}
                    style={tw`absolute right-2 top-2 p-1 bg-orange rounded`}
                  >
                    <SvgXml xml={IconsImageDeleted} />
                  </TouchableOpacity>
                </View>
              )}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={tw`pb-4`}
            />

            <TouchableOpacity
              style={tw`bg-orange py-3 rounded mt-auto`}
              onPress={() => setModalVisible(false)}
            >
              <Text style={tw`font-inter-700 text-white text-center`}>
                Close Modal
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </SafeAreaView>

      <TouchableOpacity
        onPress={pickImage}
        style={tw`flex-row items-center px-4  justify-center gap-2 border border-[#B0B0B0] rounded-md py-1.5`}
      >
        <SvgXml xml={IconAddPhoto} />
        <Text style={tw`text-base font-inter-600 text-[#121212]`}>
          Add Photo
        </Text>
      </TouchableOpacity>
    </View>
  );
}
