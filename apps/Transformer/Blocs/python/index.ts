import { exec } from "node:child_process";

const PythonEngine = async (query: string) => {
  const childProcess = exec(`python3 -c "${query}"`);
  let stdOut;

  childProcess.stdout?.on("data", (data) => {
    stdOut = data;
  });

  childProcess.stderr?.on("data", (data) => {
    console.log(data);
    return {
      error: data,
      data: null,
    };
  });

  // await new Promise((resolve, reject) => {
  //   childProcess.on("close", (code) => {
  //     if (code === 0) {
  //       resolve({});
  //     } else {
  //       reject(code);
  //     }
  //   });
  // });

  return {
    error: null,
    data: stdOut,
  };
};

export default PythonEngine;
