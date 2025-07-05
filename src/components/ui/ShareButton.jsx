import { IconSherd } from "@/assets/Icon";
import tw from "@/src/lib/tailwind";
import { Alert, Share, TouchableOpacity } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";

const ShareButton = () => {
  const onShare = async () => {
    try {
      await Share.share({
        message: "https://reactnative.dev/docs/touchableopacity",
      });
    } catch (error) {
      Alert.alert(error.message);
    }
  };
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <TouchableOpacity onPress={onShare} title="Share" style={tw``}>
          {/* <EvilIcons name="share-google" size={25} color="black" /> */}
          <SvgXml xml={IconSherd} />
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default ShareButton;
