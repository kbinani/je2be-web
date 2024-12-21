import * as esbuild from "esbuild";
import * as path from "path";

(async () => {
  const ctx = await esbuild.context({
    define: { JE2BE_VERSION: '"(local)"' },
    entryPoints: [path.join(__dirname, "src/front/component/index.tsx")],
    bundle: true,
    outfile: path.join(__dirname, "public", "script", "front.js"),
  });
  await ctx.serve({
    servedir: path.join(__dirname, "public"),
    port: 3000,
    host: "localhost",
  });
  console.log(`http://localhost:3000`);
})();
