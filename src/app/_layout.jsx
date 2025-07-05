import { Stack } from "expo-router";
import { SafeAreaView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import store from "../redux/store";

export default function RootLayout() {
  const { bottom, top } = useSafeAreaInsets();

  return (
    <Provider store={store}>
      <SafeAreaView
        style={{
          flex: 1,
          paddingBottom: bottom,
          paddingTop: top,
        }}
      >
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" options={{}} />
          {/* <Stack.Screen name="auth" options={{}} />
        <Stack.Screen
          name="map/index"
          options={{
            keyboardHandlingEnabled: false,
          }}
        />
        <Stack.Screen name="notifications/index" options={{}} />
        <Stack.Screen name="notifications/[id]" options={{}} />
        <Stack.Screen name="provers/[id]" options={{}} />
        <Stack.Screen name="randomuser/[id]" options={{}} />
        <Stack.Screen name="userfollowing/following" options={{}} />
        <Stack.Screen name="userfollowing/index" options={{}} />
        <Stack.Screen name="viewpost/[id]" options={{}} />
        <Stack.Screen name="userSearch/index" options={{}} />
        <Stack.Screen name="searchList/[index]" options={{}} />
        <Stack.Screen
          name="post_details_modal"
          options={{
            presentation: "formSheet",
            sheetAllowedDetents: "fitToContents",
          }}
        />
        <Stack.Screen name="(drawer)" options={{}} /> */}
        </Stack>
      </SafeAreaView>
    </Provider>
  );
}
