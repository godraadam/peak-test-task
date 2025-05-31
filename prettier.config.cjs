/** @type {import("prettier").Config} */
const config = {
  plugins: [require.resolve("@trivago/prettier-plugin-sort-imports")],
  printWidth: 120,
  importOrder: ["^@/*", "^[./]"],
  importOrderSeparation: true,
  trailingComma: "all",
  importOrderSortSpecifiers: true,
};

module.exports = config;
