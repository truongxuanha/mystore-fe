import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default ({ mode }: any) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd(), "") };

  return defineConfig({
    plugins: [react({}), tsconfigPaths()],
    server: {
      host: true,
      port: 5001,
    },
    define: {
      "process.env": process.env,
    },
  });
};
