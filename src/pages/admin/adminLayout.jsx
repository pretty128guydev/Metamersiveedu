import React from "react";
import {
  UserOutlined,
  DollarOutlined,
  OrderedListOutlined,
  UserSwitchOutlined,
  UsergroupAddOutlined,
  MoneyCollectOutlined,
  GroupOutlined,
} from "@ant-design/icons";
import {
  Link,
  useRoutes,
  Route,
  Routes,
  useParams,
  useNavigate,
} from "react-router-dom";
import { Menu, Switch, Row, Col } from "antd";
import { useState } from "react";

import AdminRoute from "../../config/admin-route";

import "./adminLayout.scss";
import useLanguageToggle from "../../hooks/useLanguageToggle";

const MainRoutes = () => {
  const element = useRoutes(AdminRoute);

  return element;
};

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem("User Management", "user", <UserOutlined />, [
    getItem("Teachers", "teachers", <UserSwitchOutlined />),
    getItem("Students", "students", <UsergroupAddOutlined />),
  ]),
  // getItem('Pay Management', '/admin/pay', 'pay', <DollarOutlined />, [
  //   getItem('Teachers', '/admin/pay/teachers', 'paid-teachers'),
  //   getItem('Students', '/admin/pay/students', 'paid-students'),
  //   getItem('Pay-Method', '/admin/pay/method', 'pay-method', <MoneyCollectOutlined />, [getItem('PayPal', 'paypal'), getItem('PayOneer', 'payoneer'), getItem('CryptoCurrency', 'crypto')]),
  // ]),
  // getItem("Class Management", "class", <OrderedListOutlined />, [
  //   getItem("Romeo And Juliet", "rAndJ", <GroupOutlined />),
  //   getItem("Computer PRoject", "computer", <GroupOutlined />),
  //   getItem("Quiz Game", "quizGame", <GroupOutlined />),
  // ]),
];

const AdminLayout = () => {
  const { translate } = useLanguageToggle();

  const [theme, setTheme] = useState("light");
  const [current, setCurrent] = useState("1");
  // const { schoolId } = useParams();
  const navigate = useNavigate();

  const changeTheme = (value) => {
    setTheme(value ? "dark" : "light");
  };

  const onClick = (e) => {
    setCurrent(e.key);
    navigate(e.key);
  };

  return (
    <div className="admin-layout">
      <div className="header">
        <span className="welcome-text">
          {translate("welcome-to-admin-page")}
        </span>
        <Switch
          checked={theme === "dark"}
          onChange={changeTheme}
          checkedChildren="Dark"
          unCheckedChildren="Light"
        />
      </div>
      <Row className="body">
        <Col xs={24} sm={12} md={6} lg={6} xl={6} className="left-pane">
          <Menu
            className="left-menu"
            theme={theme}
            mode="inline"
            onClick={onClick}
            defaultOpenKeys={["user"]}
            selectedKeys={[current]}
            items={items}
          />
        </Col>
        <Col xs={24} sm={12} md={18} lg={18} xl={18} className="right-pane">
          <Routes>
            <Route path="*" element={<MainRoutes />} />
          </Routes>
        </Col>
      </Row>
    </div>
  );
};

export default AdminLayout;
