import chalk from "chalk";
import morgan from "morgan";

export const loggingMiddleware = morgan((tokens, req, res) => {
  const logMsg = [
    tokens.method!(req, res),
    tokens.date!(req, res, "iso"),
    tokens.url!(req, res)!,
    tokens.status!(req, res),
    "-",
    tokens["response-time"]!(req, res),
    "ms",
  ].join(" ");
  if (tokens.status!(req, res)?.startsWith("4")) {
    return chalk.yellow(logMsg);
  }
  if (tokens.status!(req, res)?.startsWith("5")) {
    return chalk.red(logMsg);
  }
  if (tokens.status!(req, res)?.startsWith("2")) {
    return chalk.green(logMsg);
  }
  if (tokens.status!(req, res)?.startsWith("3")) {
    return chalk.cyan(logMsg);
  }
});
