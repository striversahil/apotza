const RestEngine = async (
  endpoint: string,
  headers: Record<string, string>,
  body: Record<string, any>
) => {
  console.log("RestEngine");

  return {
    error: null,
    data: null, // It's Returning Data that need to be transformed
  };
};

export default RestEngine;
