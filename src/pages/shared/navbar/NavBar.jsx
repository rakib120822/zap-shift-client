import { Link, NavLink } from "react-router";
import Logo from "../../../component/Logo/Logo";
import useAuth from "../../../hooks/useAuth";
import { Links } from "react-router";

function NavBar() {
  const { user, logOut } = useAuth();
  const links = (
    <>
      <li>
        <NavLink>Services</NavLink>
      </li>
      <li>
        <NavLink>About us</NavLink>
      </li>
      <li>
        <NavLink to={"/send-parcel"}>Send Parcel</NavLink>
      </li>
      <li>
        <NavLink to={"/coverage"}>Coverage</NavLink>
      </li>

      {user ? (
        <>
          <li>
            <NavLink to={"/dashboard/my-parcels"}>My Parcels</NavLink>
          </li>
        </>
      ) : (
        ""
      )}
    </>
  );

  const handleLogOut = () => {
    logOut()
      .then()
      .catch((err) => console.log(err));
  };

  return (
    <div className="navbar bg-base-100 shadow-sm px-5 py-2">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <Link to={"/"} className=" text-xl">
          <Logo />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <a onClick={handleLogOut} className="btn">
            Log Out
          </a>
        ) : (
          <Link to={"/auth/login"} className="btn">
            Sign In
          </Link>
        )}

        <Link to={"/rider"} className="btn btn-primary text-black mx-2">
          Be a Rider
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
