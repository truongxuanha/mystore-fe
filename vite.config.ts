import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import EnvironmentPlugin from "vite-plugin-environment";

export default ({ mode }: any) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd(), "") };
  return defineConfig({
    plugins: [react({}), EnvironmentPlugin("all", { prefix: "BASE_" })],
  });
};
