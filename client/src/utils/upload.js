export const createFormData = (img) => {
  const data = new FormData();
  try {
    data.append("avatar", img);
    // data.append("avatar", {
    //   uri: img,
    //   type: "image/jpeg",
    //   name: "image.jpg",
    // });
  } catch (error) {
    console.log("Error creating form data", error);
  }

  //   Object.keys(body).forEach((key) => {
  //     data.append(key, body[key]);
  //   });

  return data;
};
