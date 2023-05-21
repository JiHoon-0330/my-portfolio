export function defineProperties<
  TObject extends Object,
  TProperties extends Record<string, unknown>,
>(defaultValue: TObject, properties: TProperties) {
  const objectProperties = Object.entries(properties).reduce(
    (result, [key, value]) => {
      result[key] = {
        value,
        configurable: true,
      };
      return result;
    },
    {} as PropertyDescriptorMap,
  );

  return Object.defineProperties(defaultValue, objectProperties) as TObject & {
    [Key in keyof TProperties]: TProperties[Key];
  };
}
