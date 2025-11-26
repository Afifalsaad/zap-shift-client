import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/Rootlayout";
import Home from "../pages/Home/Home/Home";
import Coverage from "../pages/Coverage/Coverage";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import PrivateRoutes from "./PrivateRoutes";
import Rider from "../pages/Rider/Rider";
import ForgotPassword from "../pages/Auth/Login/ForgotPassword";
import SendParcel from "../pages/SendParcel/SendParcel";
import DashboardLayout from "../layouts/DashboardLayout";
import { Component } from "react";
import MyParcels from "../pages/DashBoard/MyParcels/MyParcels";
import Payment from "../pages/DashBoard/Payment/Payment";
import PaymentSuccess from "../pages/DashBoard/Payment/PaymentSuccess";
import PaymentCancelled from "../pages/DashBoard/Payment/PaymentCancelled";
import PaymentHistory from "../pages/DashBoard/PaymentHistory/PaymentHistory";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "rider",
        element: (
          <PrivateRoutes>
            <Rider></Rider>
          </PrivateRoutes>
        ),
        loader: () => fetch("warehouses.json").then((res) => res.json())
      },
      {
        path: "forgotPassword",
        Component: ForgotPassword,
      },
      {
        path: "/sendParcel",
        element: (
          <PrivateRoutes>
            <SendParcel></SendParcel>
          </PrivateRoutes>
        ),
        loader: () => fetch("warehouses.json").then((res) => res.json()),
      },
      {
        path: "/coverage",
        Component: Coverage,
        loader: () => fetch("warehouses.json").then((res) => res.json()),
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoutes>
        <DashboardLayout></DashboardLayout>
      </PrivateRoutes>
    ),
    children: [
      {
        path: "my-parcels",
        Component: MyParcels,
      },
      {
        path: "payment/:id",
        Component: Payment,
      },
      {
        path: "payment-history",
        Component: PaymentHistory,
      },
      {
        path: "payment-success",
        Component: PaymentSuccess,
      },
      {
        path: "payment-cancelled",
        Component: PaymentCancelled,
      },
    ],
  },
]);
