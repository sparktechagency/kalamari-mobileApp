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

const TermsAndConditions = () => {
  return (
    <View style={tw`flex-1 bg-primaryBg`}>
      <BackButton
        onPress={() => {
          router?.back();
        }}
        title={"Terms & Conditions"}
      />

      <SafeAreaView style={tw`flex-1 bg-white`}>
        <ScrollView contentContainerStyle={tw`px-4`}>
          <Text style={tw` text-sm text-textgray font-inter-600 mb-2`}>
            Effective Date: 24 May 2025{"\n"}
            Last Updated: 24 May 2025
          </Text>

          {/* <Text style={tw`text-xl font-inter-700 mb-2`}>
            Welcome to KalamEats
          </Text> */}
          <Text style={tw`text-sm text-textgray font-inter-600 mb-4`}>
            Welcome to Kalamari ("we", "us", or "our"). These Terms of Service
            ("Terms") govern your access to and use of the Kalamari mobile
            application ("App"), which allows users to share images of homemade
            meals and meals from restaurants, including tagging restaurant
            locations. By using the App, you agree to be bound by these Terms
          </Text>

          <Text style={tw`text-base font-inter-700 mb-2`}>1. Eligibility</Text>
          <Text style={tw`text-sm text-textgray font-inter-600 mb-4`}>
            • You must be at least 13 years old to use the App. By using the
            App, you confirm that you meet this age requirement.
          </Text>

          <Text style={tw`text-base font-inter-700 mb-2`}>
            2. Use of the App
          </Text>
          <Text style={tw`text-sm text-textgray font-inter-600 mb-4`}>
            • KalamEats allows users to:{"\n"}
            •Share images of homemade and restaurant meals.{"\n"}
            •Tag locations of restaurants via map functionality.{"\n"}
            •View and interact with other users' shared content.
          </Text>

          <Text style={tw`text-base font-inter-700 mb-2`}>3. User Content</Text>
          <Text style={tw`text-sm text-textgray font-inter-600 mb-4`}>
            • You retain ownership of any content you submit, post, or display
            on the App (“User Content”). By sharing User Content, you grant us a
            worldwide, non-exclusive, royalty-free license to use, reproduce,
            modify, adapt, and display such content for the purpose of operating
            and promoting the App.{"\n"}• You agree not to post content that:
            {"\n"}
            •Is illegal, defamatory, or obscene;{"\n"}
            •Infringes on intellectual property rights;{"\n"}
            •Contains spam or malware.{"\n"}• We reserve the right to remove
            content that violates these Terms or is otherwise inappropriate.
          </Text>

          <Text style={tw`text-base font-inter-700 mb-2`}>
            4. Location Services
          </Text>
          <Text style={tw`text-sm text-textgray font-inter-600 mb-4`}>
            • If you use location tagging, the App may access your device’s
            location. You can disable location access at any time through your
            device settings.
          </Text>

          <Text style={tw`text-base font-inter-700 mb-2`}>
            5. Intellectual Property
          </Text>
          <Text style={tw`text-sm text-textgray font-inter-600 mb-4`}>
            • All rights in the App (excluding User Content) are owned by
            KalamEats. You may not use our trademarks or branding without prior
            written permission.
          </Text>

          <Text style={tw`text-base font-inter-700 mb-2`}>6. Termination</Text>
          <Text style={tw`text-sm text-textgray font-inter-600 mb-4`}>
            • We may suspend or terminate your access to the App at our
            discretion, with or without notice, if you violate these Terms.
          </Text>

          <Text style={tw`text-base font-inter-700 mb-2`}>7. Disclaimers</Text>
          <Text style={tw`text-sm text-textgray font-inter-600 mb-4`}>
            • The App is provided “as is.” We make no guarantees about the
            accuracy or reliability of any User Content.
          </Text>

          <Text style={tw`text-base font-inter-700 mb-2`}>
            8. Limitation of Liability
          </Text>
          <Text style={tw`text-sm text-textgray font-inter-600 mb-4`}>
            • To the maximum extent permitted by law, we will not be liable for
            any indirect, incidental, special, consequential, or punitive
            damages.
          </Text>

          <Text style={tw`text-base font-inter-700 mb-2`}>
            9. Governing Law
          </Text>
          <Text style={tw`text-sm text-textgray font-inter-600 mb-4`}>
            • These Terms are governed by the laws of England and Wales. Any
            disputes will be subject to the exclusive jurisdiction of the courts
            of England and Wales.
          </Text>

          <Text style={tw`text-base font-inter-700 mb-2`}>10. Contact</Text>
          <Text style={tw`text-sm text-textgray font-inter-600 mb-4`}>
            • If you have any questions, please contact us at
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => Linking.openURL("mailto:princeton@kalamari.app")}
              style={tw`flex-row flex-wrap items-center`}
            >
              <Text style={tw`text-sm text-orange font-inter-600 underline `}>
                princeton@kalamari.app
              </Text>
            </TouchableOpacity>
          </Text>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default TermsAndConditions;
