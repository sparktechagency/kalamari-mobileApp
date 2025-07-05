import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Collapsible from "react-native-collapsible";
import BackButton from "../../components/ui/BackButton";
import tw from "../../lib/tailwind";

const FAQItem = ({ question, answer }) => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <View style={tw`mb-4 bg-primaryBg`}>
      <TouchableOpacity
        style={tw`flex-row justify-between items-center bg-[#F3F3F3] p-4 rounded`}
        onPress={() => setCollapsed(!collapsed)}
      >
        <Text style={tw`text-base font-semibold`}>{question}</Text>
        <Feather
          name={collapsed ? "chevron-down" : "chevron-up"}
          size={20}
          color="#333"
        />
      </TouchableOpacity>

      <Collapsible collapsed={collapsed}>
        <View style={tw`bg-[#F3F3F3] px-4 py-2 rounded-b`}>
          <Text style={tw`text-sm text-gray-700`}>{answer}</Text>
        </View>
      </Collapsible>
    </View>
  );
};

export default function FaqScreen() {
  const faqData = [
    {
      question: "How can I reset my password?",
      answer: "Go to Settings > Account > Reset Password and follow the steps.",
    },
    {
      question: "Where can I find my saved data?",
      answer: "Your saved data can be found in the Profile > My Files section.",
    },
    {
      question: "How do I contact support?",
      answer:
        "You can contact our support team through the Help section or by emailing kalamary@gmail.com.",
    },
  ];

  return (
    <View style={tw`bg-primaryBg flex-1`}>
      <BackButton
        onPress={() => {
          router?.back();
        }}
        title={"Frequently Asked Questions"}
      />
      <ScrollView contentContainerStyle={tw`p-4 bg-primaryBg `}>
        {faqData.map((item, index) => (
          <FAQItem key={index} question={item.question} answer={item.answer} />
        ))}
      </ScrollView>
    </View>
  );
}
