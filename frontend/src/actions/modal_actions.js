export const OPEN_MODAL = "OPEN_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";
export const SHOW_FIRST_SIGN_UP_STEP = 'SHOW_FIRST_SIGN_UP_STEP'
export const MOVE_TO_SECOND_SIGN_UP_STEP = 'MOVE_TO_SECOND_SIGN_UP_STEP'

export const openModal = (type, data) => {
  return {
    type: OPEN_MODAL,
    modal: {
      type,
      data
    }
  };
};

export const showFirstSignUpStep = () =>({
  type: SHOW_FIRST_SIGN_UP_STEP
})

export const moveToSecondStep = (formData) => {
  return {
    type: MOVE_TO_SECOND_SIGN_UP_STEP,
    modal: {
      formData
    }
  }
}

export const closeModal = () => {
  return {
    type: CLOSE_MODAL
  };
};

