function arrayToMappedState<T>(data: Array<T>): ReadonlyMap<string, T> {
  let mapped = new Map<string, T>();
  for (let item of data) {
    mapped.set(item["id"], item);
  }
  return mapped;
}

function rangeStep(min: number, max: number, step = 1) {
  if (min > max) {
    throw new Error(`Error: rangeStep - min ${min} > max ${max}`);
  }
  if (step > max) {
    throw Error(`Error: rangeStep - step ${step} > max ${max}`);
  }
  return Array(Math.ceil((max - min) / step))
    .fill(min)
    .map((x, y) => x + y * step);
}

export { arrayToMappedState, rangeStep };
