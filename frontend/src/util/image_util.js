import axios from "axios";
// Axios({
//   method: 'post',
//   url: "/api/images/image-upload",
//   config: { headers: { 'Content-Type': 'multipart/form-data' } }
// })
//   .then(function (response) {
//     //handle success
//     console.log(response);
//   })
//   .catch(function (response) {
//     //handle error
//     console.log(response);
//   })


// export const getAwsUrl = image => axios({
//   method: 'post',
//   url: "/api/images/image-upload",
//   config: { headers: { 'Content-Type': 'multipart/form-data' } },
//   data: image 
// });


export const getAwsUrl = image => axios.post("/api/images/image-upload", image);

// export const getAwsUrl = image =>
//   fetch("/api/images/image-upload", { image, method: "post" })
//     .then(res => res.json())
//     .then(res2 => console.log(res2));
window.getAwsUrl = getAwsUrl;
