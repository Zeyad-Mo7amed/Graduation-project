import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#E8F1FD",
          100: "#D0E3FB",
          200: "#A1C6F7",
          300: "#72AAF3",
          400: "#438EEF",
          500: "#2F81ED",
          600: "#105BBC",
          700: "#0C448D",
          800: "#082D5E",
          900: "#04172F",
          950: "#020B17",
        },

        neutral: {
          50: "#F0F2F4",
          100: "#E1E5EA",
          200: "#C4CBD4",
          300: "#A6B0BF",
          400: "#8896AA",
          500: "#64748B",
          600: "#556377",
          700: "#404A59",
          800: "#2B323B",
          900: "#15191E",
          950: "#0B0C0F",
        },

        success: {
          50: "#E8FDF6",
          100: "#D0FBED",
          200: "#A1F7DA",
          300: "#72F3C8",
          400: "#43EFB6",
          500: "#10B981",
          600: "#10BC83",
          700: "#0C8D62",
          800: "#085E41",
          900: "#042F21",
          950: "#021710",
        },

        error: {
          50: "#FDE8E8",
          100: "#FBD0D0",
          200: "#F7A1A1",
          300: "#F37272",
          400: "#EF4343",
          500: "#EF4444",
          600: "#BC1010",
          700: "#8D0C0C",
          800: "#5E0808",
          900: "#2F0404",
          950: "#170202",
        },
      },
    },
  },
  plugins: [react(), tailwindcss()],
});
