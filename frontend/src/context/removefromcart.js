import { useMutation } from "@tanstack/react-query";

const useRemoveToWishlist = () => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await fetch(
        "http://localhost:5000/api/sphinx/wishlist",
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      const result = await response.json();
      if (!response.ok)
        throw new Error(result.message || "Something went wrong");
      return result;
    },
    onError: (error) => console.log("Wishlist error:", error.message),
    onSuccess: (data) => {
      console.log("Wishlist removed:", data);
    },
  });
};

export default useRemoveToWishlist;
