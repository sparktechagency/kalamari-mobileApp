const SimplifyDate = (dateObj, referenceDate = null) => {
  // 1. Validate input and extract date string
  if (!dateObj || !dateObj.date) {
    console.error("Invalid date object provided");
    return "Invalid date";
  }

  // 2. Parse the date (with validation)
  const parsedDate = new Date(dateObj.date);
  if (isNaN(parsedDate.getTime())) {
    console.error("Invalid date string:", dateObj.date);
    return "Invalid date";
  }

  // 3. Handle reference date (default to current date)
  const refDate = referenceDate
    ? referenceDate instanceof Date
      ? referenceDate
      : new Date(referenceDate)
    : new Date();

  // 4. Check for "Today"
  if (parsedDate.toDateString() === refDate.toDateString()) {
    return "Today";
  }

  // 5. Format day with proper suffix
  const day = parsedDate.getDate();
  let suffix = "th";
  if (day % 100 < 11 || day % 100 > 13) {
    switch (day % 10) {
      case 1:
        suffix = "st";
        break;
      case 2:
        suffix = "nd";
        break;
      case 3:
        suffix = "rd";
        break;
    }
  }

  // 6. Format month name
  const month = parsedDate.toLocaleString("default", { month: "long" });

  return `${month} ${day}${suffix} `;
};

export default SimplifyDate;
// Example usage:
// console.log(SimplifyDate('2023-05-19')); // "19th May" (or current month/day)
// console.log(SimplifyDate(new Date()));    // "Today"
// console.log(SimplifyDate('2023-05-21')); // "21st May"
// console.log(SimplifyDate('2023-05-22')); // "22nd May"
// console.log(SimplifyDate('2023-05-23')); // "23rd May"
