import { Iconlock, IconMail } from "@/assets/Icon";
import tw from "@/src/lib/tailwind";
import Feather from "@expo/vector-icons/Feather";
import Checkbox from "expo-checkbox";
import { Link, router } from "expo-router";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ImageBackground,
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
import * as Yup from "yup";
import { useLoginMutation } from "../../redux/apiSlices/authApiSlice";
import { storage } from "../../utils/storage";

// ✅ Validation Schema
const validation = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Minimum 6 characters")
    .required("Password is required"),
});

export default function Index() {
  const [showPassword, setShowPassword] = useState(false);

  const [userLogin, { isLoading }] = useLoginMutation();

  useEffect(() => {
    const checkToken = async () => {
      const token = storage.getString("token");

      if (token) {
        router.replace("/(tab)"); // Main tab/home screen
      }

      // setLoading(false);
    };

    checkToken();
  }, []);
  const handleLogin = async (values) => {
    // Here you'd normally call your API or auth logic
    // console.log("Login values:", values);

    const userData = {
      email: values?.email,
      password: values?.password,
    };

    // console.log(userData);

    try {
      const response = await userLogin(userData).unwrap();
      // console.log("api response ", response);

      if (response?.token) {
        await storage.set("token", response?.token);
        await storage.set("user", JSON.stringify(response?.user));
        // console.log("login_user : ", login_user, response.user);
        // Alert.alert("Success", response?.message);
        router.push("/(tab)");
      }
    } catch (error) {
      console.log(error);
    }

    // router.push("(tab)");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ImageBackground
        source={require("@/assets/images/Loginscreen.png")}
        resizeMode="cover"
        style={tw`flex-1 justify-end`}
      >
        <View style={tw`flex-1 justify-end`}>
          <View style={tw`bg-primaryBg rounded-t-3xl px-4 pt-6 pb-10`}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                  checkbox: false,
                  createdOn: new Date(),
                }}
                validationSchema={validation}
                onSubmit={handleLogin}
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
                  <View style={tw`gap-4`}>
                    <Text style={tw`text-xl font-bold text-black text-center`}>
                      Welcome back!
                    </Text>
                    <Text style={tw`text-sm text-[#888] text-center mb-2`}>
                      Please sign in to continue.
                    </Text>

                    {/* Email */}
                    <Text style={tw`text-sm font-semibold text-[#121212]`}>
                      Email
                    </Text>
                    <View
                      style={tw`flex-row items-center bg-[#F3F3F3] px-4 py-3 rounded-md`}
                    >
                      <SvgXml xml={IconMail} />
                      <TextInput
                        style={tw`flex-1 text-base text-black ml-2`}
                        placeholder="Enter your email"
                        placeholderTextColor="#888"
                        selectionColor="#888"
                        onChangeText={handleChange("email")}
                        onBlur={handleBlur("email")}
                        value={values.email}
                        keyboardType="email-address"
                        autoCapitalize="none"
                      />
                    </View>
                    {touched.email && errors.email && (
                      <Text style={tw`text-red-500 text-sm`}>
                        {errors.email}
                      </Text>
                    )}

                    {/* Password */}
                    <Text style={tw`text-sm font-semibold text-[#121212]`}>
                      Password
                    </Text>
                    <View
                      style={tw`flex-row items-center bg-[#F3F3F3] px-4 py-3 rounded-md`}
                    >
                      <SvgXml xml={Iconlock} />
                      <TextInput
                        style={tw`flex-1 text-base text-black ml-2`}
                        placeholder="Enter your password"
                        placeholderTextColor="#888"
                        selectionColor="#888"
                        secureTextEntry={!showPassword}
                        onChangeText={handleChange("password")}
                        onBlur={handleBlur("password")}
                        value={values.password}
                      />
                      <Feather
                        name={showPassword ? "eye-off" : "eye"}
                        size={18}
                        color="#888"
                        onPress={() => setShowPassword((prev) => !prev)}
                      />
                    </View>
                    {touched.password && errors.password && (
                      <Text style={tw`text-red-500 text-sm`}>
                        {errors.password}
                      </Text>
                    )}

                    {/* Checkbox & Forgot Password */}
                    <View
                      style={tw`flex-row justify-between items-center mt-1`}
                    >
                      <View style={tw`flex-row items-center`}>
                        <Checkbox
                          value={values.checkbox}
                          onValueChange={(val) =>
                            setFieldValue("checkbox", val)
                          }
                          color="#B0B0B0"
                          style={{ width: 16, height: 16 }}
                        />
                        <Text style={tw`text-[#888888] text-sm ml-2`}>
                          Remember me
                        </Text>
                      </View>
                      <Link
                        href="auth/EmailVerify"
                        style={tw`text-[#E25C44] underline font-inter-600 text-xs`}
                      >
                        Forgot password?
                      </Link>
                    </View>

                    {/* Sign In Button */}
                    <TouchableOpacity
                      onPress={handleSubmit}
                      // onPress={() => router.push("/(tab)")}
                      disabled={isLoading}
                      style={tw`mt-6 bg-[#F15A29] p-4 rounded-full`}
                    >
                      {isLoading ? (
                        <ActivityIndicator size="small" color="#ffff" />
                      ) : (
                        <Text
                          style={tw`text-white text-center text-lg font-inter-600`}
                        >
                          Sign in
                        </Text>
                      )}
                    </TouchableOpacity>

                    {/* Sign Up Link */}
                    <Text style={tw`text-center text-[#121212] mt-4`}>
                      Don’t have an account?{" "}
                      <Link
                        href="/auth/SingUp"
                        style={tw`text-[#ED6237] underline`}
                      >
                        Sign up
                      </Link>
                    </Text>
                  </View>
                )}
              </Formik>
            </ScrollView>
          </View>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
