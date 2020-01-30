const { spawn } = require("child_process");

module.exports = (command, args, options) => {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: "inherit" });
    child.on("exit", function(code) {
      if (code !== 0) return reject(new Error("Shell command failed"));
      return resolve("Succcess");
    });
  });
};
