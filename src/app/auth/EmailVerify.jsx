import { Fontisto } from "@expo/vector-icons";
import { router } from "expo-router";
import { Formik } from "formik";
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
import * as Yup from "yup";
import AuthHeading from "../../components/ui/AuthHeading";
import tw from "../../lib/tailwind";
import { useForgetPasswordMutation } from "../../redux/apiSlices/authApiSlice";

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

const EmailVerify = () => {
  // const [email, setEmail] = useState("");

  const [resetEmail, { isLoading }] = useForgetPasswordMutation();

  const handleFormSubmit = async (values) => {
    try {
      // send user eamil
      const res = await resetEmail({ email: values.email }).unwrap();

      // user data all ok
      if (res?.status) {
        Alert.alert("Success", res?.message);
        router.push("/auth/OTPOne");
      } else {
        Alert.alert("Failed", res?.message || "Something went wrong");
      }
    } catch (error) {
      // console.error("OTP Email Error:", error);
      Alert.alert("Error", error?.message || "Something went wrong");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={tw`p-[4%] bg-[#FDFFFE] flex-1 justify-center `}>
        <SafeAreaView style={tw` dark:bg-black flex-col items-center `}>
          {/*  */}

          <AuthHeading
            Heading={"Forgot password"}
            SubHeading={" Enter your email address to reset your password"}
          />

          <Formik
            initialValues={{ email: "" }}
            validationSchema={ForgotPasswordSchema}
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
                {/* Email input */}
                <View style={tw`mt-2 w-full flex-col gap-2`}>
                  <Text style={tw`text-lg font-medium`}>Email</Text>
                  <View
                    style={tw`flex-row justify-between items-center bg-[#F3F3F3] rounded-md px-4 py-2`}
                  >
                    <Fontisto
                      name="email"
                      size={20}
                      color="black"
                      style={tw`mr-2 text-[#888888]`}
                    />
                    <TextInput
                      style={tw`flex-1 text-base text-black dark:text-white`}
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      value={values.email}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      placeholderTextColor="#888"
                      selectionColor={"#888"}
                      placeholder="Enter your email"
                      // onChange={(text) => setEmail(text)}
                    />
                  </View>
                  {touched.email && errors.email && (
                    <Text style={tw`text-red-500`}>{errors.email}</Text>
                  )}
                </View>

                {/* Submit button */}
                <View
                  style={tw`w-full flex-col gap-4 mt-10 rounded-full bg-[#ED6237]`}
                >
                  <TouchableOpacity onPress={handleSubmit} style={tw`py-4`}>
                    <Text style={tw`text-center text-white text-xl`}>
                      {isLoading ? (
                        <ActivityIndicator size="small" color="#ffff" />
                      ) : (
                        "Submit"
                      )}
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
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

export default EmailVerify;
