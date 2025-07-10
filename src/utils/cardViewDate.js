export const cardViewDate = (date) => {
  if (!date) return null;

  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) return "Invalid date";

  const today = new Date();

  // Check if date is today
  if (parsedDate.toDateString() === today.toDateString()) {
    return "Today";
  }

  // Format day with suffix
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

  // Format month name
  const month = parsedDate.toLocaleString("default", { month: "short" });

  return `${month} ${day}${suffix}`;
};
