import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import EnvironmentPlugin from "vite-plugin-environment";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default ({ mode }: any) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd(), "") };
  return defineConfig({
    plugins: [
      react({}),
      EnvironmentPlugin("all", { prefix: "BASE_" }),
    ],
  });
};
