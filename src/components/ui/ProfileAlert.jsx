import { AntDesign, EvilIcons, Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Image, Modal, Text, TouchableOpacity, View } from "react-native";

import tw from "../../lib/tailwind";
import { makeImage } from "../../redux/api/baseApi";
import { useGetProfileQuery } from "../../redux/apiSlices/authApiSlice";
import UserCamera from "./UserCamera";
import UserProfileGallery from "./UserProfileGallery";

const ProfileAlert = ({ photos, setPhotos, image, setImage, userData }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  // gallary image
  // console.log(image?.assets[0]?.uri);

  const { data: user, isLoading, refetch } = useGetProfileQuery();
  // console.log(user);

  useEffect(() => {
    refetch();
  }, [refetch]);

  // console.log("userData", userData);

  const imageUrl = makeImage(userData?.avatar);

  return (
    <View style={tw`items-center justify-center`}>
      {/* Profile Image */}
      {/* photos image */}
      {image ? (
        <Image
          source={{ uri: image?.assets[0]?.uri }}
          style={tw`w-20 h-20 rounded-full`}
        />
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
        <Text style={tw`text-3 mt-2 text-textgray`}>
          {user?.data?.user_name}
        </Text>
      </View>

      {/* Custom Modal for options */}
      <Modal
        visible={isVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsVisible(false)}
      >
        <View style={tw`flex-1 justify-center items-center`}>
          <View
            style={tw`bg-white w-72 rounded-2xl p-4 shadow-2xl items-center`}
          >
            {/* Gallery + Camera + Delete */}
            <View style={tw`flex-row items-end   gap-7 `}>
              <UserProfileGallery image={image} setImage={setImage} />

              <TouchableOpacity
                style={tw`flex-col items-center justify-center  gap-7 `}
                onPress={() => {
                  setIsVisible(false);
                  setIsCameraVisible(true);
                }}
              >
                <EvilIcons name="camera" size={65} color="#B0B0B0" />
              </TouchableOpacity>

              <View style={tw``}>
                <TouchableOpacity onPress={() => setIsVisible(false)}>
                  <AntDesign name="delete" size={41} color="#B0B0B0" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {/* Full screen camera modal */}
      <Modal visible={isCameraVisible} animationType="fade">
        <UserCamera
          photos={photos}
          setPhotos={setPhotos}
          onClose={() => setIsCameraVisible(false)}
        />
      </Modal>
    </View>
  );
};

export default ProfileAlert;
