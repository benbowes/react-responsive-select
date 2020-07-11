const skipCircularReference = () => {
  let cache: any[] = [];
  return (_key: string, value: any) => {
    if (typeof value === 'object' && value !== null) {
      // Circular reference found
      if (cache.indexOf(value) !== -1) return;
      cache.push(value);
    }
    // No circular reference found
    return value;
  };
};

export function isEqual(a: any, b: any): boolean {
  return JSON.stringify(a, skipCircularReference()) === JSON.stringify(b, skipCircularReference());
}
