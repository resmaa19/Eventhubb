export const uploadImage = async(image) => {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "event_managment");
      data.append("cloud_name", "dx6kf6pen");
  
      const res= await fetch("https://api.cloudinary.com/v1_1/dx6kf6pen/image/upload", {
        method: "post",
        body: data,
      })
      return res;
  };
  