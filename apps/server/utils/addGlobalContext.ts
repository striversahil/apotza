import _ from "lodash";
import ComponentService from "../service/component.service";
import SectionService from "../service/section.service";
import { PageService } from "../service/page.service";
import CodeBlockService from "../service/codeblock.service";
import StepBlockService from "../service/stepblock.service";

class GlobalContextManager {
  // static compCategory = ["comp", "sect", "page", "api", "step"];

  /**
   * This function returns a regular expression that matches the global context.
   * The global context is defined as a string that starts with "globalContext."
   *@param {object} text - The raw text input that may contain global context references.
   * @returns {RegExp} - The regular expression for matching global context.
   */
  static extractRegex = (text: object) => {
    const regex = /\{\{(.*?)\}\}/g;
    const textString = typeof text === "string" ? text : JSON.stringify(text);

    const matches = textString.match(regex);

    const extractedRegex = matches?.map((match: string) => match.slice(2, -2));

    const extractedMatches = extractedRegex ? extractedRegex : [];

    // const arrayForm: string[] = Array.from(new Set(rawArrayForm));

    return {
      extractedMatches,
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
    extractedMatches: Array<string>,
    id: string
  ) {
    const refinedBase: Array<any> = [];
    const mappedMatches = extractedMatches.map((match: string) => {
      const base = match.split(".")[0] || "";

      const prev = prevReference?.[base] || "";

      refinedBase.push(base);

      // Changes Here to be made
      return [base, Array.from(new Set([...prev, id]))];
    });

    const mappedMatchesObject = Object.fromEntries(mappedMatches);

    const newReference = {
      ...prevReference,
      ...mappedMatchesObject,
    };

    return {
      newReference,
      refinedBase,
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
    newReference: any
  ) {
    // Remove the current step block ID from the arrays in setStepBlock if there reference are removed

    let cleanedUpReference = { ...newReference };

    Object.keys(newReference).forEach((key: string) => {
      if (prevMatches.includes(key) && !uniqueMatches.includes(key)) {
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

  /**
   * This function sets the configuration value for a component based on the provided matches.
   * It iterates through the matches and updates the configuration value for each component.
   *
   * @param {Array} compMatches - The matches object containing component configurations.
   * @param {object} configuration - The configuration string to be updated.
   * @returns {object} - The updated configuration object with the new values.
   */
  // static async setConfigValue(
  //   project_id: string,
  //   compMatches: Array<string>,
  //   configuration: Record<string, any>
  // ) {
  //   const valuedMatches = [...compMatches];

  //   // Fetching current value of each match in the Start so that we can update easily
  //   const mappedValues = await Promise.all(
  //     valuedMatches.map((match: string) => {
  //       return currentValueByName(match.split(".")[0] || "", project_id);
  //     })
  //   );

  //   // console.log("Updated Component:", valuedMatches);
  //   function getNestedValue(obj: object, keys: any[]) {
  //     return keys.reduce((acc, key) => acc && acc[key], obj);
  //   }

  //   // Function to replace placeholders in the configuration string with actual values
  //   function setterValue(config: string) {
  //     // console.log("Configuration:", config);
  //     const updatedConfig = config.replace(
  //       /\{\{(.*?)\}\}/g,
  //       (match: string, p1: string) => {
  //         const name = p1.split(".")[0] || "";
  //         const unprocessedKeys = p1.split(".").slice(1);
  //         const nestedKey = unprocessedKeys.map((key: string) => {
  //           if (Number.isNaN(Number(key))) {
  //             return key; // Return the key as is if it's not a number
  //           }
  //           return Number(key); // Convert to number if it's a valid number
  //         });

  //         if (mappedValues && valuedMatches.length > 0) {
  //           const currentModel = mappedValues.find(
  //             (item: any) => item?.name === name
  //           );

  //           if (!currentModel) {
  //             return match; // Return the original match if no model found
  //           }
  //           const currentValue =
  //             "response" in currentModel && currentModel.response
  //               ? currentModel.response
  //               : ("error" in currentModel && currentModel.error) ||
  //                 ("configuration" in currentModel &&
  //                   currentModel.configuration) ||
  //                 {};

  //           // If nested keys are provided, get the nested value
  //           if (nestedKey.length > 0) {
  //             const nestedValue = getNestedValue(currentValue, nestedKey);
  //             // console.log("Nested Value:", nestedValue);

  //             return nestedValue !== undefined
  //               ? nestedValue
  //               : match
  //           }

  //           return currentValue
  //             ? currentValue
  //             : match; // Return the current value if it exists, otherwise return the original match
  //         }
  //         return match // Return the original match if no value found
  //       }
  //     );

  //     return updatedConfig;
  //   }

  //   // Iterate through the configuration object and add global context

  //   function addContext(config: Record<string, any>) {
  //     const newClause: any = {};

  //     for (const [key, value] of Object.entries(config)) {
  //       if (key === "value") {
  //         continue;
  //       }
  //       if (key === "config") {
  //         newClause["config"] = value;
  //         newClause["value"] = setterValue(value);
  //         return newClause;
  //       } else if (Array.isArray(value)) {
  //         newClause[key] = value.map((item: any) => {
  //           if (typeof item === "object" && item !== null) {
  //             return addContext(item);
  //           }
  //           return item;
  //         });
  //       } else if (typeof value === "object" && value !== null) {
  //         newClause[key] = addContext(value);
  //       } else {
  //         newClause[key] = value;
  //       }
  //     }
  //     return newClause;
  //   }

  //   const newConfiguration = addContext(configuration);

  //   return {
  //     updatedConfiguration: newConfiguration,
  //   };
  // }

  // static async updateReferencing(projectId: string, allMatches: Array<string>) {
  //   /**
  //    * This function updates the referencing of components based on the provided matches.
  //    * It iterates through the matches and updates the referencing for each component.
  //    *
  //    * @param {Array} allMatches - The Array Contain Id's of Referced Componenet to be updated.
  //    * @returns {Promise<void>} - A promise that resolves when the referencing is updated.
  //   */
    
  //   console.log("Updating Referencing for Matches:", allMatches);
  //   await Promise.all(
  //     allMatches.map(async (id: string) => {
  //       const { item, update } = await currentValueById(id);

  //       console.log("Current Item:", item);
        

  //       if (item) {
  //         // Fetching the current configuration of each component
  //         const extractedMatches = GlobalContextManager.extractRegex(
  //           item.configuration
  //         ).extractedMatches;

  //         console.log("Extracted Matches:", extractedMatches);

  //         const updatedValue = await GlobalContextManager.setConfigValue(
  //           projectId,
  //           extractedMatches,
  //           item.configuration
  //         );
  //         if (updatedValue) {
  //           // console.log(update);
  //           const updated = await update({
  //             configuration: updatedValue.updatedConfiguration,
  //           });
  //           console.log("Updated Component:", updated.configuration.content , updatedValue.updatedConfiguration.content);
  //         }
  //       }
  //     })
  //   );
  // }
}

export default GlobalContextManager;

// Updated Component: { api: [], comp: [], page: [], sect: [ 'somet' ], step: [] }
// Updated Project: {
//   confg: [ 'b5ec617d-396a-4ade-9e3d-a99bc63ead74' ],
//   somet: [
//     'fe6a256d-6397-41fc-af85-28215d16236c',
//     '7d3336a4-d4de-48a7-a180-007148d4e13f'
//   ],
//   something: [ '59e4e601-fd41-42a1-8d64-bb5713b6d834' ]
// }
const services = [
  StepBlockService,
  ComponentService,
  SectionService,
  CodeBlockService,
  PageService,
];

const currentValueByName = async (
  name: string,
  projectId: string
): Promise<any> => {
  // A Priority List of Services to check for the name
  // If the name is found in any of these services, we will return the first match
  for (const service of services) {
    const item = await service.getByName(name, projectId);
    if (item) {
      return item;
    }
  }
};

const currentValueById = async (id: string): Promise<any> => {
  // A Priority List of Services to check for the ID
  for (const service of services) {
    const item = await service.getById(id);
    const update = async (clause = {}) => {
      const value = await service.update(id, clause);
      return value;
      // console.log("Updated Value:", clause?.configuration.content);
    };

    if (item) {
      return {
        item: item,
        update: update,
      };
    }
  }
  return null;
};

const typeRegexMap = (type: string, name: string) => {
  switch (type) {
    case "comp":
      return `{{comp.${name}}}`;
    case "sect":
      return `{{sect.${name}}}`;
    case "page":
      return `{{page.${name}}}`;
    case "api":
      return `{{api.${name}}}`;
    case "step":
      return `{{step.${name}}}`;
    default:
      return "";
  }
};

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
  // return newClause;
};
