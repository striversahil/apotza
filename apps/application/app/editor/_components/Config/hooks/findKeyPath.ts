// import _ from "lodash";

// const findKeyPath: (obj: any, targetKey: string, path: string[]) => string[] = (
//   obj = {},
//   targetKey = "",
//   path = []
// ) => {
//   return _.reduce(
//     obj,
//     (result, value, key) => {
//       if (key === targetKey) return [...path, key]; // Found the key 🎯
//       if (_.isObject(value)) {
//         const nestedPath = findKeyPath(value, targetKey, [...path, key]);
//         if (nestedPath.length) return nestedPath; // Found in nested object
//       }
//       return result;
//     },
//     []
//   );
// };

// export default findKeyPath;
