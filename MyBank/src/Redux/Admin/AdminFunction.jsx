import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
import axios from "../../utils/axios";
import { showSnackbar } from "../UserAuth/Auth";

const initialState = {
  userList: [],
  recentUsers:[],
  singleUser: null,
  weeklyTrans: null,
  monthlyTrans: null,
  annualTrans: null,
  error: null,
  isAdmin: false,
  isAdminLoading: false,
  adminDetails:{},
  todayTransactions:{},
  allUserTransactions:{},
  allDepositeRequest:[],
};

const slice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    updateAllDepositeRequest(state,action){
      state.allDepositeRequest = state.allDepositeRequest || [];
      state.allDepositeRequest = action.payload.allDepositeRequest;
    },
    updateAllUserTransactions(state,action){
      state.allUserTransactions = action.payload.allUserTransactions;
    },
    updateTodayTransactions(state,action){
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
    updateAdminDeatils(state,action){
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
      await axios.get("/admin/get-user-deposite-request", { withCredentials: true })
        .then(function (response) {
          console.log('response get deposite request in slice',response.data);
          dispatch(updateAllDepositeRequest({allDepositeRequest: response.data.data }));
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
      await axios.get("/admin/users/non-admin", { withCredentials: true })
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

export function getRecentUserData(){
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
            updateWeeklyTrans({ weeklyTrans: response.data.totalAmount})
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

export function getMonthlyData(){
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

export function getAnnualData(){
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
        dispatch(updateAdminDeatils({ details:response.data.admin }));
        dispatch(showSnackbar({ severity: 'success', message: response.data.message }));
      })
      .catch((error) => {
        console.log(error);
        dispatch(updateIsLoading({ isLoading: false, error: true }));
        dispatch(showSnackbar({ severity: 'error', message: error.message }));
      });
  }
}

export function fetchTodayTransactions() {
  return async (dispatch) => {
    await axios
      .get("/admin/today-transactions", { withCredentials: true })
      .then((response) => {
        dispatch(updateTodayTransactions({ todayTransactions:response.data.data }));
      })
      .catch((error) => {
        console.log(error);
        dispatch(updateIsLoading({ isLoading: false, error: true }));
        dispatch(showSnackbar({ severity: 'error', message: error.message }));
      });
  }
}

export function fetchAllUserTransactions() {
  return async (dispatch) => {
    await axios
      .get("/admin/get-all-user-transa", { withCredentials: true })
      .then((response) => {
        dispatch(updateAllUserTransactions({ allUserTransactions:response.data.data }));
      })
      .catch((error) => {
        console.log(error);
        dispatch(updateIsLoading({ isLoading: false, error: true }));
        dispatch(showSnackbar({ severity: 'error', message: error.message }));
      });
  }
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

export const StatusUpdateDepositRequest = (transactionId, status) => async (dispatch, getState) => {
  try {
    const response = await axios.patch(`/admin/approve-deposit/${transactionId}`, { status }, { withCredentials: true });
    console.log('response in slice page', response.data);
    
    if (response.status === 200) {
      dispatch(showSnackbar({ severity: 'success', message: response.data.message }));
      
      // Get the current state of allDepositeRequest
      const { allDepositeRequest } = getState().admin;

      // Update the specific transaction in the list
      const updatedDepositeRequest = allDepositeRequest.map((transaction) =>
        transaction.transactionId === transactionId
          ? { ...transaction, status: response.data.data.status }
          : transaction
      );

      // Dispatch to update the Redux state
      dispatch(updateAllDepositeRequest({ allDepositeRequest: updatedDepositeRequest }));
    }
  } catch (error) {
    dispatch(showSnackbar({ severity: 'error', message: error.message }));
  }
};


