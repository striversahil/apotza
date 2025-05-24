import _ from "lodash";

export const addGlobalContext = ({ clause = {} }: any): any => {
  /**
   * This function takes a clause object and recursively adds a global context to it.
   * It checks if the value of each key in the clause is an object and if so, it calls
   *
   *
   * addGlobalContext recursively on that object.
   *
   *
   * @param {object} clause - The clause object to be processed.
   *
   * @returns {object} - The new clause object with the global context added.
   */

  const newClause: any = {};

  for (const key in clause) {
    if (clause.hasOwnProperty(key)) {
      const value = clause[key];

      if (typeof value === "object" && value !== null) {
        newClause[key] = addGlobalContext({ clause: value });
      } else {
        newClause[key] = value;
      }

      if (key === "config") {
        // Update from global context
        newClause["value"] = "globalContext";
      }
    }
  }
  return newClause;
};



export const nameIdMapping 
