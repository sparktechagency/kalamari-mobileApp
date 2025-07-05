import { IconsChange } from "@/assets/Icon";
import { AntDesign, Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { Formik } from "formik";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";
import * as Yup from "yup";
import BackButton from "../../components/ui/BackButton";
import tw from "../../lib/tailwind";
import { useChangePasswordMutation } from "../../redux/apiSlices/authApiSlice";

//  Yup validation schema
const validationSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .required("Current password is required")
    .min(6, "Password must be at least 6 characters"),

  newPassword: Yup.string()
    .required("New password is required")
    .min(6, "Password must be at least 6 characters"),

  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
});

const ChangePassword = () => {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [change_password, { isLoading, reset }] = useChangePasswordMutation();

  const handleSubmit = async (values) => {
    const newPass = {
      current_password: values.currentPassword,
      password: values.newPassword,
      password_confirmation: values.newPassword,
    };

    try {
      const res = await change_password(newPass).unwrap();
      if (res?.status) {
        reset();
        Alert.alert(
          "Success",
          res?.message || "Password changed successfully."
        );

        router.push("/(drawer)/(tab)");
      }
    } catch (error) {
      Alert.alert("Error", error?.data?.message || "Something went wrong.");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Formik
        initialValues={{
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={tw` bg-primaryBg flex-1 `}>
            <BackButton
              onPress={() => {
                router?.back();
              }}
              title={"Change Password"}
            />
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ flexGrow: 1 }}
              keyboardShouldPersistTaps="handled"
            >
              <View style={tw`p-[4%]  flex-1    `}>
                {/* Back and Title */}
                {/* Image */}
                <View style={tw`items-center`}>
                  <SvgXml xml={IconsChange} />
                </View>

                <View style={tw` flex-col flex-1  justify-between`}>
                  {/* Inputs */}
                  <View style={tw`flex-col gap-4 mt-5`}>
                    {/* Current Password */}
                    <View style={tw`flex-col gap-2`}>
                      <Text style={tw`text-sm text-[#121212] font-inter-600 `}>
                        Current Password
                      </Text>
                      <View
                        style={tw`flex-row items-center bg-[#f3f3f3] rounded-2 px-4 py-2`}
                      >
                        <AntDesign
                          name="lock"
                          size={20}
                          style={tw`mr-2 text-[#888888]`}
                        />
                        <TextInput
                          secureTextEntry={!showCurrent}
                          style={tw`flex-1 text-base text-black`}
                          onChangeText={handleChange("currentPassword")}
                          onBlur={handleBlur("currentPassword")}
                          value={values.currentPassword}
                          placeholder="Old Password"
                          selectionColor={"#888"}
                        />
                        <Feather
                          onPress={() => setShowCurrent(!showCurrent)}
                          name={showCurrent ? "eye-off" : "eye"}
                          size={18}
                          style={tw`text-[#888888]`}
                        />
                      </View>
                      {touched.currentPassword && errors.currentPassword && (
                        <Text style={tw`text-red-500 mt-1 ml-2 text-xs`}>
                          {errors.currentPassword}
                        </Text>
                      )}
                    </View>

                    {/* New Password */}
                    <View style={tw`flex-col gap-2`}>
                      <Text style={tw`text-3.5 text-[#121212] font-inter-600 `}>
                        New Password
                      </Text>
                      <View
                        style={tw`flex-row items-center bg-[#f3f3f3] rounded-2 px-4 py-2`}
                      >
                        <AntDesign
                          name="lock"
                          size={20}
                          style={tw`mr-2 text-[#888888]`}
                        />
                        <TextInput
                          secureTextEntry={!showNew}
                          style={tw`flex-1 text-base text-black`}
                          onChangeText={handleChange("newPassword")}
                          onBlur={handleBlur("newPassword")}
                          value={values.newPassword}
                          placeholder="New Password"
                          selectionColor={"#888"}
                        />
                        <Feather
                          onPress={() => setShowNew(!showNew)}
                          name={showNew ? "eye-off" : "eye"}
                          size={18}
                          style={tw`text-[#888888]`}
                        />
                      </View>
                      {touched.newPassword && errors.newPassword && (
                        <Text style={tw`text-red-500 mt-1 ml-2 text-xs`}>
                          {errors.newPassword}
                        </Text>
                      )}
                    </View>

                    {/* Confirm Password */}
                    <View style={tw`flex-col gap-2`}>
                      <Text style={tw`text-sm text-[#121212] font-inter-600 `}>
                        Confirm Password
                      </Text>
                      <View
                        style={tw`flex-row items-center bg-[#f3f3f3] rounded-2 px-4 py-2`}
                      >
                        <AntDesign
                          name="lock"
                          size={20}
                          style={tw`mr-2 text-[#888888]`}
                        />
                        <TextInput
                          secureTextEntry={!showConfirm}
                          style={tw`flex-1 text-base text-black`}
                          onChangeText={handleChange("confirmPassword")}
                          onBlur={handleBlur("confirmPassword")}
                          value={values.confirmPassword}
                          placeholder="Confirm New Password"
                          selectionColor={"#888"}
                        />
                        <Feather
                          onPress={() => setShowConfirm(!showConfirm)}
                          name={showConfirm ? "eye-off" : "eye"}
                          size={18}
                          style={tw`text-[#888888]`}
                        />
                      </View>
                      {touched.confirmPassword && errors.confirmPassword && (
                        <Text style={tw`text-red-500 mt-1 ml-2 text-xs`}>
                          {errors.confirmPassword}
                        </Text>
                      )}
                    </View>
                  </View>

                  {/* Submit Button */}
                  <View style={tw``}>
                    <Pressable
                      onPress={handleSubmit}
                      // disabled={isSubmitting}
                      style={tw`items-center justify-center flex-row  bg-orange w-full rounded-full`}
                    >
                      <Text style={tw`text-white py-3 font-medium text-lg`}>
                        {isLoading ? (
                          <ActivityIndicator size="small" color="#ffff" />
                        ) : (
                          "Save Changes"
                        )}
                        {/* Save Changes */}
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default ChangePassword;
