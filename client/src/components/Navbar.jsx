import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Menu, Button } from "antd";
import Icon, {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  EllipsisOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { logout } from "../slices/auth/authSlice";
import "../styling/navbar-styles.css";

import {ReactComponent as UserIcon} from '../assets/user-icon.svg'

const items = [
  {
    label: "Navigation One",
    key: "mail",
    icon: <MailOutlined />,
  },
  {
    label: "Navigation Two",
    key: "app",
    icon: <AppstoreOutlined />,
    disabled: true,
  },
  {
    label: (
      <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
        Navigation Four - Link
      </a>
    ),
    key: "alipay",
  },
  {
    label: "",
    key: "SubMenu",
    icon: <UserOutlined style={{ fontSize: '1.25rem' }}/>,
    children: [
      {
        type: "group",
        label: "Item 1",
        children: [
          {
            label: "Option 1",
            key: "setting:1",
          },
          {
            label: "Option 2",
            key: "setting:2",
          },
        ],
      },
      {
        type: "group",
        label: "Item 2",
        children: [
          {
            label: "Option 3",
            key: "setting:3",
          },
          {
            label: "Option 4",
            key: "setting:4",
          },
        ],
      },
    ],
  },
  {
    key: "sheesh",
    label: "Okay Sure"
  }
];

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.auth.loading);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [current, setCurrent] = React.useState("mail");

  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  const handleLogout = () => {
    dispatch(logout());
    return navigate("/");
  };

  const authLinks = (
    <>
      <Button onClick={handleLogout}>Logout</Button>
    </>
  );

  const guestLinks = (
    <>
      <Link to="/register">
        <button>REGISTER</button>
      </Link>
      <Link to="/login">
        <button>LOGIN</button>
      </Link>
    </>
  );

  return (
    <div>
      <h1>Navbar</h1>
      {!loading && <>{isAuthenticated ? authLinks : guestLinks}</>}
      <div className="navbar-menu-wrapper">
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={items}
          style={{ justifyContent: "center" }}
          overflowedIndicator={<EllipsisOutlined />}
        />
      <Icon component={UserIcon} style={{ fontSize: '2rem', alignSelf: 'center' }}/>
      </div>
      ;
    </div>
  );
};

export default Navbar;
