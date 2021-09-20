// extract any functions you are using to manipulate your data, into this file

exports.formatToNested = (categoryData) => {
  const formattedCategoryData = data.map((category) => {
    return [category.slug, category.description];
  });
  return formattedCategoryData;
};
