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

  // Steps of Sanitization done with the code to

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

  const runner = `return (async () => {
      try {
        await ${removedExports}
        }
      catch (error) {
      return "⚠️ Error: " + error
      }
    
    })() `;

  try {
    const output = await new Function(query)();
    return {
      error: null,
      data: output, // It's Returning Data that need to be transformed
    };
  } catch (error) {
    return {
      error: `${error}`,
      data: null,
    };
  }

  //
};

export default JavaScriptEngine;
