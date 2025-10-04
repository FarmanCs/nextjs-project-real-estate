export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "var(--color-brand-50)",
          100: "var(--color-brand-100)",
          200: "var(--color-brand-200)",
          500: "var(--color-brand-500)",
          600: "var(--color-brand-600)",
          700: "var(--color-brand-700)",
          800: "var(--color-brand-800)",
          900: "var(--color-brand-900)",
        },
        grey: {
          0: "var(--color-grey-0)",
          50: "var(--color-grey-50)",
          100: "var(--color-grey-100)",
          200: "var(--color-grey-200)",
          300: "var(--color-grey-300)",
          400: "var(--color-grey-400)",
          500: "var(--color-grey-500)",
          600: "var(--color-grey-600)",
          700: "var(--color-grey-700)",
          800: "var(--color-grey-800)",
          900: "var(--color-grey-900)",
        },
        red: {
          100: "var(--color-red-100)",
          700: "var(--color-red-700)",
          800: "var(--color-red-800)",
        },
        // Add any other colors from your CSS here
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
      },
      borderRadius: {
        tiny: "var(--border-radius-tiny)",
        sm: "var(--border-radius-sm)",
        md: "var(--border-radius-md)",
        lg: "var(--border-radius-lg)",
      },
      fontfamily: {
        sans: ["Poppins", "sans-serif"],
        gridTempletcolumns: { "70/30": "70% 28%" },
      },
    },
  },
  plugins: [],
};
