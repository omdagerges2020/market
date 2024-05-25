import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <section>
      <div className="container">
        <div className="text">
          <h1>Page Not Found</h1>
          <p>
            We can't seem to find the page you're looking for. Please check the
            URL for any typos.
          </p>
          <div className="input-box">
            <input type="text" placeholder="Search..." />
            <button>
              <i className="fa-solid fa-search"></i>
            </button>
          </div>
          <ul className="menu">
            <li>
              <Link href="#">Go to Homepage</Link>
            </li>
            <li>
              <Link href="#">Visit our Blog</Link>
            </li>
            <li>
              <Link href="#">Contact support</Link>
            </li>
          </ul>
        </div>
        <div>
          <img className="image" src="errorimg.png" alt="" />
        </div>
      </div>
    </section>
  );
};

export default PageNotFound;
