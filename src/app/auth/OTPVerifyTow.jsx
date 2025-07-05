import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { OtpInput } from "react-native-otp-entry";
import AuthHeading from "../../components/ui/AuthHeading";
import ResendEmail from "../../components/ui/ResendEmail";
import tw from "../../lib/tailwind";
import { useVerifyOTPMutation } from "../../redux/apiSlices/authApiSlice";
import { storage } from "../../utils/storage";

const OTPVerifyTow = () => {
  const [otpVerify, setOtpVerify] = useState("");

  const [verifyotp, { isLoading }] = useVerifyOTPMutation();

  const handleNavigate = async () => {
    try {
      if (!otpVerify || otpVerify.length === 0) {
        Alert.alert("OTP Required", "Please enter the OTP to proceed.");
        return;
      }

      // console.log("Verifying OTP:", otpVerify);

      const response = await verifyotp({ otp: otpVerify }).unwrap();

      if (response?.access_token) {
        // await AsyncStorage.setItem("token", response?.access_token);

        await storage.set("token", response?.access_token);

        Alert.alert("Success", "OTP Verified Successfully!");
        router.push("/(tab)"); // or your desired route
      } else {
        Alert.alert("Verification Failed", "Invalid response from server.");
      }
    } catch (error) {
      // console.error("OTP verification error:", error);

      Alert.alert(
        "OTP Verification Failed",
        error?.data?.message || "Something went wrong. Please try again."
      );
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={tw`bg-[#FDFFFE] justify-center h-full p-[4%]`}>
        <SafeAreaView>
          <View style={tw`flex flex-col `}>
            {/*   */}
            <AuthHeading
              Heading={"Verify OTP"}
              SubHeading={"We have sent a six digit code to your email"}
            />
            <View style={tw`flex flex-col gap-2 justify-end items-end `}>
              <OtpInput
                style={tw`bg-[#F3F3F3]`}
                focusColor="black"
                placeholder="000000"
                numberOfDigits={6}
                type="numeric"
                onFilled={(text) => setOtpVerify(text)}
                textInputProps={{
                  accessibilityLabel: "One-Time Password",
                }}
                textProps={{
                  accessibilityRole: "text",
                  accessibilityLabel: "OTP digit",
                  allowFontScaling: false,
                }}
              />
              {/* navigation */}
              <ResendEmail />
            </View>

            <View style={tw`w-full flex-col rounded-full bg-[#ED6237] mt-10 `}>
              <TouchableOpacity
                disabled={isLoading}
                onPress={handleNavigate}
                style={tw`py-4`}
              >
                {isLoading ? (
                  <ActivityIndicator size="small" color="#ffff" />
                ) : (
                  <Text
                    style={tw`text-white text-center text-lg font-inter-600`}
                  >
                    Verify
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </View>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default OTPVerifyTow;
