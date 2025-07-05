import { Iconlock } from "@/assets/Icon";
import Feather from "@expo/vector-icons/Feather";
import { router } from "expo-router";
import { Formik } from "formik";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";
import * as Yup from "yup";
import AuthHeading from "../../components/ui/AuthHeading";
import tw from "../../lib/tailwind";
import { useChangePasswordMutation } from "../../redux/apiSlices/authApiSlice";

// Yup validation schema
const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [updatedUserPassword, { isLoading }] = useChangePasswordMutation();

  const handleFormSubmit = async (values) => {
    // user all data
    const updatedePass = {
      password: values.password,
      password_confirmation: values.confirmPassword,
    };

    try {
      const res = await updatedUserPassword(updatedePass).unwrap();
      // console.log(res);

      if (res?.status) {
        router.push("/(tab)");
      }
    } catch (error) {
      // console.log(error?.message?.password);

      Alert.alert(
        "Change Password Failed",
        error?.message || "Something went wrong. Please try again."
      );
    }

    // Normally you would send API request here
    // Alert.alert("Password Updated", error?.message?.password);
    // router.push("/(tab)");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View
        style={tw` p-[4%] bg-[#FDFFFE] flex-1 justify-center overflow-hidden`}
      >
        <SafeAreaView>
          <View style={tw`dark:bg-black flex-col  `}>
            {/*  */}
            <AuthHeading
              Heading={"Reset your password"}
              SubHeading={"You have to create new password to continue"}
            />

            <Formik
              initialValues={{ password: "", confirmPassword: "" }}
              validationSchema={ResetPasswordSchema}
              onSubmit={handleFormSubmit}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <>
                  {/* Password Input */}
                  <View style={tw`w-full flex-col gap-2`}>
                    <Text style={tw`text-4 text-[#121212] font-semibold`}>
                      Password
                    </Text>
                    <View
                      style={tw`flex-row items-center bg-[#F3F3F3] rounded-md px-4 py-2`}
                    >
                      <SvgXml xml={Iconlock} />

                      <TextInput
                        style={tw`flex-1 text-base text-black dark:text-white`}
                        secureTextEntry={!showPassword}
                        onChangeText={handleChange("password")}
                        onBlur={handleBlur("password")}
                        value={values.password}
                        placeholderTextColor="#888"
                        selectionColor={"#888"}
                        placeholder="Enter new password"
                      />
                      <Feather
                        name={showPassword ? "eye-off" : "eye"}
                        size={18}
                        color="black"
                        style={tw`ml-2 text-[#888888]`}
                        onPress={() => setShowPassword(!showPassword)}
                      />
                    </View>
                    {touched.password && errors.password && (
                      <Text style={tw`text-red-500`}>{errors.password}</Text>
                    )}
                  </View>

                  {/* Confirm Password Input */}
                  <View style={tw`w-full flex-col gap-2 mt-4`}>
                    <Text style={tw`text-4 text-[#121212] font-semibold`}>
                      Confirm Password
                    </Text>
                    <View
                      style={tw`flex-row items-center bg-[#F3F3F3] rounded-md px-4 py-2`}
                    >
                      <SvgXml xml={Iconlock} />
                      <TextInput
                        style={tw`flex-1 text-base text-black dark:text-white`}
                        secureTextEntry={!showConfirmPassword}
                        onChangeText={handleChange("confirmPassword")}
                        onBlur={handleBlur("confirmPassword")}
                        value={values.confirmPassword}
                        placeholderTextColor="#888"
                        selectionColor={"#888"}
                        placeholder="Confirm new password"
                      />
                      <Feather
                        name={showConfirmPassword ? "eye-off" : "eye"}
                        size={18}
                        color="black"
                        style={tw`ml-2 text-[#888888]`}
                        onPress={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      />
                    </View>
                    {touched.confirmPassword && errors.confirmPassword && (
                      <Text style={tw`text-red-500`}>
                        {errors.confirmPassword}
                      </Text>
                    )}
                  </View>

                  {/* Submit Button */}
                  {/* <View style={tw`w-full mt-10 rounded-full bg-[#ED6237]`}>
                    <TouchableOpacity onPress={handleSubmit} style={tw`py-4`}>
                      <Text style={tw`text-center text-white text-xl`}>
                        Update
                      </Text>
                    </TouchableOpacity>
                  </View> */}

                  {/* Submit Button */}
                  <TouchableOpacity
                    onPress={handleSubmit}
                    style={tw`mt-6 bg-[#F15A29] p-4 rounded-full`}
                  >
                    {isLoading ? (
                      <ActivityIndicator size="small" color="#ffff" />
                    ) : (
                      <Text
                        style={tw`text-white text-center text-lg font-inter-600`}
                      >
                        Update
                      </Text>
                    )}
                  </TouchableOpacity>
                </>
              )}
            </Formik>
          </View>
        </SafeAreaView>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
