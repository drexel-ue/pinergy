export const OPEN_MODAL = "OPEN_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";
export const SHOW_FIRST_SIGN_UP_STEP = "SHOW_FIRST_SIGN_UP_STEP";
export const MOVE_TO_SECOND_SIGN_UP_STEP = "MOVE_TO_SECOND_SIGN_UP_STEP";
export const MOVE_TO_THIRD_SIGN_UP_STEP = "MOVE_TO_THIRD_SIGN_UP_STEP";
export const MOVE_TO_FOURTH_SIGN_UP_STEP = "MOVE_TO_FOURTH_SIGN_UP_STEP";
export const MOVE_TO_FIFTH_SIGN_UP_STEP = "MOVE_TO_FIFTH_SIGN_UP_STEP";

export const openModal = (type, data) => {
  return {
    type: OPEN_MODAL,
    modal: {
      type,
      data
    }
  };
};

export const showFirstSignUpStep = () => ({
  type: SHOW_FIRST_SIGN_UP_STEP
});

export const moveToSecondSignupStep = formData => {
  return {
    type: MOVE_TO_SECOND_SIGN_UP_STEP,
    modal: {
      formData
    }
  };
};

export const moveToThirdSignupStep = () => ({
  type: MOVE_TO_THIRD_SIGN_UP_STEP
});

export const moveToFourthSignupStep = () => ({
  type: MOVE_TO_FOURTH_SIGN_UP_STEP
});

export const moveToFifthSignupStep = () => ({
  type: MOVE_TO_FIFTH_SIGN_UP_STEP
});

export const closeModal = () => {
  return {
    type: CLOSE_MODAL
  };
};
