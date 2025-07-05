import { FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { TouchableOpacity, View } from "react-native";
import tw from "../../lib/tailwind";

export default function UserProfileGallery({ image, setImage }) {
  // console.log(image);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result?.assets[0]);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <TouchableOpacity onPress={pickImage}>
      <View style={tw` mt-3.8 `}>
        <FontAwesome name="photo" size={40} color="#B0B0B0" />
      </View>
    </TouchableOpacity>
  );
}
