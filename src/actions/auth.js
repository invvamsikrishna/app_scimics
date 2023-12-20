export const getProfile = () => async (dispatch) => {
  // dispatch({
  //   type: "PROFILE_LOAD_START",
  // });
  // try {
  //   const response = await AuthServices.getProfile();
  //   const responseData = response.data;
  //   // console.log(responseData);
  //   let data = {};
  //   if (responseData.message == "success") {
  //     data = responseData.body;
  //   }
  //   dispatch({
  //     type: "PROFILE_LOAD_SUCCESS",
  //     payload: data,
  //   });
  // } catch (err) {
  //   console.log(err);
  //   dispatch({
  //     type: "PROFILE_LOAD_ERROR",
  //     payload: err.message,
  //   });
  // }
};

export const authSuccess = (data) => async (dispatch) => {
  dispatch({
    type: "LOGIN_SUCCESS",
    payload: data,
  });
};

export const authUpdated = (data) => async (dispatch) => {
  dispatch({
    type: "LOGIN_UPDATED",
    payload: data,
  });
};

export const authLogout = () => async (dispatch) => {
  dispatch({
    type: "LOGOUT",
  });
};
