import { Text, TextInput, View } from "react-native";
import tw from "../../lib/tailwind";
import CustomRadioButton from "./CustomRadioButton";

const SelectRadioButton = ({
  setSelectedOption,
  selectedOption,
  setSelectedOptionFood,
  selectedOptionFood,
  setRestaurant,
}) => {
  // console.log(selectedOption);

  return (
    <View style={tw`flex-col gap-4`}>
      <View style={tw`gap-2`}>
        <Text style={tw`text-[16px] font-inter-600 text-[#121212]`}>
          Where did you have it?
        </Text>
        <View style={tw`flex-row gap-6`}>
          <CustomRadioButton
            label="Restaurant"
            selected={selectedOption === "1"}
            onPress={() => setSelectedOption("1")}
          />
          <CustomRadioButton
            label="Home-Made"
            selected={selectedOption === "2"}
            onPress={() => setSelectedOption("2")}
          />
        </View>
      </View>

      <>
        {selectedOption === "restaurant" && (
          <View style={tw`flex-col gap-2`}>
            <Text style={tw`text-[16px] font-inter-600 text-[#121212]`}>
              Restaurant Name
            </Text>
            <View style={tw`bg-[#F3F3F3] rounded-md text-[#121212] flex-1`}>
              <TextInput
                placeholder="What’s the restaurant name?"
                style={tw`px-4 py-4 flex-1 text-black`}
                placeholderTextColor={"#888888"}
                onChangeText={(text) => setRestaurant(text)}
                // value={mealName}
              />
            </View>
          </View>
        )}
      </>
      <View style={tw`gap-2`}>
        <Text style={tw`text-[16px] font-inter-600 text-[#121212]`}>
          Food type?
        </Text>
        <View style={tw`flex-row gap-6`}>
          <CustomRadioButton
            label="Meal"
            selected={selectedOptionFood === "meal"}
            onPress={() => setSelectedOptionFood("meal")}
          />
          <CustomRadioButton
            label="Drink"
            selected={selectedOptionFood === "drink"}
            onPress={() => setSelectedOptionFood("drink")}
          />
        </View>
      </View>
    </View>
  );
};

export default SelectRadioButton;
