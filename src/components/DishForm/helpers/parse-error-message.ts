import type { DishErrorShape } from "../dish-form-schema";

const prettifyKey = (key: string) => {
  const words = key
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1));
  return words.join(" ");
};

export const parseErrorMessage = (err: DishErrorShape) => {
  // ? Would be great to know the contract in case of errors, but it's not specified in the task
  // ? so I assume this is the only possible error shape.

  const errorMessage = Object.entries(err)
    .map(([key, messages]) => `${prettifyKey(key)}: ${messages.join("\n")}`)
    .join("\n")
    .trim();

  return errorMessage ? errorMessage : "Something went wrong...";
};
