// components/ui/use-toast.ts
import { toast } from "react-toastify";

// Custom hook that wraps react-toastify's toast function
export const useToast = () => {
  const showToast = (options: {
    title: string;
    description: string;
    duration: number;
  }) => {
    // Show a toast with a custom title and description
    toast.success(`${options.title} - ${options.description}`, {
      autoClose: options.duration, // Close after the specified duration
      position: "top-right", // Toast position on the screen
      hideProgressBar: false, // Show progress bar
    });
  };

  // Return the toast function
  return { toast: showToast };
};
