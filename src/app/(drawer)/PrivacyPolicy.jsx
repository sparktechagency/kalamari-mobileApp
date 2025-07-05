import { router } from "expo-router";
import {
  Linking,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BackButton from "../../components/ui/BackButton";
import tw from "../../lib/tailwind";

const PrivacyPolicy = () => {
  return (
    <View style={tw` flex-1 bg-primaryBg`}>
      <BackButton
        onPress={() => {
          router?.back();
        }}
        title={" Privacy Policy"}
      />
      <SafeAreaView style={tw`flex-1 bg-white`}>
        <ScrollView contentContainerStyle={tw`px-4`}>
          <Text style={tw`text-sm  text-textgray  font-inter-600 mb-2`}>
            Effective Date: 24 May 2025{"\n"}
            Last Updated: 24 May 2025
          </Text>

          <Text style={tw`text-sm text-textgray font-inter-600 mb-4`}>
            This Privacy Policy describes how Kalamari ("we", "us", or "our")
            collects, uses, and shares your personal information when you use
            the Kalamari mobile application ("App").{" "}
          </Text>

          <Text style={tw`text-xl font-inter-700 mb-2`}>
            1. Information We Collect
          </Text>
          <Text style={tw`text-sm text-textgray font-inter-600 mb-4`}>
            • Personal Information: Name, email, and profile photo (if
            provided).{"\n"}• Content Information: Images and descriptions of
            meals, restaurant location tags.{"\n"}• Usage Data: App
            interactions, device data (IP, type, OS).{"\n"}• Location Data: If
            you enable location features.
          </Text>

          <Text style={tw`text-xl font-inter-700 mb-2`}>
            2. How We Use Information
          </Text>
          <Text style={tw`text-sm text-textgray font-inter-600 mb-4`}>
            • Provide and improve the App.{"\n"}• Personalize your experience.
            {"\n"}• Enable social and location features.{"\n"}• Communicate with
            you and provide support.{"\n"}• Ensure security and monitor usage.
          </Text>

          <Text style={tw`text-xl font-inter-700 mb-2`}>
            3. Sharing of Information
          </Text>
          <Text style={tw`text-sm text-textgray font-inter-600 mb-4`}>
            • We don’t sell your data. We may share it with:{"\n"}• Service
            providers supporting the App.{"\n"}• Legal authorities when
            required.{"\n"}• Other users, if you post content publicly.
          </Text>

          <Text style={tw`text-xl font-inter-700 mb-2`}>4. Data Retention</Text>
          <Text style={tw`text-sm text-textgray font-inter-600 mb-4`}>
            • We retain data as long as needed for the purposes described.{"\n"}
            • You can request deletion by contacting us.
          </Text>

          <Text style={tw`text-xl font-inter-700 mb-2`}>5. Your Rights</Text>
          <Text style={tw`text-sm text-textgray font-inter-600 mb-4`}>
            • Under UK GDPR, you have rights to:{"\n"}• Access, correct, delete
            or export your data.{"\n"}• Object or restrict processing.{"\n"}•
            Withdraw consent at any time.{"\n"}• Contact: princeton@kalamar.app
          </Text>

          <Text style={tw`text-xl font-inter-700 mb-2`}>6. Security</Text>
          <Text style={tw`text-sm text-textgray font-inter-600 mb-4`}>
            • We use standard security measures, but no system is completely
            secure.
          </Text>

          <Text style={tw`text-xl font-inter-700 mb-2`}>
            7. Children’s Privacy
          </Text>
          <Text style={tw`text-sm text-textgray font-inter-600 mb-4`}>
            • Not intended for children under 13.{"\n"}• We do not knowingly
            collect data from children.
          </Text>

          <Text style={tw`text-xl font-inter-700 mb-2`}>
            8. Changes to This Policy
          </Text>
          <Text style={tw`text-sm text-textgray font-inter-600 mb-4`}>
            • We may update this policy. Changes will be posted in the App or on
            our website.
          </Text>

          <Text style={tw`text-xl font-inter-700 mb-2`}>9. Contact</Text>

          <Text style={tw`text-sm text-textgray font-inter-600 flex-row `}>
            • For questions, contact us at
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => Linking.openURL("mailto:princeton@kalamari.app")}
            style={tw`flex-row flex-wrap items-center mb-4 ml-1`}
          >
            <Text style={tw`text-sm text-orange font-inter-600 underline `}>
              princeton@kalamari.app
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default PrivacyPolicy;
