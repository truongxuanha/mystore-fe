export const removeUndefinedValueInObject = (data: any) => {
  const newData = { ...data };

  Object.keys(newData).forEach((key) => {
    if (newData[key] === undefined) {
      delete newData[key];
    }
  });

  return newData;
};
const ENCODE_PARAM = ["keyword"];
export const buildApiUrl = (params: any): string => {
  let url = "";

  if (params && Object.keys(params).length > 0) {
    const newParams = removeUndefinedValueInObject(params);

    Object.keys(newParams).forEach((key, i) => {
      const prefix = i === 0 ? `?` : `&`;
      url += `${prefix}${key}=${ENCODE_PARAM.includes(key) ? encodeURIComponent(newParams[key]) : newParams[key]}`;
    });
  }
  return url;
};
