export const PUBLIC_URL = process.env.PUBLIC_URL;
export const MAXWIDTH = "1328px";

export const QUES_STATUS = ["NOT_VISITED", "NOT_ANSWERED", "ANSWERED", "MARKED_FOR_REVIEW", "ANSWERED_MARKED_FOR_REVIEW"];

export const phoneRegExp = /^[6-9]\d{9}$/;

export const PROFILE_FILE_SIZE = 500000;

export const getQuesStatsColor = (value) => {
  if (!value) return "background.paper";

  switch (value) {
    case QUES_STATUS[1]:
      return "error.dark";
    case QUES_STATUS[2]:
      return "success.main";
    case QUES_STATUS[3]:
    case QUES_STATUS[4]:
      return "primary.dark";
    default:
      return "background.paper";
  }
};

export const LOGIN_SUCCESS_MSG = "Thank you, User registration successfully completed";
export const SIGNUP_SUCCESS_MSG = "Thank you, User registration successfully completed";
export const OTPSENT_SUCCESS_MSG = "OTP sent to your email address";
export const UPDATE_PROFILE_SUCCESS_MSG = "Profile updated successfully";
export const UPDATE_PSWD_SUCCESS_MSG = "Password updated successfully";

export const OTPLENGTH_ERROR_MSG = "OTP must be 6 digits long";

export const COMMON_ERROR_MSG = "Something went wrong";
