import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import AddPhoto from "../../../components/ui/AddPhoto";
import Location from "../../../components/ui/Location";
import SelectRadioButton from "../../../components/ui/SelectRadioButton";
import TagManager from "../../../components/ui/TagManager";
import TagPepoleView from "../../../components/ui/TagPepoleView";
import UserRating from "../../../components/ui/UserRating";
import tw from "../../../lib/tailwind";
import { useCreatePostMutation } from "../../../redux/postApi/postApi";
import { convertToUniqueTagArrays } from "../../../utils/convertToUniqueTagArrays";

//  updated and more better code readabel

const Post = () => {
  const [userName, setuserName] = useState("");
  const [mealName, setMealName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedOptionFood, setSelectedOptionFood] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [rating, setRating] = useState("");
  const [restaurant, setRestaurant] = useState("");
  const [tags, setTags] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [hover, setHover] = useState("");
  const [createPost, { isLoading }] = useCreatePostMutation();

  const [image, setImage] = useState([]);

  console.log(selectedOption, "selectedOption");

  const result = convertToUniqueTagArrays(tags);
  // console.log(result); // [["Alex"], ["Mia"]]

  const handleSubmit = async () => {
    // Validate required fields
    // if (!mealName || !description || !selectedLocation || !restaurant || !rating) {
    //   Alert.alert('Error', 'Please fill all required fields');
    //   return;
    // }

    const formData = new FormData();

    // Add all form fields
    // formData.append("user_name", result);
    formData.append("meal_name", mealName);
    formData.append("description", description);
    formData.append("have_it", selectedOption === "Restaurant" ? "1" : "2");
    formData.append("food_type", selectedOptionFood);
    formData.append("location", selectedLocation);
    formData.append("rating", rating);
    formData.append("restaurant_name", restaurant);
    // Add tags to FormData
    tags.forEach((tag, index) => {
      formData.append(`tagged[${index}]`, result);
    });

    // Or alternative approach for JSON
    // formData.append("tagged", JSON.stringify(tags));

    // Add images
    image.forEach((image, index) => {
      formData.append(`images[${index}]`, {
        uri: image.uri,
        name: image.fileName || `image_${Date.now()}_${index}.jpg`,
        type: image.mimeType || "image/jpeg",
      });
    });

    // console.log(formData);

    try {
      const res = await createPost(formData).unwrap();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <View style={tw`px-4 pt-4 flex-1 bg-white`}>
        <Text style={tw`text-xl font-bold my-3 text-textPrimary`}>
          Share your meal
        </Text>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={tw`pb-4`}
        >
          <View style={tw`flex-col  gap-2`}>
            {/* Meal Name Input */}
            <View style={tw`flex-col gap-2`}>
              <Text style={tw`text-base font-semibold text-textPrimary`}>
                Meal Name
              </Text>
              <View style={tw`bg-[#F3F3F3] rounded-md`}>
                <TextInput
                  placeholder="What's the name of your dish/drink?"
                  style={tw`px-4 py-3 text-textPrimary`}
                  placeholderTextColor="#888888"
                  onChangeText={(text) => setMealName(text)}
                  value={mealName}
                  selectionColor="#888888"
                />
              </View>
            </View>

            {/* Location Type Selector */}
            <SelectRadioButton
              setSelectedOption={setSelectedOption}
              selectedOption={selectedOption}
              selectedOptionFood={selectedOptionFood}
              setSelectedOptionFood={setSelectedOptionFood}
              setRestaurant={setRestaurant}
            />

            {/* Location Input (Conditional) */}
            {selectedOption !== "2" && (
              <Location setSelectedLocation={setSelectedLocation} />
            )}

            {/* Description/Recipe Input */}
            <View style={tw`flex-col gap-2`}>
              <Text style={tw`text-base font-semibold text-textPrimary`}>
                {selectedOption === "2" ? "Recipe" : "Description"}
              </Text>
              <View style={tw`bg-[#F3F3F3] rounded-lg h-30`}>
                <TextInput
                  style={tw`p-4 text-textPrimary h-full text-left`}
                  placeholder="What did you think of it? How was the experience?"
                  multiline
                  numberOfLines={6}
                  textAlignVertical="top"
                  placeholderTextColor="#888888"
                  onChangeText={(text) => setDescription(text)}
                  value={description}
                  selectionColor="#888888"
                />
              </View>
            </View>

            {/* Rating (Conditional) */}
            {selectedOption !== "home-made" && (
              <UserRating
                hover={hover}
                setHover={setHover}
                setRating={setRating}
                rating={rating}
              />
            )}

            {/* Tag Management */}
            <TagManager
              tags={tags}
              setTags={setTags}
              newTag={userName}
              setNewTag={setuserName}
            />

            {image && (
              <TouchableOpacity
                style={tw`w-20`}
                onPress={() => setModalVisible(true)}
              >
                <Text style={tw`text-sm text-orange font-inter-600`}>
                  View Image
                </Text>
              </TouchableOpacity>
            )}

            {/* Photo and People Tagging */}
            <View style={tw`flex-row justify-evenly items-center`}>
              <AddPhoto
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                setImage={setImage}
              />
              <TagPepoleView
                setuserName={setuserName}
                isVisible={isVisible}
                setIsVisible={setIsVisible}
              />
            </View>

            {/* Submit Button */}
            <View style={tw` items-center justify-center flex-row mt-4.5   `}>
              <TouchableOpacity
                onPress={handleSubmit}
                style={tw` items-center justify-center flex-row bg-orange px-9 py-3 rounded-full `}
              >
                <Text
                  style={tw`  text-white  flex items-center justify-center font-bold text-[16px]   `}
                >
                  Post
                </Text>
              </TouchableOpacity>
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
    backgroundColor: "#FDFFFE",
  },
});

export default Post;
