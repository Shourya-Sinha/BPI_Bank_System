import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import authReducer from '../Redux/UserAuth/Auth';
import adminReducer from '../Redux/Admin/AdminFunction';

const rootPersistConfig = {
    key: 'root',
    storage,
    keyPrefix: 'redux-',
    whitelist: ['auth','admin'],
    //   blacklist: [],
  };
  
  const rootReducer = combineReducers({
    // app: appReducer,
    auth: authReducer,
    admin:adminReducer,
    // conversation: conversationReducer,
    // audioCall: audioCallReducer,
    // videoCall: videoCallReducer,
  });
  
  export { rootPersistConfig, rootReducer };