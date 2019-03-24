/* tslint:disable */
import { IAction, IState } from "../types/";

export default function debugReportChange(
  name: string,
  action: IAction,
  nextState: IState
): void {
  const knownCircularKeys = ["markup"];

  if (
    process.env.NODE_ENV === "development" &&
    typeof window !== "undefined" &&
    window.top.location.search.indexOf("debug=true") > -1
  ) {
    const removeCircular = (obj: any) => {
      let cache: any[] | null = [];
      const result = JSON.stringify(
        obj,
        (key: string, value: any) => {
          if (typeof value === "object" && value !== null) {
            // If circular reference found then discard it
            if (
              (cache && cache.indexOf(value) !== -1) ||
              knownCircularKeys.some(k => key === k)
            ) {
              return;
            }

            cache && cache.push(value);
          }
          // eslint-disable-next-line
          return value;
        },
        2
      );
      cache = null;

      return result;
    };

    console.log(
      "\nname:",
      `"${name}'`,
      "\naction:",
      JSON.parse(removeCircular(action)),
      "\nnextState:",
      JSON.parse(removeCircular(nextState))
    );
  }
}
/* tslint:enable */
