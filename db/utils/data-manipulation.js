// extract any functions you are using to manipulate your data, into this file

exports.formatCategoryDataToNested = (categoryData) => {
  const formattedCategoryData = categoryData.map((category) => {
    return [category.slug, category.description];
  });
  return formattedCategoryData;
};

exports.formatUserDataToNested = (userData) => {
  const formattedUserData = userData.map((user) => {
    return [user.username, user.avatar_url, user.name];
  });
  return formattedUserData;
};

// exports.formatToNested = (data) => {
//   const dataProperties = [];
//   const innerArray = [];
//   const outerArray = [];

//   for (const propName in data[0]) {
//     dataProperties.push(propName);
//   }
//   console.log(dataProperties);

//   for (let i = 0; i < data.length; i++) {
//     for (let j = 0; j < dataProperties.length; j++) {
//       if (data[i] !== undefined) {
//         innerArray.push(data[i][dataProperties[j]]);
//       }
//     }
//     outerArray.push(innerArray);
//   }

//   console.log(outerArray);
// };
