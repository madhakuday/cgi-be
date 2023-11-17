function omitFields(
  data,
  fieldsToOmit = ["createdAt", "updatedAt", "password", "role"]
) {
  if (Array.isArray(data)) {
    // If the input is an array, iterate over each object in the array and omit fields
    return data.map((item) => omitFields(item, fieldsToOmit));
  } else if (data && typeof data === "object") {
    // If the input is an object, omit the specified fields
    const result = { ...data };

    fieldsToOmit.forEach((field) => {
      delete result[field];
    });

    return result;
  } else {
    // If the input is neither an object nor an array, return it as is
    return data;
  }
}

module.exports = {
  omitFields,
};
