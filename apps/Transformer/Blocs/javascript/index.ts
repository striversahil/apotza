const JavaScriptEngine = async (query: string) => {
  const isSafe =
    !/(\b(eval|Function|require|process|child_process|globalThis|window|document|while|for)\b)/.test(
      query
    );

  if (!isSafe) {
    return {
      error: "Unsafe Code Detected",
      data: null, // It's Returning Data that need to be transformed
    };
  }

  const removedComments = query.replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, "");

  const removedNewLines = removedComments.replace(/(\r\n|\n|\r)/gm, "");

  const removedImports = removedNewLines.replace(
    /^\s*import\s.+?from\s+['"][^'"]+['"];?|\s*import\s+['"][^'"]+['"];?/gm,
    ""
  );

  const removedExports = removedImports.replace(
    /^\s*export\s.+?from\s+['"][^'"]+['"];?|\s*export\s+['"][^'"]+['"];?/gm,
    ""
  );

  const removedFunctions = removedExports.replace(
    /^\s*function\s.+?{[^}]+}?|\s*function\s.+?{[^}]+}?/gm,
    ""
  );

  const output = eval(removedFunctions);

  //
  return {
    error: null,
    data: output, // It's Returning Data that need to be transformed
  };
};

export default JavaScriptEngine;
