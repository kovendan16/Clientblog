import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import { useState } from "react";

import "./topbar.css";

export default function TopBar() {
  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:5000/images/";

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const postId = "share";

  const shareViaEmail = (postId) => {
    window.location.href = `mailto:?body=${encodeURIComponent(
      `Check out this blog post: ${window.location.origin}/blog/${postId}`
    )}`;
  };
  const shareViaPinterest = (postId) => {
    const pinterestUrl = `https://www.pinterest.com/pin/create/button/?url=${window.location.origin}/blog/${postId}&media=${PF}&description=Check%20out%20this%20blog%20post!`;
    window.open(pinterestUrl, "_blank", "noopener,noreferrer");
  };
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.origin);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  return (
    <div className="top">
      <div className="topLeft">
        <i
          className="topIcon fab fa-facebook-square"
          onClick={() => shareViaEmail(postId)}
        ></i>
        <i
          className="topIcon fab fa-twitter-square"
          onClick={() => shareViaEmail(postId)}
        ></i>

        <i
          className="topIcon fas fa-envelope"
          onClick={() => shareViaEmail(postId)}
        />
        <i
          className="topIcon fab fa-pinterest-square"
          onClick={() => shareViaPinterest(postId)}
        ></i>

        <i
          className="topIcon fab fa-instagram-square"
          onClick={() => shareViaEmail(postId)}
        ></i>

        <i className="topIcon fas fa-copy" onClick={handleCopy}></i>
        {isCopied && <span className="copyMsg">Copied to clipboard!</span>}
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/">
              ABOUT
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/">
              CONTACT
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/write">
              WRITE
            </Link>
          </li>
          <li className="topListItem" onClick={handleLogout}>
            {user && "LOGOUT"}
          </li>
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <Link to="/settings">
            <img className="topImg" src={PF + user.profilePic} alt="" />
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
        <i className="topSearchIcon fas fa-search"></i>
      </div>
    </div>
  );
}
