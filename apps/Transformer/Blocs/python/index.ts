import { spawn } from "child_process";
import path, { resolve } from "path";
import { fileURLToPath } from "url";

async function PythonEngine(query: string) {
  try {
    // Regex to safe code
    const isSafe =
      /^(?:(?!__|import|exec|eval|os|sys|subprocess|open|shutil|path|glob|os\.|sys\.|subprocess\.|shutil\.|path\.|glob\.|readlines|readline|write|writelines|close|__import__|__loader__|__spec__|__package__|__file__|__cached__|__loader__|object\(|codecs\.|bz2\.|lzma\.|zipfile\.|tarfile\.|pyexpat\.|imp\.|pkgutil\.|distutils\.)[\s\S])*$/.test(
        query
      );
    if (!isSafe) {
      return { error: "Unsafe code", data: null };
    }

    // Calling Python Function
    const data = await callPythonFunction(query);
    return { error: null, data: JSON.parse(data as string) };
  } catch (error) {
    return { error: error as string, data: null };
  }
  // py.stdin.write(JSON.stringify({ query }));
  // py.stdin.end();
  // console.log("Rest", res);
  // return res;
  // return new Promise((resolve, reject) => {

  //   // py.on("close", () => {
  //   //   try {
  //   //     const output = JSON.parse(result);
  //   //     resolve(output.message);
  //   //   } catch (err) {
  //   //     reject("Failed to parse Python response");
  //   //   }
  //   // });
  // });
}

export default PythonEngine;

// Making Wrapper Pythonic Function to Execute Python Code
const wrapperPython = (query = "") => {
  return `
import json

def Function():
${query
  .split("\n")
  .map((line) => "    " + line) // indent each line
  .join("\n")}
  
result = Function()
print(json.dumps(result))
  `;
};

const callPythonFunction = async (query: string) => {
  return new Promise((resolve, reject) => {
    const py = spawn("python3", ["-c", wrapperPython(query)]);

    py.stdout.on("data", (data) => {
      // console.log("Data", data.toString());
      resolve(data.toString().trim());
    });

    py.stderr.on("data", (data) => {
      reject(data.toString());
    });

    py.on("close", () => {});
    py.on("error", () => {
      reject("Failed to parse Python response");
    });
  });

  // const _filename = fileURLToPath(import.meta.url);
  // const _dirname = path.dirname(_filename);
};

// Example usage
// callPythonFunction("Sahil").then(console.log).catch(console.error);
