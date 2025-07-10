import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AddPhoto from "../../../components/ui/AddPhoto";
import Location from "../../../components/ui/Location";
import SelectRadioButton from "../../../components/ui/SelectRadioButton";
import TagManager from "../../../components/ui/TagManager";
import TagPepoleView from "../../../components/ui/TagPepoleView";
import UserRating from "../../../components/ui/UserRating";
import tw from "../../../lib/tailwind";
import { useCreatePostMutation } from "../../../redux/postApi/postApi";
import { convertToUniqueTagArrays } from "../../../utils/convertToUniqueTagArrays";

const Post = () => {
  const [userName, setUserName] = useState("");
  const [mealName, setMealName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedOptionFood, setSelectedOptionFood] = useState("");
  const [restaurant, setRestaurant] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [rating, setRating] = useState("");
  const [tags, setTags] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [hover, setHover] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [image, setImage] = useState([]);

  const [createPost, { isLoading }] = useCreatePostMutation();

  // console.log("selectedLocation", selectedLocation);

  const uniqueTags = convertToUniqueTagArrays(tags); // [["Alex"], ["Mia"]]

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("meal_name", mealName);
      formData.append("description", description);
      formData.append("have_it", selectedOption === "Restaurant" ? "1" : "2");
      formData.append("food_type", selectedOptionFood);
      formData.append("location", selectedLocation || "");
      formData.append("rating", rating);
      formData.append("restaurant_name", restaurant);

      // Append tagged people
      uniqueTags.forEach((tag, index) => {
        formData.append(`tagged[${index}]`, tag[0]);
      });

      // Append images
      image.forEach((img, index) => {
        formData.append(`images[${index}]`, {
          uri: img.uri,
          name: img.fileName || `image_${Date.now()}_${index}.jpg`,
          type: img.mimeType || "image/jpeg",
        });
      });

      const res = await createPost(formData).unwrap();
      // console.log("res", res?);

      if (res?.status) {
        setUserName("");
        setMealName("");
        setDescription("");
        setSelectedOption("");
        setSelectedOptionFood("");
        setRestaurant("");
        setSelectedLocation(null);
        setRating("");
        setTags([]);
        setModalVisible(false);
        setHover("");
        setIsVisible(false);
        setImage([]);
      }

      // Optionally show toast or navigate
    } catch (error) {
      console.error("Post creation failed:", error);
    }
  };

  const showRating = selectedOption !== "home-made" && selectedOption !== "2";

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
          <View style={tw`flex-col gap-2`}>
            {/* Meal Name Input */}
            <View>
              <Text style={tw`text-base font-semibold text-textPrimary`}>
                Meal Name
              </Text>
              <View style={tw`bg-[#F3F3F3] rounded-md`}>
                <TextInput
                  placeholder="What's the name of your dish/drink?"
                  style={tw`px-4 py-3 text-textPrimary`}
                  placeholderTextColor="#888888"
                  value={mealName}
                  onChangeText={setMealName}
                  selectionColor="#888888"
                />
              </View>
            </View>

            {/* Location Type Selector */}
            <SelectRadioButton
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              selectedOptionFood={selectedOptionFood}
              setSelectedOptionFood={setSelectedOptionFood}
              setRestaurant={setRestaurant}
            />

            {/* Location Input */}
            {selectedOption !== "2" && (
              <Location setSelectedLocation={setSelectedLocation} />
            )}

            {/* Description / Recipe */}
            <View>
              <Text style={tw`text-base font-semibold text-textPrimary`}>
                {selectedOption === "2" ? "Recipe" : "Description"}
              </Text>
              <View style={tw`bg-[#F3F3F3] rounded-lg h-30`}>
                <TextInput
                  style={tw`p-4 text-textPrimary h-full`}
                  placeholder="What did you think of it? How was the experience?"
                  placeholderTextColor="#888888"
                  multiline
                  numberOfLines={6}
                  value={description}
                  onChangeText={setDescription}
                  textAlignVertical="top"
                  selectionColor="#888888"
                />
              </View>
            </View>

            {/* Rating */}
            {showRating && (
              <UserRating
                hover={hover}
                setHover={setHover}
                rating={rating}
                setRating={setRating}
              />
            )}

            {/* Tag Manager */}
            <TagManager
              tags={tags}
              setTags={setTags}
              newTag={userName}
              setNewTag={setUserName}
            />

            {image.length > 0 && (
              <TouchableOpacity
                style={tw`w-20`}
                onPress={() => setModalVisible(true)}
              >
                <Text style={tw`text-sm text-orange font-inter-600`}>
                  View Image
                </Text>
              </TouchableOpacity>
            )}

            {/* Add Photo and Tag People */}
            <View style={tw`flex-row justify-evenly items-center`}>
              <AddPhoto
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                setImage={setImage}
              />
              <TagPepoleView
                setuserName={setUserName}
                isVisible={isVisible}
                setIsVisible={setIsVisible}
              />
            </View>

            {/* Submit Button */}
            <View style={tw`items-center justify-center mt-5`}>
              <TouchableOpacity
                onPress={handleSubmit}
                disabled={isLoading}
                style={tw`bg-orange px-9 py-3 rounded-full ${
                  isLoading ? "opacity-60" : ""
                }`}
              >
                <Text style={tw`text-white font-bold text-[16px]`}>
                  {isLoading ? "Posting..." : "Post"}
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
