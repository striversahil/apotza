import _ from "lodash";

class GlobalContextManager {
  static compCategory = ["comp", "sect", "page", "api", "step"];

  /**
   * This function returns a regular expression that matches the global context.
   * The global context is defined as a string that starts with "globalContext."
   *@param {string} text - The raw text input that may contain global context references.
   * @returns {RegExp} - The regular expression for matching global context.
   */
  static extractRegex = (text: string) => {
    const regex = /\{\{(.*?)\}\}/g;

    const matches = text.match(regex);

    const matchesWithoutBraces = matches?.map((match: string) =>
      match.slice(2, -2)
    );

    const extractedMatches: Record<string, any> = {};
    const arrayForm: string[] = [];

    // Iterate over each category and extract matches that start with the category
    // and a dot (e.g., "comp.", "sect.", "page.", "api.", "step.")
    this.compCategory.forEach((category: string) => {
      extractedMatches[category] = [];
      matchesWithoutBraces?.forEach((match: string) => {
        // Check if the match starts with the current category with a dot
        if (match.startsWith(`${category}.`)) {
          const removedCategory = match.slice(category.length + 1);
          if (!extractedMatches[category].includes(removedCategory)) {
            extractedMatches[category].push(removedCategory);
            arrayForm.push(removedCategory);
          }
        }
      });
    });

    // const arrayForm: string[] = Array.from(new Set(rawArrayForm));

    return {
      extractedMatches,
      arrayForm,
    };
  };

  /**
   * This function sets the global context by updating the previous reference with the new ID.
   *
   * @param {object} prevReference - The previous reference object containing global context.
   * @param {Array<string>} extractedMatchesArray - An array of global context matches without braces.
   * @param {string} id - The ID of the current step block.
   * @returns {object} - An object containing the new reference with the updated ID.
   */
  static setContext(
    prevReference: Record<string, any>,
    uniqueMatches: Array<string>,
    id: string
  ) {
    const mappedMatches = uniqueMatches.map((match: string) => {
      const prev = prevReference?.[match] || "";

      // Changes Here to be made
      return [match, Array.from(new Set([...prev, id]))];
    });

    const mappedMatchesObject = Object.fromEntries(mappedMatches);

    const newReference = {
      ...prevReference,
      ...mappedMatchesObject,
    };

    return {
      newReference,
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
    prevMatches: Record<string, any>,
    uniqueMatches: Array<string>,
    id: string,
    newReference: any
  ) {
    // Remove the current step block ID from the arrays in setStepBlock if there reference are removed

    const processedPrev: string[] = [];

    this.compCategory.forEach((category: string) => {
      if (prevMatches[category]) {
        prevMatches[category].forEach((item: string) => {
          processedPrev.push(item);
        });
      }
    });

    let cleanedUpReference = { ...newReference };

    // console.log("Previous Reference:", prevReference);
    // console.log("Unique Matches:", uniqueMatches);
    // console.log("Set Reference:", setReference);
    // console.log("ID to be cleaned up:", id);

    Object.keys(newReference).forEach((key: string) => {
      if (processedPrev.includes(key) && !uniqueMatches.includes(key)) {
        const value = newReference[key];
        if (Array.isArray(value)) {
          // If the value is an array, filter out the current step block ID
          cleanedUpReference[key] = value.filter((item: string) => item !== id);

          if (!cleanedUpReference[key].length) {
            // If the array is now empty, remove the key entirely
            delete cleanedUpReference[key];
          }
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
