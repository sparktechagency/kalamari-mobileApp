import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import ProfileAlert from "../../components/ui/ProfileAlert";
import tw from "../../lib/tailwind";
import { useGetProfileQuery } from "../../redux/apiSlices/authApiSlice";
import { useUpdateUserProfileMutation } from "../../redux/profileApi/profileApi";

const ViewDetails = () => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [photos, setPhotos] = useState([]);
  const [image, setImage] = useState();

  const { id } = useLocalSearchParams();

  const [updatedProfile, { isLoading }] = useUpdateUserProfileMutation();

  const { data: userData } = useGetProfileQuery();

  // console.log("userData", id);
  // console.log(userData);

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("bio", bio);

      if (image?.assets?.[0]?.uri) {
        const file = image.assets[0];
        formData.append("avatar", {
          uri: file.uri,
          name: file.fileName || `image_${Date.now()}.jpg`,
          type: file.mimeType || "image/jpg",
        });
      }

      // ✅ Proper API call — pass FormData directly
      const res = await updatedProfile(formData).unwrap();

      // console.log("api response --------------", res);

      setName("");
      setBio("");
      setImage(null);

      router.back();

      // Alert.alert("Success!", "Profile updated successfully");
    } catch (error) {
      console.error("failed:-----", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={tw`flex-1 bg-primaryBg`}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={tw`p-[4%] flex-1`}>
            <View>
              <View style={tw`flex-row items-center gap-2 mb-12`}>
                <TouchableOpacity onPress={() => router?.back()}>
                  <MaterialIcons
                    name="arrow-back-ios"
                    size={24}
                    color="black"
                  />
                </TouchableOpacity>
                <Text style={tw`text-5 text-[#121212] font-inter-700`}>
                  Edit
                </Text>
              </View>

              {/* Profile Image Picker */}
              <View style={tw`items-center relative`}>
                <ProfileAlert
                  photos={photos}
                  setPhotos={setPhotos}
                  image={image}
                  setImage={setImage}
                  userData={userData?.data}
                />
              </View>
            </View>

            <View style={tw`flex-1 py-2 flex-col justify-between gap-6`}>
              <View>
                {/* Header */}
                <Text style={tw`text-4 font-inter-700 mb-4 mt-10`}>
                  Basic Information
                </Text>

                {/* Full Name Input */}
                <View style={tw`mb-6`}>
                  <Text
                    style={tw`text-base text-[#121212] font-inter-600 mb-2`}
                  >
                    Full Name
                  </Text>
                  <View style={tw`bg-[#F3F3F3] rounded-md`}>
                    <TextInput
                      placeholder={userData?.data?.name || "Enter your name"}
                      placeholderTextColor="#888"
                      selectionColor={"#888"}
                      style={tw`px-4 py-4.5 text-base`}
                      onChangeText={(text) => setName(text)}
                      value={name}
                    />
                  </View>
                </View>

                {/* Bio Input */}
                <View>
                  <Text
                    style={tw`text-base text-[#121212] font-inter-600 mb-2`}
                  >
                    Bio
                  </Text>
                  <View style={tw`bg-[#F3F3F3] rounded-md`}>
                    <TextInput
                      multiline
                      numberOfLines={6}
                      textAlignVertical="top"
                      placeholder={
                        userData?.data?.bio || "Write about yourself.."
                      }
                      placeholderTextColor="#888888"
                      style={tw`h-30 px-4 pt-4 text-base`}
                      onChangeText={(text) => setBio(text)}
                      value={bio}
                    />
                  </View>
                </View>
              </View>

              {/* Save Button */}
              <View>
                <Pressable
                  onPress={handleSubmit}
                  style={tw`bg-[#ED6237] w-full rounded-full items-center justify-center`}
                >
                  <Text style={tw`text-white py-3 font-medium text-lg`}>
                    {isLoading ? "Saving..." : "Save Changes"}
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ViewDetails;
