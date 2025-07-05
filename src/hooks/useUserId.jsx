import { useEffect, useState } from "react";
import { storage } from "../utils/storage";

const useUserId = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      const storedUser = await storage.getString("user");
      if (storedUser) {
        try {
          const parsed = JSON.parse(storedUser);
          setUserId(parsed?.id || null);
        } catch (err) {
          console.error("Invalid JSON in user storage:", err);
        }
      }
    };

    fetchUserId();
  }, []);

  return userId;
};

export default useUserId;
