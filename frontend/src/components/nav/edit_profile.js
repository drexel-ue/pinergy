import React from "react";
import { Link, withRouter } from "react-router-dom";
import "./edit_profile.css";

class EditProfile extends React.Component {
  render() {
    return (
      <div className="ProfileMain">
        <div className="Sidebar">
          <ul className="SidebarItems">
            <li className="SidebarLi">Edit profile</li>
            <li className="SidebarLi">Account settings</li>
            <li className="SidebarLi"> Claim</li>
            <li className="SidebarLi">Notifications</li>
            <li className="SidebarLi">Privacy & data</li>
            <li className="SidebarLi">Security</li>
            <li className="SidebarLi">Apps</li>
          </ul>
        </div>
        <div className="ProfileText">
          <div className="ProfileTitle">
            <div>
              <div className="PageHeader">Edit Profile </div>
              <div className="Byline">
                People on Pinterest will get to know you with the info below
              </div>
            </div>
            {/* <div> */}
            <button className="EditProfileButtons">Cancel</button>
            <button className="EditProfileButtons">Done</button>
            {/* </div> */}
          </div>
          <div className="PhotoSection">
            <div>
              <div className="PhotoTag">Photo</div>
              <div>UserPhoto</div>
            </div>
            <button className="EditProfileButtons">Change</button>
          </div>
          <div className="PhotoTag"> Display name</div>
          <input type="text" placeholder="Display Name" className="Input1" />
          <div className="PhotoTag"> Username</div>
          <div className="UrlTag">
            <div>www.pinergy.com/</div>
            <input type="text" placeholder="User Name" className="Input2" />
          </div>
          <div className="PhotoTag">About your profile</div>
          <textarea className="AboutInput"></textarea>
          <div className="PhotoTag">Location</div>
          <input type="text" placeholder="location" className="Input1" />
          <div className="PhotoTag">Featured Boards</div>
          <div>
            {" "}
            Make your best ideas the first ones people see. <b>Learn More</b>
          </div>
          <button className="EditProfileButtons">Edit</button>
        </div>
      </div>
    );
  }
}

export default EditProfile;
