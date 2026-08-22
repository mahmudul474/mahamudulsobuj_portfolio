import type {Config} from "tailwindcss";
const config:Config={content:["./src/**/*.{ts,tsx}"],theme:{extend:{fontFamily:{display:["var(--font-space)"],sans:["var(--font-inter)"]}}},plugins:[]};
export default config;
