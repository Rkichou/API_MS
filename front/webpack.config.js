const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
  entry: "./src/main.js", // Chemin vers le fichier d'entrée
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"), // Répertoire de sortie
  },
  module: {
    rules: [
      {
        test: /\.vue$/, // Gérer les fichiers .vue
        loader: "vue-loader",
      },
      {
        test: /\.js$/, // Gérer les fichiers .js
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"], // Utiliser Babel pour la compatibilité
          },
        },
      },
      {
        test: /\.css$/, // Gérer les fichiers CSS
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    alias: {
      vue$: "vue/dist/vue.esm.js",
    },
    extensions: ["*", ".js", ".vue", ".json"],
  },
  plugins: [
    new VueLoaderPlugin(), // Plugin pour charger Vue
  ],
  devServer: {
    contentBase: path.resolve(__dirname, "dist"), // Répertoire pour le serveur de développement
    compress: true,
    port: 5173, // Port du serveur de développement
  },
};
