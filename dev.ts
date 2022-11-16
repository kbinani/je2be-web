import * as http from "http";
import * as esbuild from "esbuild";
import * as path from "path";

esbuild
  .serve(
    {
      servedir: path.join(__dirname, "public"),
    },
    {
      define: { JE2BE_VERSION: '"(local)"' },
      entryPoints: [path.join(__dirname, "src/front/component/index.tsx")],
      bundle: true,
      outfile: path.join(__dirname, "public", "script", "front.js"),
    }
  )
  .then((result) => {
    const { host, port } = result;

    http
      .createServer((req, res) => {
        const options = {
          hostname: host,
          port: port,
          path: req.url,
          method: req.method,
          headers: req.headers,
        };

        const proxyReq = http.request(options, (proxyRes) => {
          res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
          res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
          res.writeHead(proxyRes.statusCode ?? 500, proxyRes.headers);
          proxyRes.pipe(res, { end: true });
        });

        req.pipe(proxyReq, { end: true });
      })
      .listen(3000);
    console.log(`http://localhost:3000`);
  });
