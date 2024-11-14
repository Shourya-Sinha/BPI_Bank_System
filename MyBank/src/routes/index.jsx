import { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";

// layouts
import DashboardLayout from "../layouts/dashboard";
import AdminLayout from "../layouts/adminlayout/Adminout.jsx";
import AfterLoginLayout from '../pages/AfterLoginUser/Layout/AfterLoginLayout.jsx';
// config
import { DEFAULT_PATH } from "../config.jsx";
import LoadingScreen from "../components/LoadingScreen.jsx";

const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to={DEFAULT_PATH} replace />, index: true },
        { path: "app", element: <GeneralApp /> },

        { path: "maintain", element: <Page404 /> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        { path: "customers", element: <BankUsers /> },
        { path: "transactions", element: <TransactionReports /> },
        { path: "creditcard", element: <CreditCard /> },
        { path: "userinfo", element: <UserInjfo /> },
        { path: "maindash", element: <MainDash /> },
        { path: "edited-transaction", element: <EditedHistoryPage /> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
    {
      path: "/user",
      element: <AfterLoginLayout />,
      children: [
        { path: "mainacc", element: <MyAccounts /> },
        { path: "allTransaction", element: <AllTransaction /> },
        {path:'myprofile',element:<Userprofile />},
        { path: "transfer",  },
        { path: "payload", element: <Payload /> },
        { path: "invest", element: <Invest /> },
        { path: "settingMob", element: <SettingMob /> },
        { path: "more",  },
        { path: "moremob", element:<MoreMob /> },
        { path: "payloadmob", element:<PayloadMob /> },
        { path: "investmob", element:<InvestMob /> },
        { path: "transfermob", element:<TransferMob /> },
        { path: "ownacc", element: <OwnAccount /> },
        { path: "anotherbank", element: <AnotherBank /> },
        { path: "anotherbpi", element: <AnotherBPI /> },

        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    {path:'/registerUser',element:<RegisterUser />},
    { path: "/forgot-password", element: <UserForogtPass /> },
    { path: "/verify-email", element: <VerifyEmailUser /> },
    { path: "/admin/login", element: <AdminLogin /> },
    { path: "/admin/forgot-password", element: <AdminForogtPass /> },
    { path: "/admin/reset-password", element: <AdminResetPass /> },
  ]);
}

const MyAccounts = Loadable(
  lazy(() => import("../pages/AfterLoginUser/UserLayoutPage/MyAccount.jsx"))
);
const AllTransaction = Loadable(
  lazy(() => import("../pages/AfterLoginUser/UserLayoutPage/AllTransactions.jsx"))
);
const Userprofile = Loadable(
  lazy(() => import("../pages/AfterLoginUser/UserLayoutPage/UserProfile.jsx"))
);
const Transfer = Loadable(
  lazy(() => import("../pages/AfterLoginUser/UserLayoutPage/Transfer.jsx"))
);
const Payload = Loadable(
  lazy(() => import("../pages/AfterLoginUser/UserLayoutPage/PayLoad.jsx"))
);
const Invest = Loadable(
  lazy(() => import("../pages/AfterLoginUser/UserLayoutPage/Invest.jsx"))
);
const More = Loadable(
  lazy(() => import("../pages/AfterLoginUser/UserLayoutPage/More.jsx"))
);
const MoreMob = Loadable(
  lazy(() => import("../pages/AfterLoginUser/UserLayoutPage/MoreMob.jsx"))
);
const PayloadMob = Loadable(
  lazy(() => import("../pages/AfterLoginUser/UserLayoutPage/PayloadMob.jsx"))
);
const InvestMob = Loadable(
  lazy(() => import("../pages/AfterLoginUser/UserLayoutPage/InvestMore.jsx"))
);
const TransferMob = Loadable(
  lazy(() => import("../pages/AfterLoginUser/UserLayoutPage/TransferMob.jsx"))
);
const SettingMob = Loadable(
  lazy(() => import("../pages/AfterLoginUser/UserLayoutPage/SettingsMobile.jsx"))
);


const OwnAccount = Loadable(
  lazy(() => import("../pages/AfterLoginUser/UserLayoutPage/Transfer/OwnAcc.jsx"))
);
const AnotherBank = Loadable(
  lazy(() => import("../pages/AfterLoginUser/UserLayoutPage/Transfer/AnotherBank.jsx"))
);
const AnotherBPI = Loadable(
  lazy(() => import("../pages/AfterLoginUser/UserLayoutPage/Transfer/AnotherBpi.jsx"))
);

const GeneralApp = Loadable(
  lazy(() => import("../pages/dashboard/GeneralApp"))
);

const BankUsers = Loadable(
  lazy(() => import("../components/AdminBoard/AdminPage/BankUsers.jsx"))
);
const CreditCard = Loadable(
  lazy(() => import("../components/AdminBoard/AdminPage/CredyCardUser.jsx"))
);
const UserInjfo = Loadable(
  lazy(() => import("../components/AdminBoard/AdminPage/AdminInfo.jsx"))
);
const TransactionReports = Loadable(
  lazy(() =>
    import("../components/AdminBoard/AdminPage/TransactionsReport.jsx")
  )
);
const MainDash = Loadable(
  lazy(() => import("../components/AdminBoard/AdminPage/MainDash.jsx"))
);
const EditedHistoryPage = Loadable(
  lazy(() => import("../components/AdminBoard/AdminPage/EditedHistoryPage.jsx"))
);

const Login = Loadable(lazy(() => import("../components/Login.jsx")));

const AdminLogin = Loadable(
  lazy(() => import("../components/AdminBoard/AdminAuth/Login.jsx"))
);
const AdminForogtPass = Loadable(
  lazy(() => import("../components/AdminBoard/AdminAuth/AdminFrogotPass.jsx"))
);
const AdminResetPass = Loadable(
  lazy(() => import("../components/AdminBoard/AdminAuth/AdminResetPass.jsx"))
);

const UserForogtPass = Loadable(
  lazy(() => import("../components/UserForgotPass.jsx"))
);

const VerifyEmailUser =  Loadable(
  lazy(() => import("../components/VerifyEmail.jsx"))
);
const Register = Loadable(lazy(() => import("../components/Register.jsx")));
const RegisterUser = Loadable(lazy(() => import("../components/RegisterUser.jsx")));
const Page404 = Loadable(lazy(() => import("../pages/Page404")));
