export type PropsToString<T extends {}> = {
  [key in keyof T]: string;
};

export const convertPropsToString = <T extends {}, K extends keyof T>(obj: T): PropsToString<T> =>
  (Object.keys(obj) as K[]).reduce((converted, key) => {
    converted[key] = String(obj[key]);
    return converted;
  }, {} as PropsToString<T>);
