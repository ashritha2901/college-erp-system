const express = require("express");

const { createProxyMiddleware } =
require("http-proxy-middleware");

const app = express();

app.use(
  "/auth",
  createProxyMiddleware({
    target: "http://localhost:5001",
    changeOrigin: true,
    pathRewrite: {
      "^/auth": "/auth"
    }
  })
);
app.use(
  "/student",
  createProxyMiddleware({
    target: "http://localhost:5002",
    changeOrigin: true,
    pathRewrite: {
      "^/student": "/student"
    }
  })
);
app.use(
  "/faculty",
  createProxyMiddleware({
    target: "http://localhost:5003",
    changeOrigin: true,
    pathRewrite: {
      "^/faculty": "/faculty"
    }
  })
);

app.listen(4000, () => {
  console.log("Gateway running on port 4000");
});