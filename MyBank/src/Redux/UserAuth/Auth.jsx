import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { useEffect, useState } from "react";

const initialState = {
  isLoggedIn: false,
  isLoading: false,
  user: null,
  user_id: null,
  token: null,
  error: false,
  registerEmail: null,
  isRegisterSuccess: false,
  verifyEmail: false,
  accountNo: null,
  isAccoutVerified: false,
  snackbar: {
    open: null,
    severity: null,
    message: null,
  },
  accountCreation: {
    step: null,
    status: null,
  },
  userBnakDetails: {
    isAccountPending: null,
    isVerifiedAccount: null,
    accountNumber: null,
    balance:null,
    otherDeatils: {},
  },
  myAllTransactions: [],
  myDepositeTransactions:[],
  getUserEditedDat:[],
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateGetUserData(state,action){
      state.getUserEditedDat = state.getUserEditedDat || [];
      state.getUserEditedDat = action.payload.getUserEditedDat;
    },
    updateDepositeTransaction(state,action){
      state.myDepositeTransactions = state.myDepositeTransactions || [];
      state.myDepositeTransactions = action.payload.transactions;
    },
    updateIsLoading(state, action) {
      state.error = action.payload.error;
      state.isLoading = action.payload.isLoading;
    },
    updateAccCreated(state, action) {
      state.accountCreation = state.accountCreation || {};
      state.accountCreation.step = action.payload.step ?? null;
      state.accountCreation.status = action.payload.status ?? null;
    },
    resetAccCreated(state, action) {
      state.accountCreation.step = null;
      state.accountCreation.status = null;
    },
    logIn(state, action) {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.user_id = action.payload.user_id;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    signOut(state, action) {
      state.isLoggedIn = false;
      state.user_id = null;
      state.user = null;
      state.registerEmail = null;
      state.isRegisterSuccess = false;
      state.verifyEmail = false;

      // Use optional chaining to prevent errors if userBankDetails is null or undefined
      state.userBnakDetails = state.userBnakDetails || {}; // Set fallback object if it's null
      state.userBnakDetails.accountNumber = null;
      state.userBnakDetails.isVerifiedAccount = null;
      state.userBnakDetails.isAccountPending = null;
      state.userBnakDetails.otherDeatils = {};
    },
    adminSignOut(state, action) {
      state.isLoggedIn = false;
      state.user_id = null;
      state.user = null;
    },
    updateRegisterEmail(state, action) {
      state.registerEmail = action.payload.email;
    },
    updateVerificationEmail(state, action) {
      state.verifyEmail = action.payload.verifyEmail;
    },
    updateRegistrationSuccess(state, action) {
      state.isRegisterSuccess = action.payload.isRegisterSuccess;
    },
    openSnackBar(state, action) {
      console.log(action.payload);
      state.snackbar.open = true;
      state.snackbar.severity = action.payload.severity;
      state.snackbar.message = action.payload.message;
    },
    CloseSnackBar(state) {
      console.log("This is getting executed");
      state.snackbar.open = false;
      state.snackbar.message = null;
    },
    updateUserBankDetails(state, action) {
      state.userBnakDetails = state.userBnakDetails || {};
      state.userBnakDetails.isAccountPending = action.payload.isAccountPending;
      state.userBnakDetails.accountNumber = action.payload.accountNumber;
      state.userBnakDetails.isVerifiedAccount =
        action.payload.isVerifiedAccount;
      state.userBnakDetails.otherDeatils = action.payload.otherDeatils;
      state.userBnakDetails.balance =action.payload.balance
    },
    updateMyTransactions(state, action) {
      state.myAllTransactions = action.payload.myAllTransactions;
    },
  },
});

export default slice.reducer;

export const {
  updateMyTransactions,
  updateUserBankDetails,
  logIn,
  signOut,
  adminSignOut,
  updateRegisterEmail,
  updateIsLoading,
  openSnackBar,
  CloseSnackBar,
  updateVerificationEmail,
  updateRegistrationSuccess,
  updateAccCreated,
  resetAccCreated,
  updateDepositeTransaction,
  updateGetUserData,
} = slice.actions;

export function createBankAcc(formValues) {
  return async (dispatch) => {
    dispatch(updateIsLoading({ isLoading: true, error: false }));
    dispatch(updateAccCreated({ step: 1, status: "pending" }));
    await axios
      .post("/user/create-bank-account", formValues, { withCredentials: true })
      .then(function (response) {
        console.log(response);
        dispatch(updateAccCreated({ step: 1, status: "success" }));
        dispatch(updateIsLoading({ isLoading: false, error: false }));
        dispatch(
          showSnackbar({ severity: "success", message: response.data.message })
        );
      })
      .catch(function (error) {
        console.log(error);
        dispatch(updateAccCreated({ step: 1, status: "error" }));
        dispatch(updateIsLoading({ isLoading: false, error: true }));
        dispatch(showSnackbar({ severity: "error", message: error.message }));
      });
  };
}

export function createBankAcc2(formValues) {
  return async (dispatch) => {
    dispatch(updateIsLoading({ isLoading: true, error: false }));
    dispatch(updateAccCreated({ step: 2, status: "pending" }));
    await axios
      .post("/user/create-bank-account", formValues, { withCredentials: true })
      .then(function (response) {
        console.log(response);
        dispatch(updateAccCreated({ step: 2, status: "success" }));
        dispatch(updateIsLoading({ isLoading: false, error: false }));
        dispatch(
          showSnackbar({ severity: "success", message: response.data.message })
        );
      })
      .catch(function (error) {
        console.log(error);
        dispatch(updateAccCreated({ step: 2, status: "error" }));
        dispatch(updateIsLoading({ isLoading: false, error: true }));
        dispatch(showSnackbar({ severity: "error", message: error.message }));
      });
  };
}

export function createBankAcc3(formValues) {
  return async (dispatch) => {
    dispatch(updateIsLoading({ isLoading: true, error: false }));
    dispatch(updateAccCreated({ step: 3, status: "pending" }));
    await axios
      .post("/user/create-bank-account", formValues, { withCredentials: true })
      .then(function (response) {
        console.log(response);
        dispatch(updateAccCreated({ step: 3, status: "success" }));
        dispatch(updateIsLoading({ isLoading: false, error: false }));
        dispatch(
          showSnackbar({ severity: "success", message: response.data.message })
        );
      })
      .catch(function (error) {
        console.log(error);
        dispatch(updateAccCreated({ step: 3, status: "error" }));
        dispatch(updateIsLoading({ isLoading: false, error: true }));
        dispatch(showSnackbar({ severity: "error", message: error.message }));
      });
  };
}

export function resetBankAcc() {
  return async (dispatch, getState) => {
    dispatch(resetAccCreated());
  };
}

export const closeSnackBar = () => async (dispatch, getState) => {
  dispatch(CloseSnackBar());
};

export const showSnackbar =
  ({ severity, message }) =>
  async (dispatch, getState) => {
    dispatch(
      openSnackBar({
        message,
        severity,
      })
    );

    setTimeout(() => {
      dispatch(CloseSnackBar());
    }, 4000);
  };

export function LoginAdmin(formValues) {
  return async (dispatch, getState) => {
    dispatch(updateIsLoading({ isLoading: true, error: false }));

    await axios
      .post("/admin/login-admin", formValues, { withCredentials: true })
      .then(function (response) {
        dispatch(
          logIn({
            isLoggedIn: true,
            user_id: response.data.data.id,
            user: response.data.data.user,
          })
        );
        dispatch(updateIsLoading({ isLoading: false, error: false }));
        dispatch(
          showSnackbar({ severity: "success", message: response.data.message })
        );
      })
      .catch(function (error) {
        console.log(error);
        dispatch(updateIsLoading({ isLoading: false, error: true }));
        dispatch(
          showSnackbar({ severity: "error", message: error.message })
        );
      });
  };
}

export function LoginUser(formValues) {
  return async (dispatch, getState) => {
    dispatch(updateIsLoading({ isLoading: true, error: false }));
    await axios
      .post("/auth/user/login", formValues, { withCredentials: true })
      .then(function (response) {
        console.log(response);
        dispatch(
          logIn({
            isLoggedIn: true,
            user_id: response.data.data.id,
            user: response.data.data.user,
            token: response.data.data.token,
          })
        );
        dispatch(updateIsLoading({ isLoading: false, error: false }));
        dispatch(
          showSnackbar({ severity: "success", message: response.data.message })
        );
      })
      .catch(function (error) {
        console.log(error);
        dispatch(updateIsLoading({ isLoading: false, error: true }));
        dispatch(showSnackbar({ severity: "error", message: error.message }));
      });
  };
}

export function RegisterUserFun(formValues) {
  return async (dispatch) => {
    dispatch(updateIsLoading({ isLoading: true, error: false }));

    try {
      const response = await axios.post("/auth/user/register", formValues, {
        withCredentials: true,
      });

      // Assuming response contains status and email information
      console.log(response);

      // Dispatch email update only if registration is successful
      if (response.data.status === "success") {
        dispatch(updateRegisterEmail({ email: response.data.email })); // Save email to state
        dispatch(updateIsLoading({ isLoading: false, error: false }));
        dispatch(updateRegistrationSuccess({ isRegisterSuccess: true })); // Set registration success state
        dispatch(
          showSnackbar({ severity: "success", message: response.data.message })
        );
      } else {
        dispatch(
          showSnackbar({ severity: "error", message: response.data.message })
        );
      }
    } catch (error) {
      console.log(error);
      dispatch(updateIsLoading({ isLoading: false, error: true }));
      dispatch(showSnackbar({ severity: "error", message: error.message }));
    }
  };
}

export function VerifyOtp(formValues) {
  return async (dispatch) => {
    dispatch(updateIsLoading({ isLoading: true, error: false }));
    await axios
      .post("/auth/user/verify-otp", formValues, { withCredentials: true })
      .then(function (response) {
        console.log(response);
        dispatch(updateIsLoading({ isLoading: false, error: false }));
        dispatch(updateVerificationEmail({ verifyEmail: true }));
        dispatch(
          showSnackbar({
            severity: response.data.status,
            message: response.data.message,
          })
        );
      })
      .catch(function (error) {
        console.log(error);
        dispatch(showSnackbar({ severity: "error", message: error.message }));
        dispatch(updateIsLoading({ isLoading: false, error: true }));
      });
  };
}

export function ResendOtp(email) {
  return async (dispatch) => {
    // dispatch(updateIsLoading({ isLoading: true, error: false }));
    await axios
      .post("/auth/user/send-otp", { email }, { withCredentials: true })
      .then(function (response) {
        console.log(response);
        dispatch(updateIsLoading({ isLoading: false, error: false }));
        dispatch(
          showSnackbar({
            severity: response.data.status,
            message: response.data.message,
          })
        );
      })
      .catch(function (error) {
        console.log(error);
        dispatch(showSnackbar({ severity: "error", message: error.message }));
        dispatch(updateIsLoading({ isLoading: false, error: true }));
      });
  };
}

export function LogoutUser() {
  return async (dispatch) => {
    // await axios.post("/auth/user/logout", {}, { withCredentials: true });
    // dispatch(signOut());
    await axios.post("/auth/user/logout", {}, { withCredentials: true });
    dispatch(signOut());
  };
}

export function LogoutAdmin() {
  return async (dispatch) => {
    await axios.post("/auth/user/logout", {}, { withCredentials: true });
    dispatch(adminSignOut());
  };
}

export function ForgotPassword(formValues) {
  return async (dispatch) => {
    dispatch(updateIsLoading({ isLoading: true, error: false }));
    await axios
      .post("/auth/user/send-token", { formValues }, { withCredentials: true })
      .then(function (response) {
        console.log(response);
        dispatch(updateIsLoading({ isLoading: false, error: false }));
      })
      .catch(function (error) {
        console.log(error);
        dispatch(updateIsLoading({ isLoading: false, error: true }));
      });
  };
}

export function ResetPassword(formValues) {
  return async (dispatch) => {
    dispatch(updateIsLoading({ isLoading: true, error: false }));
    await axios
      .post(
        "/auth/user/reset-passwword",
        { formValues },
        { withCredentials: true }
      )
      .then(function (response) {
        console.log(response);
        dispatch(updateIsLoading({ isLoading: false, error: false }));
      })
      .catch(function (error) {
        console.log(error);
        dispatch(updateIsLoading({ isLoading: false, error: true }));
      });
  };
}

export function updateAccStatus(formValues) {
  return async (dispatch) => {
    dispatch(updateIsLoading({ isLoading: true, error: false }));
    await axios
      .post("/admin/update-account-status", formValues, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        dispatch(updateIsLoading({ isLoading: false, error: false }));
        dispatch(
          showSnackbar({ severity: "success", message: response.data.message })
        );
      })
      .catch((error) => {
        console.log(error);
        dispatch(updateIsLoading({ isLoading: false, error: true }));
        dispatch(showSnackbar({ severity: "error", message: error.message }));
      });
  };
}

export function GetUserBankDetails() {
  return async (dispatch) => {
    dispatch(updateIsLoading({ isLoading: true, error: false }));
    await axios
      .get("/user/get-bank-details", { withCredentials: true })
      .then(function (response) {
        dispatch(
          updateUserBankDetails({
            isAccountPending: response.data.userBank.isAccountPending,
            isVerifiedAccount: response.data.userBank.isVerifiedAccount,
            accountNumber: response.data.userBank.accountNumber,
            otherDeatils: response.data.userBank,
            balance: response.data.userBank.balance
          })
        );
        dispatch(updateIsLoading({ isLoading: false, error: false }));
      })
      .catch(function (error) {
        console.log(error);
        dispatch(updateIsLoading({ isLoading: false, error: true }));
      });
  };
}

export function InitiateTransfer(formValues) {
  return async (dispatch) => {
    dispatch(updateIsLoading({ isLoading: true, error: false }));
    await axios
      .post("/user/create-new-transaction", formValues, {
        withCredentials: true,
      })
      .then(function (response) {
        console.log(response);
        dispatch(updateIsLoading({ isLoading: false, error: false }));
        dispatch(
          showSnackbar({
            severity: response.data.status,
            message: response.data.message,
          })
        );
      })
      .catch(function (error) {
        console.log(error);
        dispatch(updateIsLoading({ isLoading: false, error: true }));
        dispatch(showSnackbar({ severity: "error", message: error.message }));
      });
  };
}

export function InitiateTransferAnotherBank(formValues) {
  return async (dispatch) => {
    dispatch(updateIsLoading({ isLoading: true, error: false }));
    await axios
      .post("/user/create-transaction-anotherbank", formValues, {
        withCredentials: true,
      })
      .then(function (response) {
        console.log(response);
        dispatch(updateIsLoading({ isLoading: false, error: false }));
        dispatch(
          showSnackbar({
            severity: response.data.status,
            message: response.data.message,
          })
        );
      })
      .catch(function (error) {
        console.log(error);
        dispatch(updateIsLoading({ isLoading: false, error: true }));
        dispatch(showSnackbar({ severity: "error", message: error.message }));
      });
  };
}

export function GetMyTransactionHistory() {
  return async (dispatch) => {
    try {
      const response = await axios.get("/user/get-myTransaction", {
        withCredentials: true,
      });
      // Now you can use `response` directly here
      dispatch(updateMyTransactions({ myAllTransactions: response.data.data }));
    } catch (error) {
      console.log(error);
    }
  };
}

export const UpdateDetails = async (formData) => {
  try {
    const response = await axios.post("/user/update-details", formData,{withCredentials:true}); // Use correct API route
    return response.data; // Return response to handle in component
  } catch (error) {
    console.error("Error updating details:", error);
    throw error;
  }
};

export const GetMyDetails = async () => {
  try {
    const response = await axios.get("/user/get-my-details", {
      withCredentials: true,
    });

    // console.log("Response details", response.data);
    return response.data; // Returning the response data
  } catch (error) {
    console.error("Error in getting user details", error);
    return null; // Or throw error if you want to handle it elsewhere
  }
};

export const uploadUserAvatar = async (file) => {
  const formData = new FormData();
  formData.append("avatar", file); // Add file to form data

  try {
    const response = await axios.post("/user/update-image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true, // Ensure cookies are sent
    });
    console.log("response in slice", response.data);
    return response.data;
  } catch (error) {
    console.error("Error uploading avatar:", error);
    throw error;
  }
};

export function DepositeRequestAmount(formValues) {
  return async (dispatch) => {
    dispatch(updateIsLoading({ isLoading: true, error: false }));
    await axios
      .post("/user/send-request-deposite", formValues, {
        withCredentials: true,
      })
      .then(function (response) {
        console.log(response);
        dispatch(updateIsLoading({ isLoading: false, error: false }));
        dispatch(
          showSnackbar({
            severity: response.data.status,
            message: response.data.message,
          })
        );
      })
      .catch(function (error) {
        console.log(error);
        dispatch(updateIsLoading({ isLoading: false, error: true }));
        dispatch(showSnackbar({ severity: "error", message: error.message }));
      });
  };
}

export function GetDepositeRequest(){
  return async (dispatch)=>{
    await axios.get('/user/get-my-deposite',{withCredentials:true})
    .then(function (response){
      console.log(response);
      dispatch(updateDepositeTransaction({transactions:response.data.data}));
    })
  }
}

export const GetMyLofinDetailsTime = async () => {
  try {
    const response = await axios.get("/user/get-login-details", {
      withCredentials: true,
    });

    // console.log("Response details", response.data);
    return response.data; // Returning the response data
  } catch (error) {
    console.error("Error in getting user details", error);
    return null; // Or throw error if you want to handle it elsewhere
  }
};

export function useIsSmallScreen(maxWidth = 600) {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= maxWidth);

  useEffect(() => {
    const handleResize = () => {
      console.log(window.innerWidth);
      setIsSmallScreen(window.innerWidth <= maxWidth);
    };

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Run the resize handler initially
    handleResize();

    // Clean up the event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, [maxWidth]);

  return isSmallScreen;
}

export function getUserEditedDataHistory(userId) {
  return async (dispatch) => {
    try {
      const response = await axios.get('/user/edited-transaction-history', {
        withCredentials: true,
      });

      dispatch(updateGetUserData({ getUserEditedDat: response.data.data }));
      dispatch(showSnackbar({ severity: 'success', message: response.data.message }));
    } catch (error) {
      console.log("error in place", error);
      dispatch(showSnackbar({ severity: 'error', message: error.message || 'Failed to fetch user edited data history.' }));
    }
  };
}
