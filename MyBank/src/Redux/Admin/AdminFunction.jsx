import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
import axios from "../../utils/axios";
import { showSnackbar } from "../UserAuth/Auth";

const initialState = {
  userList: [],
  recentUsers: [],
  singleUser: null,
  weeklyTrans: null,
  monthlyTrans: null,
  annualTrans: null,
  error: null,
  isAdmin: false,
  isAdminLoading: false,
  adminDetails: {},
  todayTransactions: {},
  allUserTransactions: {},
  allDepositeRequest: [],
  getSingleUserData: {},
  getAllUserOfAdmin: [],
  getUserEditedDat:[],
};

const slice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    updateGetUserData(state,action){
      state.getUserEditedDat = state.getUserEditedDat || [];
      state.getUserEditedDat = action.payload.getUserEditedDat;
    },
    updateGetAllUserForAdmin(state, action) {
      state.getAllUserOfAdmin = state.getAllUserOfAdmin || [];
      state.getAllUserOfAdmin = action.payload.getAllUserOfAdmin;
    },
    updateSingleUserData(state, action) {
      state.getSingleUserData = state.getSingleUserData || {};
      state.getSingleUserData = action.payload.userData;
    },
    updateAllDepositeRequest(state, action) {
      state.allDepositeRequest = state.allDepositeRequest || [];
      state.allDepositeRequest = action.payload.allDepositeRequest;
    },
    updateAllUserTransactions(state, action) {
      state.allUserTransactions = action.payload.allUserTransactions;
    },
    updateTodayTransactions(state, action) {
      state.todayTransactions = action.payload.todayTransactions;
    },
    updateUserList(state, action) {
      state.userList = action.payload.userList;
    },
    updateRecentUserList(state, action) {
      state.recentUsers = action.payload.recentUsers;
    },
    updateSingleUser(state, action) {
      state.singleUser = action.payload.user;
    },
    updateWeeklyTrans(state, action) {
      state.weeklyTrans = action.payload.weeklyTrans;
    },
    updateMonthlyTrans(state, action) {
      state.monthlyTrans = action.payload.monthlyTrans;
    },
    updateAnnualTrans(state, action) {
      state.annualTrans = action.payload.annualTrans;
    },
    updateIsLoading(state, action) {
      state.isAdminLoading = action.payload.isAdminLoading;
    },
    updateAdminDeatils(state, action) {
      state.adminDetails = action.payload.details;
    },
    adminSignOut(state, action) {
      state.adminDetails = {};
    },
  },
});

export default slice.reducer;

export const {
  updateUserList,
  updateSingleUser,
  updateWeeklyTrans,
  updateMonthlyTrans,
  updateAnnualTrans,
  updateIsLoading,
  updateRecentUserList,
  updateAdminDeatils,
  updateTodayTransactions,
  updateAllUserTransactions,
  updateAllDepositeRequest,
  adminSignOut,
  updateSingleUserData,
  updateGetAllUserForAdmin,
  updateGetUserData,
} = slice.actions;

export function LogoutAdminn() {
  return async (dispatch) => {
    await axios.post("/auth/user/logout", {}, { withCredentials: true });
    dispatch(adminSignOut());
  };
}

export function getAllDepositeTransactions() {
  return async (dispatch) => {
    try {
      await axios
        .get("/admin/get-user-deposite-request", { withCredentials: true })
        .then(function (response) {
          console.log("response get deposite request in slice", response.data);
          dispatch(
            updateAllDepositeRequest({ allDepositeRequest: response.data.data })
          );
          dispatch(updateIsLoading({ isAdminLoading: false }));
        })
        .catch(function (error) {
          console.log(error);
          dispatch(updateIsLoading({ isAdminLoading: false }));
        });
    } catch (error) {
      console.log(error);
      dispatch(updateIsLoading({ isAdminLoading: false }));
    }
  };
}

export function getAllUser() {
  return async (dispatch) => {
    dispatch(updateIsLoading({ isAdminLoading: true }));
    try {
      await axios
        .get("/admin/users/non-admin", { withCredentials: true })
        .then(function (response) {
          // console.log('response user in slice',response.data);
          dispatch(updateUserList({ userList: response.data.data }));
          dispatch(updateIsLoading({ isAdminLoading: false }));
        })
        .catch(function (error) {
          console.log(error);
          dispatch(updateIsLoading({ isAdminLoading: false }));
        });
    } catch (error) {
      console.log(error);
      dispatch(updateIsLoading({ isAdminLoading: false }));
    }
  };
}

export function getRecentUserData() {
  return async (dispatch) => {
    dispatch(updateIsLoading({ isAdminLoading: true }));
    try {
      await axios
        .get("/admin/users/recent", { withCredentials: true })
        .then(function (response) {
          dispatch(
            updateRecentUserList({ recentUsers: response.data.recentUsers })
          );
          dispatch(updateIsLoading({ isAdminLoading: false }));
        })
        .catch(function (error) {
          console.log(error);
          dispatch(updateIsLoading({ isAdminLoading: false }));
        });
    } catch (error) {
      console.log(error);
      dispatch(updateIsLoading({ isAdminLoading: false }));
    }
  };
}

export function getWeeklyData(userId) {
  return async (dispatch) => {
    dispatch(updateIsLoading({ isAdminLoading: true }));
    try {
      await axios
        .get("/admin/transactions/weekly", { withCredentials: true })
        .then(function (response) {
          dispatch(
            updateWeeklyTrans({ weeklyTrans: response.data.totalAmount })
          );
          dispatch(updateIsLoading({ isAdminLoading: false }));
        })
        .catch(function (error) {
          dispatch(updateIsLoading({ isAdminLoading: false }));
        });
    } catch (error) {
      console.log(error);
      dispatch(updateIsLoading({ isAdminLoading: false }));
    }
  };
}

export function getMonthlyData() {
  return async (dispatch) => {
    dispatch(updateIsLoading({ isAdminLoading: true }));
    try {
      await axios
        .get("/admin/transactions/monthly", { withCredentials: true })
        .then(function (response) {
          dispatch(
            updateMonthlyTrans({ monthlyTrans: response.data.totalAmount })
          );
          dispatch(updateIsLoading({ isAdminLoading: false }));
        })
        .catch(function (error) {
          console.log(error);
          dispatch(updateIsLoading({ isAdminLoading: false }));
        });
    } catch (error) {
      console.log(error);
      dispatch(updateIsLoading({ isAdminLoading: false }));
    }
  };
}

export function getAnnualData() {
  return async (dispatch) => {
    dispatch(updateIsLoading({ isAdminLoading: true }));
    try {
      await axios
        .get("/admin/transactions/yearly", { withCredentials: true })
        .then(function (response) {
          dispatch(
            updateAnnualTrans({ annualTrans: response.data.totalAmount })
          );
          dispatch(updateIsLoading({ isAdminLoading: false }));
        })
        .catch(function (error) {
          console.log(error);
          dispatch(updateIsLoading({ isAdminLoading: false }));
        });
    } catch (error) {
      console.log(error);
      dispatch(updateIsLoading({ isAdminLoading: false }));
    }
  };
}

export function fetchAdminDetails() {
  return async (dispatch) => {
    await axios
      .get("/admin/get-admin-details", { withCredentials: true })
      .then((response) => {
        dispatch(updateAdminDeatils({ details: response.data.admin }));
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

export function fetchTodayTransactions() {
  return async (dispatch) => {
    await axios
      .get("/admin/today-transactions", { withCredentials: true })
      .then((response) => {
        dispatch(
          updateTodayTransactions({ todayTransactions: response.data.data })
        );
      })
      .catch((error) => {
        console.log(error);
        dispatch(updateIsLoading({ isLoading: false, error: true }));
        dispatch(showSnackbar({ severity: "error", message: error.message }));
      });
  };
}

export function fetchAllUserTransactions() {
  return async (dispatch) => {
    await axios
      .get("/admin/get-all-user-transa", { withCredentials: true })
      .then((response) => {
        dispatch(
          updateAllUserTransactions({ allUserTransactions: response.data.data })
        );
      })
      .catch((error) => {
        console.log(error);
        dispatch(updateIsLoading({ isLoading: false, error: true }));
        dispatch(showSnackbar({ severity: "error", message: error.message }));
      });
  };
}

// Redux action to dispatch the status change request
// export const StatusUpdateDepositRequest = (transactionId, status) => async (dispatch) => {
//   try {
//     const response = await axios.patch(`/admin/approve-deposit/${transactionId}`, { status },{withCredentials:true});
//     console.log('response in slice page',response.data);
//     if (response.status === 200) {

//       // dispatch({
//       //   type: "UPDATE_TRANSACTION_STATUS",
//       //   payload: response.data.data, // Update the state with the new transaction data
//       // });
//       dispatch(showSnackbar({ severity: 'success', message: response.data.message }));
//       // dispatch(updateAllDepositeRequest({allDepositeRequest: response.data.data }));
//     }
//   } catch (error) {
//     dispatch(showSnackbar({ severity: 'error', message: error.message }));
//   }
// };

export const StatusUpdateDepositRequest =
  (transactionId, status) => async (dispatch, getState) => {
    try {
      const response = await axios.patch(
        `/admin/approve-deposit/${transactionId}`,
        { status },
        { withCredentials: true }
      );
      console.log("response in slice page", response.data);

      if (response.status === 200) {
        dispatch(
          showSnackbar({ severity: "success", message: response.data.message })
        );

        // Get the current state of allDepositeRequest
        const { allDepositeRequest } = getState().admin;

        // Update the specific transaction in the list
        const updatedDepositeRequest = allDepositeRequest.map((transaction) =>
          transaction.transactionId === transactionId
            ? { ...transaction, status: response.data.data.status }
            : transaction
        );

        // Dispatch to update the Redux state
        dispatch(
          updateAllDepositeRequest({
            allDepositeRequest: updatedDepositeRequest,
          })
        );
      }
    } catch (error) {
      dispatch(showSnackbar({ severity: "error", message: error.message }));
    }
  };

export function getALLUserForAdmin() {
  return async (dispatch) => {
    try {
      const response = await axios.get("/admin/getAll-user-for-admin", {
        withCredentials: true,
      });
      if (response.status === 200) {
        dispatch(
          updateGetAllUserForAdmin({ getAllUserOfAdmin: response.data.data })
        );
      }
      console.log("All users data", response.data);
    } catch (error) {
      console.log(error);
      dispatch(
        showSnackbar({
          severity: "error",
          message: error.message || "Failed to fetch users.",
        })
      );
    }
  };
}
export function getSingleUserForAdmin(userId) {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/admin/get-sigle-user/${userId}`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        dispatch(updateSingleUserData({ userData: response.data.data }));
      }
      console.log("Single user data", response.data);
    } catch (error) {
      console.log(error);
      dispatch(
        showSnackbar({
          severity: "error",
          message: error.message || "Failed to fetch user data.",
        })
      );
    }
  };
}

export function CreteEditedTransaction(formValues) {
  return async (dispatch) => {
    await axios
      .post("/admin/createEdited-transaction", formValues, {
        withCredentials: true,
      })
      .then(function (response) {
        console.log("response in slice", response.data);
        const { remainingBalance , data } = response.data;

        dispatch(
          showSnackbar({ severity: "success", message: response.data.message })
        );
        dispatch(
          updateSingleUserData({
            userData: {
              balance: remainingBalance, // Update the balance field
            },
          })
        );
      })
      .catch(function (error) {
        console.log(error);
        dispatch(
          showSnackbar({
            severity: "error",
            message: error.message || "Failed to create edited transaction.",
          })
        );
      });
  };
}
//credit
export function CreteCreditEditedTransaction(formValues) {
  return async (dispatch) => {
    await axios
      .post("/admin/create-creditEdited-transaction", formValues, {
        withCredentials: true,
      })
      .then(function (response) {
        console.log("response in slice", response.data);
        const { remainingBalance , data } = response.data;
        dispatch(
          showSnackbar({ severity: "success", message: response.data.message })
        );
        dispatch(
          updateSingleUserData({
            userData: {
              balance: remainingBalance, // Update the balance field
            },
          })
        );
      })
      .catch(function (error) {
        console.log(error);
        dispatch(
          showSnackbar({
            severity: "error",
            message: error.message || "Failed to create edited transaction.",
          })
        );
      });
  };
}

export function getUserEditedDataHistory(userId) {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/admin/getuser-edited-data?userId=${userId}`, {
        withCredentials: true,
      });

      console.log('response in slice', response.data);
      dispatch(updateGetUserData({ getUserEditedDat: response.data.data }));
      dispatch(showSnackbar({ severity: 'success', message: response.data.message }));
    } catch (error) {
      console.log("error in place", error);
      dispatch(showSnackbar({ severity: 'error', message: error.message || 'Failed to fetch user edited data history.' }));
    }
  };
}

export function deleteUserEditedDataHistory(userId,editedHistoryId) {
  return async (dispatch)=>{
    await axios.delete(`/admin/delete-user-edited-history/${userId}/${editedHistoryId}`,{withCredentials: true})
    .then(function (response){
      console.log('response in slice', response.data);
      dispatch(showSnackbar({ severity:'success', message: response.data.message }));
      dispatch(getUserEditedDataHistory(userId));
    }).catch(function (error){
      console.log('error in place', error);
      dispatch(showSnackbar({ severity:'error', message: error.message || 'Failed to delete user edited data history.'}));
    })  
  }
}

export function deleteUserData(userId) {
  return async (dispatch)=>{
    await axios.post(`/admin/delete-user-recorded-history/${userId}`, {}, { withCredentials: true })
    .then(function (response){
      console.log('response in slice', response.data);
      dispatch(showSnackbar({ severity:'success', message: response.data.message }));
      if (response.status === 200) {
        dispatch(
          updateGetAllUserForAdmin({ getAllUserOfAdmin: response.data.data })
        );
      }
    }).catch(function (error){
      console.log('error in place', error);
      dispatch(showSnackbar({ severity:'error', message: error.message || 'Failed to delete user edited data history.'}));
    })  
  }
}