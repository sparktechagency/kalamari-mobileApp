import { Alert, Text, TouchableOpacity, View } from "react-native";
import tw from "../../lib/tailwind";
import { useResendOTPMutation } from "../../redux/apiSlices/authApiSlice";

const ResendEmail = () => {
  const [userEmail, { isLoading }] = useResendOTPMutation();

  const handleResendEmail = async (value) => {
    const email = "tanvirislam.dev3912@gmail.com";

    try {
      const res = await userEmail({ email }).unwrap();
      console.log(res?.message);

      if (res?.status) {
        Alert.alert("Success", res?.message);
      } else {
        Alert.alert("Failed", res?.message || "Something went wrong");
      }
    } catch (error) {
      console.error("OTP Email Error:", error);
      Alert.alert("Error", error?.message || "Something went wrong");
    }
  };

  return (
    <View style={tw``}>
      <TouchableOpacity onPress={handleResendEmail}>
        <Text style={tw`text-[#ED6237] text-sm font-inter-700 underline `}>
          Send again?
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ResendEmail;
