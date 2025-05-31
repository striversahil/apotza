import _ from "lodash";

class GlobalContextManager {
  /**
   * This function returns a regular expression that matches the global context.
   * The global context is defined as a string that starts with "globalContext."
   *
   * @returns {RegExp} - The regular expression for matching global context.
   */
  static extractRegex = (text: string) => {
    const regex = /\{\{(.*?)\}\}/g;

    const matches = text.match(regex);

    const matchesWithoutBraces = matches?.map((match: string) =>
      match.slice(2, -2)
    );

    // Remove duplicates from matchesWithoutBraces
    const uniqueMatches = Array.from(new Set(matchesWithoutBraces));
    return {
      uniqueMatches,
      matchesWithoutBraces,
      regex,
    };
  };

  /**
   * This function takes an array of unique matches and a clause object and sets the global context in the clause object.
   *
   * @param {Array<string>} uniqueMatches - The array of unique matches to be set as the global context.
   * @param {object} clause - The clause object to be updated with the global context.
   */
  static setContext(
    prevReference: Record<string, any>,
    uniqueMatches: Array<string>,
    clause: any
  ) {
    const mappedMatches = uniqueMatches.map((match: string) => {
      const prev = prevReference?.[match] || "";

      // Changes Here to be made
      return [match, Array.from(new Set([...prev, clause]))];
    });

    const mappedMatchesObject = Object.fromEntries(mappedMatches);

    const setStepBlock = {
      ...prevReference,
      ...mappedMatchesObject,
    };

    return {
      setStepBlock,
    };
  }

  /**
   * This function cleans up the context by removing the current step block ID from the arrays in setStepBlock
   * if their references are removed.
   *
   * @param {Array<string>} prevMatches - The previous references of the step block.
   * @param {Array<string>} uniqueMatches - The unique matches to be checked against the previous references.
   * @param {string} id - The ID of the Item to be cleaned up.
   * @param {object} setReference - The object containing the references to be cleaned up.
   */
  static cleanedUpContext(
    prevMatches: Array<string>,
    uniqueMatches: Array<string>,
    id: string,
    setReference: any
  ) {
    // Remove the current step block ID from the arrays in setStepBlock if there reference are removed

    let cleanedUpReference = { ...setReference };

    // console.log("Previous Reference:", prevReference);
    // console.log("Unique Matches:", uniqueMatches);
    // console.log("Set Reference:", setReference);
    // console.log("ID to be cleaned up:", id);

    Object.keys(setReference).forEach((key: string) => {
      if (prevMatches.includes(key) && !uniqueMatches.includes(key)) {
        const value = setReference[key];
        if (Array.isArray(value)) {
          // If the value is an array, filter out the current step block ID
          cleanedUpReference[key] = value.filter((item: string) => item !== id);
        }
      }
    });

    return cleanedUpReference;
  }
}

export default GlobalContextManager;

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

// export const nameIdMapping
