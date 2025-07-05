import { Text, View } from "react-native";
import { ActivityIndicator } from "react-native-web";
import tw from "../../lib/tailwind";

const LoadingButton = ({ isLoading, title }) => {
  return (
    <View>
      {isLoading ? (
        <ActivityIndicator size="small" color="#ffff" />
      ) : (
        <Text style={tw`text-white text-center text-lg font-inter-600`}>
          {title}
        </Text>
      )}
    </View>
  );
};

export default LoadingButton;
