import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { ActivityIndicator, Image, View } from "react-native";

import { useRouter } from "expo-router";
import { useEffect } from "react";
import tw from "../lib/tailwind";

SplashScreen.preventAutoHideAsync(); // Prevent Expo's splash screen from auto-hiding

export default function App() {
  const route = useRouter();

  useEffect(() => {
    Font.loadAsync({
      InterBlack: require("@/assets/fonts/Inter_18pt-Black.ttf"),
      InterBold: require("@/assets/fonts/Inter_18pt-Bold.ttf"),
      InterSemiBold: require("@/assets/fonts/Inter_28pt-SemiBold.ttf"),
      InterLight: require("@/assets/fonts/Inter_24pt-Light.ttf"),
      InterRegular: require("@/assets/fonts/Inter_18pt-Regular.ttf"),
      InterMedium: require("@/assets/fonts/Inter_28pt-Medium.ttf"),
      RubikBold: require("@/assets/fonts/Rubik-Bold.ttf"),
      RubikExtraBold: require("@/assets/fonts/Rubik-ExtraBold.ttf"),
    });
    SplashScreen.hideAsync();
    setTimeout(() => {
      // route?.dismissAll()
      // route?.replace("/map");
      route?.replace("/auth");
      // route?.replace("/");
    }, 1000);
  }, [route]);

  return (
    <View style={tw`flex-1 bg-primaryBg `}>
      {/* Logo Container */}
      <View style={tw`flex-1 justify-center items-center pt-20`}>
        <View style={tw`items-center mb-8`}>
          <Image
            source={require("@/assets/images/group-s.png")}
            style={tw`w-96 h-20`}
            resizeMode="contain"
          />
        </View>
        {/*  */}
      </View>
      <View>
        <ActivityIndicator size="large" color="#ED6237" style={tw`mb-16`} />
      </View>

      {/* Loader */}
    </View>
    // <View style={tw`flex-1 justify-center items-center bg-primaryBg pb-[25%]`}>
    //   <View style={tw`   flex-1 justify-center flex items-end`}>
    //     {/* Logo and Title */}
    //     <View style={tw`justify-center items-center`}>
    //       <View style={tw`flex-row items-center gap-1.5`}>
    //         <Image
    //           source={require("@/assets/images/appIcons.png")}
    //           style={tw`w-16 h-16`}
    //         />
    //         <Text style={tw`text-10.5 font-inter-700 text-[#141A47]`}>
    //           Kalamari
    //         </Text>
    //       </View>
    //       <View style={tw` relative`}>
    //         <Text
    //           style={tw`text-sm   flex-1 absolute  font-inter-500 text-textgray mt-1`}
    //         >
    //           Share your taste.
    //         </Text>
    //       </View>
    //     </View>
    //   </View>

    //   {/* Loader */}
    //   <ActivityIndicator
    //     size="large"
    //     color="#ED6237"
    //     style={tw`absolute bottom-16`}
    //   />
    // </View>
  );
}
