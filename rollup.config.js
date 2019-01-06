import babel from "rollup-plugin-babel";
import { uglify } from "rollup-plugin-uglify";

const env = process.env.NODE_ENV;

const plugins = [
  babel({
    exclude: "node_modules/**"
  })
];

if (env === "production") {
  plugins.push(
    uglify({
      compress: true
    })
  );
}

export default {
  input: "./scripts/main.js",
  output: {
    file: "build/bundle.js",
    format: "cjs"
  },
  plugins: plugins
};