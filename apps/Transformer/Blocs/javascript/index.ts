import { spawn } from "child_process";

const JavaScriptEngine = async (query: string) => {
  try {
    // [Todo] : Removing Safe Check for now, but it should be implemented later

    // const isSafe =
    //   /^(?:(?!__|eval|Function|require|process|child_process|globalThis|window|document|import|exec|eval|os|sys|subprocess|open|shutil|path|glob|os\.|sys\.|subprocess\.|shutil\.|path\.|glob\.|readlines|readline|write|writelines|close|__main__|__import__|__loader__|__spec__|__package__|__file__|__cached__|__loader__|object\(|codecs\.|bz2\.|lzma\.|zipfile\.|tarfile\.|imp\.|pkgutil\.|distutils\.)[\s\S])*$/.test(
    //     query
    //   );
    // if (!isSafe) {
    //   return { error: "Unsafe code", data: null };
    // }

    // if (!isSafe) {
    //   return {
    //     error: "Unsafe Code Detected",
    //     data: null, // It's Returning Data that need to be transformed
    //   };
    // }

    // Steps of Sanitization done with the code to

    // const removedComments = query.replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, "");

    // const removedNewLines = removedComments.replace(/(\r\n|\n|\r)/gm, "");

    // const removedImports = removedNewLines.replace(
    //   /^\s*import\s.+?from\s+['"][^'"]+['"];?|\s*import\s+['"][^'"]+['"];?/gm,
    //   ""
    // );

    // const removedExports = removedImports.replace(
    //   /^\s*export\s.+?from\s+['"][^'"]+['"];?|\s*export\s+['"][^'"]+['"];?/gm,
    //   ""
    // );

    // const runner = `return (async () => {
    //     try {
    //       await ${removedExports}
    //       }
    //     catch (error) {
    //     return "⚠️ Error: " + error
    //     }

    //   })() `;

    const output = new Function(query)();
    if (!output) {
      return {
        error: "No Output Returned",
        data: null,
      };
    }

    return {
      error: null,
      data: output, // It's Returning Data that need to be transformed
    };
  } catch (error) {
    return {
      error: error as string,
      data: null,
    };
  }

  //
};

export default JavaScriptEngine;
