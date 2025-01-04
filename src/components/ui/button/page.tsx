import React, { ReactNode, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
  iconPosition?: "left" | "right"; // This will Allows positioning the icon
  className?: string; // this is  For custom styles
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  icon = null,
  iconPosition = "right",
  className = "",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded focus:outline-none transition";
  const variants = {
    primary:
      "bg-blue-500 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-300",
    secondary:
      "bg-gray-500 text-white hover:bg-gray-600 focus:ring-2 focus:ring-gray-300",
    outline:
      "border border-blue-500 text-blue-500 hover:bg-blue-100 focus:ring-2 focus:ring-blue-300",
  };
  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {icon && iconPosition === "left" && (
        <span className="mr-2 group-hover:rotate-12 transition-transform">
          {icon}
        </span>
      )}
      {children}
      {icon && iconPosition === "right" && (
        <span className="ml-2 group-hover:rotate-12 transition-transform">
          {icon}
        </span>
      )}
    </button>
  );
};

export default Button;
