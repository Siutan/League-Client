const production = !process.env.ROLLUP_WATCH;
module.exports = {
  variants: {
    extend: {
      width: ["responsive", "hover", "focus"],
      grid: ["responsive", "hover", "focus"],
      gridTemplateColumns: ["responsive", "hover", "focus"],
    },
  },
  theme: {
    extend: {
      backgroundImage: {
        "background-1": "url('../public/img/background-1.jpg')",
      },
      spacing: {
        100: "30rem",
        200: "40rem",
        300: "50rem",
      },
      height: {
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "480px",
      },
      colors: {
        transparent: "transparent",
        current: "currentColor",
        teal: {
          100: "#00e6e6",
          200: "#00e6e6",
          300: "#00d6d6",
          400: "#00cccc",
          500: "#00bdbd",
          600: "#00b3b3",
          700: "#00a3a3",
          800: "#009999",
          900: "#008a8a",
        },
        sienna: {
          100: "#511C29",
          200: "#4C1A27",
          300: "#471A25",
          400: "#3D151F",
          500: "#2E1017",
        },
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
        "6xl": "3rem",
      },
    },
  },
  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true,
  },
  plugins: [],
  purge: {
    content: ["./src/App.svelte"],
    enabled: production, // disable purge in dev
  },
};
