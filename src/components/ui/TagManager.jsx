import { useEffect } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import tw from "../../lib/tailwind";

const TagManager = ({ newTag, setNewTag, tags, setTags }) => {
  useEffect(() => {
    if (newTag && !tags.includes(newTag)) {
      setTags((prev) => [...prev, newTag]);
    }
  }, [newTag]);

  const userMap = Array.isArray(tags)
    ? tags.flatMap((tag) =>
        tag
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
      )
    : [];

  const removeTag = (tagToRemove) => {
    const updatedTags = tags
      .map((tag) =>
        tag
          .split(",")
          .map((t) => t.trim())
          .filter((t) => t && t !== tagToRemove)
          .join(", ")
      )
      .filter(Boolean); // remove empty strings

    setTags(updatedTags);

    if (newTag === tagToRemove && setNewTag) {
      setNewTag("");
    }
  };

  return (
    <View style={tw`flex-1 flex-row justify-center items-center gap-2`}>
      {tags.length > 0 && (
        <Text style={tw`text-3 font-inter-600 text-[#121212]`}>
          Tagged with :
        </Text>
      )}

      <ScrollView horizontal contentContainerStyle={tw`flex-row gap-2`}>
        {tags.length > 0 &&
          userMap.map((tag, index) => (
            <View
              key={index}
              style={tw`flex-row items-center px-3 py-1 border border-[#0063E5] rounded-2`}
            >
              <Text style={tw`text-3 font-inter-600 text-[#888888] mr-2`}>
                {tag}
              </Text>
              <Pressable onPress={() => removeTag(tag)}>
                <Text style={tw`text-[#888888] text-lg`}>×</Text>
              </Pressable>
            </View>
          ))}
      </ScrollView>
    </View>
  );
};

export default TagManager;
