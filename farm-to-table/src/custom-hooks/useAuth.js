import { useState, useEffect } from "react";

export default function useAuth() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/user", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        const user = await response.json();
        setCurrentUser(user);
      } catch (error) {
        console.error("Error fetching user:", error);
        setCurrentUser(null);
      }
    };

    fetchUser();
  }, []);

  return { currentUser };
}
