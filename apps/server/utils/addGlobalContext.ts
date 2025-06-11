import _ from "lodash";
import ComponentService from "../service/component.service";
import SectionService from "../service/section.service";
import { PageService } from "../service/page.service";
import CodeBlockService from "../service/codeblock.service";
import StepBlockService from "../service/stepblock.service";

class GlobalContextManager {
  static compCategory = ["comp", "sect", "page", "api", "step"];

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

  static async setConfigValue(
    project_id: string,
    compMatches: Record<string, any>,
    configuration: Record<string, any>
  ) {
    /**
     * This function sets the configuration value for a component based on the provided matches.
     * It iterates through the matches and updates the configuration value for each component.
     *
     * @param {object} compMatches - The matches object containing component configurations.
     * @param {object} configuration - The configuration string to be updated.
     * @returns {object} - The updated configuration object with the new values.
     */

    const valuedMatches = { ...compMatches };

    // Iterating through each type in valuedMatches
    for (const type of Object.keys(valuedMatches)) {
      if (valuedMatches[type].length === 0) {
        // If there are no matches for this type, skip to the next iteration
        continue;
      }
      valuedMatches[type] = await Promise.all(
        valuedMatches[type].map((name: string) => {
          return currentValue(type, name, project_id);
        })
      );
    }

    // console.log("Updated Component:", valuedMatches);

    // Function to replace placeholders in the configuration string with actual values
    function setterValue(config: string) {
      const updatedConfig = config.replace(
        /\{\{(.*?)\}\}/g,
        (match: string, p1: string) => {
          const [type, name] = p1.split(".");

          if (type && valuedMatches[type] && valuedMatches[type].length > 0) {
            const currentValue = valuedMatches[type].find(
              (item: any) => item?.name === name
            );
            return currentValue ? currentValue.id : match;
          }
          return match; // Return the original match if no value found
        }
      );
      console.log("Updated Configuration:", updatedConfig);

      return updatedConfig;
    }

    // Iterate through the configuration object and add global context

    function addContext(configuration: Record<string, any>) {
      const newClause: any = {};

      for (const [key, value] of Object.entries(configuration)) {
        if (key === "value") {
          continue;
        }
        if (key === "config") {
          newClause["config"] = value;
          newClause["value"] = setterValue(value);
        } else if (typeof value === "object" && value !== null) {
          console.log("recursive call");
          newClause[key] = addContext(value);
        } else {
          newClause[key] = value;
        }
      }

      console.log("New Clause:", newClause);
      return newClause;
    }

    const newConfiguration = addContext(configuration);

    return {
      updatedConfiguration: newConfiguration,
    };
  }
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

const currentValue = async (
  type: string,
  name: string,
  projectId: string
): Promise<any> => {
  switch (type) {
    case "comp":
      return await ComponentService.getByName(name, projectId);
    case "sect":
      return await SectionService.getByName(name, projectId);
    case "page":
      return await PageService.getByName(name, projectId);
    case "api":
      return await CodeBlockService.getByName(name, projectId);
    case "step":
      return await StepBlockService.getByName(name, projectId);
    default:
      return null;
  }
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
