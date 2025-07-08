export const convertToUniqueTagArrays = (tags) => {
  const splitAndTrimmed = tags
    .join(",") // "Alex, Mia, Mia"
    .split(",") // ["Alex", " Mia", " Mia"]
    .map((name) => name.trim()); // ["Alex", "Mia", "Mia"]

  const uniqueNames = Array.from(new Set(splitAndTrimmed)); // ["Alex", "Mia"]

  const result = uniqueNames.map((name) => [name]); // [["Alex"], ["Mia"]]
  return result;
};
