export const LIMIT_PRODUCT = 5;

export function omitByUndefined<T>(obj: T): Partial<T> {
  const result: Partial<T> = {};

  for (const key in obj) {
    if (obj[key] !== undefined) {
      result[key] = obj[key];
    }
  }

  return result;
}

export const createQueryString = (data: Record<string, any>) => {
  const params = new URLSearchParams();

  Object.keys(data).forEach((key) => {
    params.set(key, data[key]);
  });

  return params.toString();
};

export const statusOrder = {
  PENDING: '0',
  SUCCESS: '1'
} as const;
