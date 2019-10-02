export const RECEIVE_IMAGE = "RECEIVE_IMAGE";
export const RECEIVE_IMAGES = "RECEIVE_IMAGES";

export const receiveImage = image => ({
  type: RECEIVE_IMAGE,
  image
});

export const receiveImages = images => ({
  type: RECEIVE_IMAGES,
  images
});
