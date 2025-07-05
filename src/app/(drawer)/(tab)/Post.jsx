import { useState } from "react";
import {
  Alert,
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
import { useShareMealMutation } from "../../../redux/postApi/postApi";

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
  const [image, setImage] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [hover, setHover] = useState("");
  const [userPostData, { isLoading }] = useShareMealMutation();

  const handleSubmit = async () => {
    // Create FormData object
    const formData = new FormData();

    // Append simple fields
    formData.append("meal_name", "Text"); // minimal 2 characters, required
    formData.append("have_it", "1"); // required (1 for Restaurant, 2 for Home-made)
    formData.append("restaurant_name", "Restaurant_name"); // nullable
    formData.append("food_type", "Meal"); // required
    formData.append("location", "Asthuliya"); // nullable
    formData.append("description", "Wow very nice and testy."); // required
    formData.append("rating", "4"); // nullable

    // Append tags as a JSON string array
    const hardcodedTags = ["tag 1", "tag 2", "tag 3"];
    formData.append("tagged", JSON.stringify(hardcodedTags));

    // Append images as separate form fields with the same name
    const hardcodedImages = [
      {
        uri: "file://path/to/image1.jpg",
        type: "image/jpeg",
        name: "image1.jpg",
      },
      {
        uri: "file://path/to/image2.jpg",
        type: "image/jpeg",
        name: "image2.jpg",
      },
      {
        uri: "file://path/to/image3.jpg",
        type: "image/jpeg",
        name: "image3.jpg",
      },
    ];

    // Append each image with the same key 'images[]'
    hardcodedImages.forEach((img) => {
      formData.append("images[]", img);
    });

    // Log the FormData entries for debugging
    const entries = Array.from(formData.entries());
    for (let [key, value] of entries) {
      console.log(`${key}:`, value);
    }

    try {
      const response = await userPostData(formData).unwrap();
      console.log("API response:", response);
      Alert.alert("Success", "Your meal has been shared successfully!");
    } catch (error) {
      console.error("Submit failed:", error);
      Alert.alert("Warning", "Failed to share your meal. Please try again.");
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
            {selectedOption !== "home-made" && (
              <Location setSelectedLocation={setSelectedLocation} />
            )}

            {/* Description/Recipe Input */}
            <View style={tw`flex-col gap-2`}>
              <Text style={tw`text-base font-semibold text-textPrimary`}>
                {selectedOption === "home-made" ? "Recipe" : "Description"}
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

            {!!image && (
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

            <View style={tw`flex-row  items-center justify-around`}>
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
