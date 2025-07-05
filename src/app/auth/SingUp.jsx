import { Iconlock, IconMail, user } from "@/assets/Icon";
import Feather from "@expo/vector-icons/Feather";
import Checkbox from "expo-checkbox";
import { ImageBackground } from "expo-image";
import { router } from "expo-router";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";
import { useDebounce } from "use-debounce";
import * as Yup from "yup";
import tw from "../../lib/tailwind";
import {
  useSearchByUserEmailQuery,
  useSearchByUserNameQuery,
  useSignUpMutation,
} from "../../redux/apiSlices/authApiSlice";

//Validation Schema
const validationSchema = Yup.object().shape({
  fullname: Yup.string().required("Full name is required"),
  userName: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Minimum 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
  checkbox: Yup.boolean().oneOf([true], "You must accept terms"),
});

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [registerUser, { isLoading, isError, error }] = useSignUpMutation();

  const handleSubmit = async (values) => {
    // console.log("Submitted values:", values);
    // Call your API here
    // router.push("/auth/OTPVerifyTow");

    const userData = {
      full_name: values.fullname,
      user_name: values.userName,
      email: values.email,
      password: values.password,
      password_confirmation: values.confirmPassword,
    };

    // console.log("User Data:", userData);

    try {
      const response = await registerUser(userData).unwrap();
      // console.log("Registration successful", response);

      if (response.status) {
        Alert.alert("Registration Successful!", response.message);
        router.push("/auth/OTPVerifyTow");
      } else {
        Alert.alert(
          "Registration Failed",
          response.message || "Something went wrong."
        );
      }
    } catch (error) {
      // console.error("Registration Error:", error);
      Alert.alert(
        "Warning",
        error?.data?.message || "Something went wrong. Please try again."
      );
    }
  };

  const [userName, setUserName] = useState("");
  const [userNameError, setUserNameError] = useState("");

  const [debouncedSearch] = useDebounce(userName, 500);

  // API call (debounced username)
  const { data } = useSearchByUserNameQuery(
    { user_name: debouncedSearch },
    { skip: !debouncedSearch.trim() }
  );

  // React to result
  useEffect(() => {
    if (!debouncedSearch.trim()) {
      setUserNameError("");
      return;
    }

    if (data?.exists) {
      setUserNameError("Username already exists");
    } else {
      setUserNameError(""); // no error
    }

    if (isError) {
      setUserNameError("Something went wrong");
    }
  }, [data, debouncedSearch, isError]);

  // user email
  const [userEmail, setUserEmail] = useState("");
  const [userEmailError, setUserEmailError] = useState("");

  const [debouncedSearchEmail] = useDebounce(userEmail, 500);

  // API call (debounced email)
  const { data: newUserEmail, isError: emailError } = useSearchByUserEmailQuery(
    { user_email: debouncedSearchEmail },
    { skip: !debouncedSearchEmail.trim() }
  );

  // Effect to check and show error message
  useEffect(() => {
    if (!debouncedSearchEmail.trim()) {
      setUserEmailError("");
      return;
    }

    if (newUserEmail?.exist) {
      setUserEmailError("Email already exists");
    } else if (newUserEmail && !newUserEmail?.exist) {
      setUserEmailError(""); // No error if email doesn't exist
    }

    if (emailError) {
      setUserEmailError("Something went wrong");
    }
  }, [newUserEmail, debouncedSearchEmail, emailError]);

  // console.log("newUserEmail : ", newUserEmail);
  // console.log("userEmailError : ", userEmailError);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ImageBackground
        source={require("@/assets/images/Signupscreen.png")}
        style={tw`flex-1 `}
      >
        <ScrollView
          contentContainerStyle={tw`flex-grow justify-end`}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View
            style={[
              tw`bg-primaryBg rounded-t-3xl px-6 pt-4 pb-6`,
              {
                shadowOffset: { width: 0, height: -4 },
                shadowOpacity: 0.1,
                shadowRadius: 6,
                elevation: 10,
              },
            ]}
          >
            <Formik
              initialValues={{
                fullname: "",
                userName: "",
                email: "",
                password: "",
                confirmPassword: "",
                checkbox: false,
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
                setFieldValue,
              }) => (
                <View style={tw`gap-3`}>
                  <Text
                    style={tw`text-center text-2xl font-inter-700 text-textPrimary`}
                  >
                    Create an account
                  </Text>

                  {/* Full Name */}
                  <InputField
                    label="Full Name"
                    value={values.fullname}
                    onChange={handleChange("fullname")}
                    onBlur={handleBlur("fullname")}
                    touched={touched.fullname}
                    error={errors.fullname}
                    icon={user}
                    placeholder="Enter your full name"
                  />

                  {/* Username */}
                  <InputField
                    label="Username"
                    value={values.userName}
                    onChange={(e) => {
                      handleChange("userName")(e); // Formik's handler
                      setUserName(e); // Real-time check
                    }}
                    onBlur={handleBlur("userName")}
                    touched={touched.userName}
                    error={errors.userName}
                    icon={user}
                    placeholder="Choose a username"
                  />

                  {data?.exist && (
                    <Text style={tw`text-[#ED6237]`}>{data?.message}</Text>
                  )}

                  {/* Email */}
                  <InputField
                    label="Email"
                    value={values.email}
                    // onChange={handleChange("email")}
                    onChange={(e) => {
                      handleChange("email")(e); // Formik's handler
                      setUserEmail(e); // Real-time check
                    }}
                    onBlur={handleBlur("email")}
                    touched={touched.email}
                    error={errors.email}
                    icon={IconMail}
                    placeholder="Enter your email"
                  />
                  {newUserEmail?.exist && (
                    <Text style={tw`text-[#ED6237]`}>
                      {newUserEmail?.message}
                    </Text>
                  )}

                  {/* Password */}
                  <InputField
                    label="Password"
                    value={values.password}
                    onChange={handleChange("password")}
                    onBlur={handleBlur("password")}
                    touched={touched.password}
                    error={errors.password}
                    icon={Iconlock}
                    placeholder="Enter password"
                    secureTextEntry={!showPassword}
                    toggleIcon={
                      <Feather
                        name={showPassword ? "eye-off" : "eye"}
                        size={18}
                        color="#888"
                        onPress={() => setShowPassword(!showPassword)}
                      />
                    }
                  />

                  {/* Confirm Password */}
                  <InputField
                    label="Confirm Password"
                    value={values.confirmPassword}
                    onChange={handleChange("confirmPassword")}
                    onBlur={handleBlur("confirmPassword")}
                    touched={touched.confirmPassword}
                    error={errors.confirmPassword}
                    icon={Iconlock}
                    placeholder="Re-enter password"
                    secureTextEntry={!showConfirm}
                    toggleIcon={
                      <Feather
                        name={showConfirm ? "eye-off" : "eye"}
                        size={18}
                        color="#888"
                        onPress={() => setShowConfirm(!showConfirm)}
                      />
                    }
                  />

                  {/* Checkbox */}
                  <View style={tw`flex-row items-start mt-2`}>
                    <Checkbox
                      value={values.checkbox}
                      onValueChange={(val) => setFieldValue("checkbox", val)}
                      color="#ED6237"
                      style={tw`mt-1 mr-2 w-4 h-4`}
                    />
                    <Text style={tw`text-sm text-[#888] flex-1`}>
                      By creating this account, you agree to the
                      <Text style={tw`text-[#ED6237]`}> Terms of Use </Text>
                      and
                      <Text style={tw`text-[#ED6237]`}> Privacy Policy</Text>.
                    </Text>
                  </View>
                  {touched.checkbox && errors.checkbox && (
                    <Text style={tw`text-red-500 text-sm mt-1`}>
                      {errors.checkbox}
                    </Text>
                  )}

                  {/* Submit */}
                  <TouchableOpacity
                    onPress={handleSubmit}
                    // onPress={() => router.push("/auth/OTPVerifyTow")}
                    disabled={isLoading}
                    style={tw`mt-4 bg-[#ED6237] py-4 rounded-full`}
                  >
                    {isLoading ? (
                      <ActivityIndicator size="small" color="#ffff" />
                    ) : (
                      <Text
                        style={tw`text-white text-center text-lg font-inter-600`}
                      >
                        Register
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>
              )}
            </Formik>

            {/* Our Mission */}
            <View style={tw`items-center mt-6`}>
              <TouchableOpacity onPress={() => router.push("(drawer)/Mission")}>
                <Text style={tw`text-orange underline font-inter-600`}>
                  Our Mission
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

// ✅ Reusable Input Field Component
const InputField = ({
  label,
  value,
  onChange,
  onBlur,
  touched,
  error,
  icon,
  placeholder,
  secureTextEntry,
  toggleIcon,
}) => (
  <View>
    <Text style={tw`text-base text-[#121212] font-inter-500 mb-1`}>
      {label}
    </Text>
    <View style={tw`flex-row items-center bg-[#F3F3F3] px-4 py-2 rounded-md`}>
      <SvgXml xml={icon} />
      <TextInput
        style={tw`flex-1 text-base text-black ml-2`}
        value={value}
        onChangeText={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        placeholderTextColor="#888"
        selectionColor="#888"
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
      />
      {toggleIcon && toggleIcon}
    </View>
    {touched && error && (
      <Text style={tw`text-red-500 text-sm mt-1`}>{error}</Text>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
