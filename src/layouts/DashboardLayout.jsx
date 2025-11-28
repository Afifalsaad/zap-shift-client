import React from "react";
import { FaRegCreditCard, FaUsers } from "react-icons/fa6";
import { GrDeliver } from "react-icons/gr";
import { MdDirectionsBike } from "react-icons/md";
import { Link, Outlet } from "react-router";
import useRole from "../hooks/useRole";
import { LuNotebookPen } from "react-icons/lu";

const DashboardLayout = () => {
  const { role } = useRole();

  return (
    <div className="drawer lg:drawer-open max-w-7xl mx-auto">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost">
            {/* Sidebar toggle icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-4">
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>
          <div className="px-4">Zap Dashboard</div>
        </nav>
        {/* Page content here */}
        <Outlet></Outlet>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            {/* List item */}
            <li>
              <Link
                to="/"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Homepage">
                {/* Home icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="my-1.5 inline-block size-4">
                  <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                  <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                </svg>
                <span className="is-drawer-close:hidden">Homepage</span>
              </Link>
            </li>

            {/* My-Parcels */}
            <Link to="/dashboard/my-parcels">
              <li>
                <button
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="My-Parcels">
                  {/* Parcel icon */}
                  <GrDeliver />
                  <span className="is-drawer-close:hidden">My Parcels</span>
                </button>
              </li>
            </Link>

            {/* Payment History */}
            <Link to={"/dashboard/payment-history"}>
              <li>
                <button
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Payment History">
                  {/* Card icon */}
                  <FaRegCreditCard />
                  <span className="is-drawer-close:hidden">
                    Payment History
                  </span>
                </button>
              </li>
            </Link>

            {role === "admin" && (
              <>
                {/* Approve Rider */}
                <Link to={"/dashboard/approve-rider"}>
                  <li>
                    <button
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="Approve rider">
                      {/* Card icon */}
                      <MdDirectionsBike />
                      <span className="is-drawer-close:hidden">
                        Approve rider
                      </span>
                    </button>
                  </li>
                </Link>

                {/* Assign Riders */}
                <Link to={"/dashboard/assign-riders"}>
                  <li>
                    <button
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="Assign riders">
                      {/* Card icon */}
                      <LuNotebookPen />
                      <span className="is-drawer-close:hidden">
                        Assign riders
                      </span>
                    </button>
                  </li>
                </Link>

                {/* Users Management */}
                <Link to={"/dashboard/users-management"}>
                  <li>
                    <button
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="Manage Users">
                      {/* Card icon */}
                      <FaUsers></FaUsers>
                      <span className="is-drawer-close:hidden">
                        Manage Users
                      </span>
                    </button>
                  </li>
                </Link>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
