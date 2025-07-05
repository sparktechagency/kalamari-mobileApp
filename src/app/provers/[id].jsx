import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { router } from "expo-router";
import { useState } from "react";
import ProfileAlert from "../../components/ui/ProfileAlert";
import tw from "../../lib/tailwind";

// const countries = [
//   { code: "US", name: "United States", dial_code: "+1", flag: "🇺🇸" },
//   { code: "BD", name: "Bangladesh", dial_code: "+880", flag: "🇧🇩" },
//   { code: "IN", name: "India", dial_code: "+91", flag: "🇮🇳" },
//   { code: "GB", name: "United Kingdom", dial_code: "+44", flag: "🇬🇧" },
//   { code: "CA", name: "Canada", dial_code: "+1", flag: "🇨🇦" },
// ];

const ViewDeatils = () => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  // const [phoneNumber, setPhoneNumber] = useState("");
  // const [error, setError] = useState("");
  // const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  // const [modalVisible, setModalVisible] = useState(false);

  // const validatePhoneNumber = (number) => {
  //   // Check if number length >= 6 and <= 14 for demo purposes
  //   const digitsOnly = number.replace(/\D/g, "");
  //   return digitsOnly.length >= 6 && digitsOnly.length <= 14;
  // };
  const handleSubmit = () => {
    Alert.alert(
      "Success!",
      "Your data has been submitted.",
      [
        {
          text: "OK",
          // onPress: () => console.log("Alert closed"),
          style: "default",
        },
      ],
      { cancelable: true }
    );

    // hide dialog if needed
    setBio("");
    setName("");
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={tw` flex-1 bg-primaryBg `}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={tw`p-[4%] flex-1  `}>
            <View>
              <View style={tw`flex-row items-center gap-2  mb-12`}>
                <TouchableOpacity
                  onPress={() => {
                    router?.back();
                  }}
                >
                  <MaterialIcons
                    name="arrow-back-ios"
                    size={24}
                    color="black"
                  />
                </TouchableOpacity>
                <Text style={tw`text-5 text-[#121212] font-inter-700`}>
                  Edit
                </Text>
              </View>

              {/* user profile view alert  */}
              <View style={tw`items-center relative`}>
                <ProfileAlert />
              </View>
            </View>

            <View style={tw` flex-1 py-2  flex-col justify-between gap-6  `}>
              <View>
                {/* Name Input */}
                <View>
                  {/* Header and Form Fields */}
                  <Text style={tw`text-4 font-inter-700 mb-4 mt-10 `}>
                    Basic Information
                  </Text>
                </View>
                <View style={tw`mb-6`}>
                  <Text
                    style={tw`text-base text-[#121212] font-inter-600 mb-2`}
                  >
                    Full Name
                  </Text>
                  <View style={tw`bg-[#F3F3F3] rounded-md`}>
                    <TextInput
                      placeholder="Enter your name"
                      placeholderTextColor="#888"
                      selectionColor={"#888"}
                      style={tw`px-4 py-4.5 text-base`}
                      onChange={(value) => setName(value)}
                      value={name}
                    />
                  </View>
                </View>

                {/* Bio Input */}
                <View>
                  <Text
                    style={tw`text-base text-[#121212] font-inter-600 mb-2`}
                  >
                    Bio
                  </Text>
                  <View style={tw`bg-[#F3F3F3] rounded-md`}>
                    <TextInput
                      multiline
                      numberOfLines={6}
                      textAlignVertical="top"
                      placeholder="Write about yourself.."
                      placeholderTextColor="#888888"
                      style={tw`h-30 px-4 pt-4 text-base`}
                      onChange={(value) => setBio(value)}
                      value={bio}
                    />
                  </View>
                </View>
              </View>

              {/* Save Button */}
              <View style={tw``}>
                <Pressable
                  onPress={handleSubmit}
                  style={tw`bg-[#ED6237] w-full rounded-full items-center justify-center`}
                >
                  <Text style={tw`text-white py-3 font-medium text-lg`}>
                    Save Changes
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
          {/*  */}
          {/* <UserCamera /> */}
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

// export default ViewDeatils;
// import MaterialIcons from "@expo/vector-icons/MaterialIcons";
// import {
//   Alert,
//   FlatList,
//   KeyboardAvoidingView,
//   Modal,
//   Platform,
//   Pressable,
//   ScrollView,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   TouchableWithoutFeedback,
//   View,
// } from "react-native";

// import { router } from "expo-router";
// import { useState } from "react";
// import ProfileAlert from "../../components/ui/ProfileAlert";
// import tw from "../../lib/tailwind";

// const countries = [
//   { code: "US", name: "United States", dial_code: "+1", flag: "🇺🇸" },
//   { code: "BD", name: "Bangladesh", dial_code: "+880", flag: "🇧🇩" },
//   { code: "IN", name: "India", dial_code: "+91", flag: "🇮🇳" },
//   { code: "GB", name: "United Kingdom", dial_code: "+44", flag: "🇬🇧" },
//   { code: "CA", name: "Canada", dial_code: "+1", flag: "🇨🇦" },
// ];

// const ViewDeatils = () => {
//   const [name, setName] = useState("");
//   const [bio, setBio] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [error, setError] = useState("");
//   const [selectedCountry, setSelectedCountry] = useState(countries[0]);
//   const [modalVisible, setModalVisible] = useState(false);

//   const validatePhoneNumber = (number) => {
//     const digitsOnly = number.replace(/\D/g, "");
//     return digitsOnly.length >= 6 && digitsOnly.length <= 14;
//   };

//   const handleSubmit = () => {
//     if (!validatePhoneNumber(phoneNumber)) {
//       setError("Please enter a valid phone number.");
//       return;
//     }

//     setError(""); // Clear any existing error

//     Alert.alert("Success!", "Your data has been submitted.");

//     setBio("");
//     setName("");
//     setPhoneNumber("");
//   };

//   return (
//     <View style={tw`flex-1 bg-primaryBg`}>
//       <KeyboardAvoidingView
//         style={tw`flex-1`}
//         behavior={Platform.OS === "ios" ? "padding" : undefined}
//       >
//         <ScrollView
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={{ flexGrow: 1 }}
//           keyboardShouldPersistTaps="handled"
//         >
//           <View style={tw`p-[4%] flex-1`}>
//             <View>
//               <View style={tw`flex-row items-center gap-2 mb-6`}>
//                 <TouchableOpacity onPress={() => router?.back()}>
//                   <MaterialIcons
//                     name="arrow-back-ios"
//                     size={24}
//                     color="black"
//                   />
//                 </TouchableOpacity>
//                 <Text style={tw`text-5 text-[#121212] font-inter-700`}>
//                   Edit
//                 </Text>
//               </View>

//               <View style={tw`items-center relative`}>
//                 <ProfileAlert />
//               </View>
//             </View>

//             <View style={tw`flex-1 py-2 flex-col justify-between`}>
//               <View>
//                 <Text style={tw`text-4 font-inter-700 mb-4 mt-10`}>
//                   Basic Information
//                 </Text>

//                 {/* Name Input */}
//                 <View style={tw`mb-2`}>
//                   <Text
//                     style={tw`text-base text-[#121212] font-inter-600 mb-1`}
//                   >
//                     Full Name
//                   </Text>
//                   <View style={tw`bg-[#F3F3F3] rounded-md`}>
//                     <TextInput
//                       placeholder="Enter your name"
//                       placeholderTextColor="#888"
//                       selectionColor={"#888"}
//                       style={tw`px-4 py-3 text-base`}
//                       onChangeText={setName}
//                       value={name}
//                     />
//                   </View>
//                 </View>

//                 {/* Country Selector */}
//                 <Text style={tw`text-base text-[#121212] font-inter-600 my-2`}>
//                   Select Country
//                 </Text>
//                 <TouchableOpacity
//                   style={tw`flex-row items-center mb-2 bg-[#F3F3F3] rounded p-2`}
//                   onPress={() => setModalVisible(true)}
//                 >
//                   <Text style={tw`text-2xl mr-3`}>{selectedCountry.flag}</Text>
//                   <Text style={tw`text-base`}>
//                     {selectedCountry.name} ({selectedCountry.dial_code})
//                   </Text>
//                 </TouchableOpacity>

//                 {/* Phone Input */}
//                 <Text style={tw`text-base text-[#121212] font-inter-600 my-2`}>
//                   Phone Number
//                 </Text>
//                 <View
//                   style={tw`flex-row items-center bg-[#F3F3F3] rounded p-1 px-2 mb-2`}
//                 >
//                   <View style={tw`flex-row items-center gap-2`}>
//                     <Text style={tw`text-lg text-gray-800`}>
//                       {selectedCountry.dial_code}
//                     </Text>
//                     <View style={tw`h-6 w-px bg-gray-300 mx-2`} />
//                   </View>
//                   <TextInput
//                     style={tw`flex-1 text-base text-gray-900`}
//                     placeholder="Phone number"
//                     keyboardType="phone-pad"
//                     placeholderTextColor={"#888"}
//                     value={phoneNumber}
//                     onChangeText={(text) =>
//                       setPhoneNumber(text.replace(/[^0-9]/g, ""))
//                     }
//                     maxLength={14}
//                     selectionColor={"#888888"}
//                   />
//                 </View>

//                 {error ? (
//                   <Text style={tw`text-red-500 mb-2`}>{error}</Text>
//                 ) : null}

//                 {/* Bio Input */}
//                 <View>
//                   <Text
//                     style={tw`text-base text-[#121212] font-inter-600 my-2`}
//                   >
//                     Bio
//                   </Text>
//                   <View style={tw`bg-[#F3F3F3] rounded-md`}>
//                     <TextInput
//                       multiline
//                       numberOfLines={6}
//                       textAlignVertical="top"
//                       placeholder="Write about yourself.."
//                       placeholderTextColor="#888888"
//                       style={tw`h-30 px-4 pt-4 text-base`}
//                       onChangeText={setBio}
//                       value={bio}
//                     />
//                   </View>
//                 </View>
//               </View>

//               {/* Save Button */}
//               <View style={tw`mt-8`}>
//                 <Pressable
//                   onPress={handleSubmit}
//                   style={tw`bg-[#ED6237] w-full rounded-full items-center justify-center`}
//                 >
//                   <Text style={tw`text-white py-3 font-medium text-lg`}>
//                     Save Changes
//                   </Text>
//                 </Pressable>
//               </View>
//             </View>
//           </View>
//         </ScrollView>

//         {/* Country Picker Modal */}
//         <Modal visible={modalVisible} animationType="slide" transparent>
//           <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
//             <View style={tw`flex-1 `} />
//           </TouchableWithoutFeedback>

//           <View
//             style={tw`absolute bottom-0 left-0 right-0 bg-white shadow-2xl rounded-t-3xl p-5 max-h-96`}
//           >
//             <Text style={tw`text-xl font-bold mb-4`}>Select Country</Text>
//             <FlatList
//               data={countries}
//               keyExtractor={(item) => item.code}
//               keyboardShouldPersistTaps="handled"
//               showsVerticalScrollIndicator={false}
//               contentContainerStyle={tw`pb-6`}
//               renderItem={({ item }) => (
//                 <Pressable
//                   style={tw`flex-row items-center py-2`}
//                   onPress={() => {
//                     setSelectedCountry(item);
//                     setModalVisible(false);
//                   }}
//                 >
//                   <Text style={tw`text-2xl mr-4`}>{item.flag}</Text>
//                   <View>
//                     <Text style={tw`text-base font-semibold`}>{item.name}</Text>
//                     <Text style={tw`text-sm text-gray-500`}>
//                       {item.dial_code}
//                     </Text>
//                   </View>
//                 </Pressable>
//               )}
//               ItemSeparatorComponent={() => (
//                 <View style={tw`border-b border-gray-200`} />
//               )}
//             />

//             <TouchableOpacity
//               style={tw`mt-4 bg-orange  py-3 rounded-md items-center`}
//               onPress={() => setModalVisible(false)}
//             >
//               <Text style={tw` text-white`}>Cancel</Text>
//             </TouchableOpacity>
//           </View>
//         </Modal>
//       </KeyboardAvoidingView>
//     </View>
//   );
// };

export default ViewDeatils;
