/**
 * @title 头-侧边栏
 * @description 头部加侧边栏，最通用的布局
 */

import { Search, Nav, Shell, Radio } from "@alicloudfe/components";
import { aBus } from "l_common";
import "./LayoutLeftContent.css";
import { t_StateApp } from "l_state/app";
import _ from "lodash";

const device_type = { phone: "phone", tablet: "tablet", desktop: "desktop" };

export function LayoutLeftContent({ content }) {
  const StateApp = aBus<t_StateApp>("StateApp");
  const onChange = (device: keyof typeof device_type) => {
    StateApp.device = device;
  };

  return (
    <div>
      {content}
      <Radio.Group
        style={{ marginBottom: "10px" }}
        onChange={onChange}
        defaultValue="desktop"
      >
        {_.map(device_type, (label, value) => (
          <Radio value={value} key={value}>
            {label}
          </Radio>
        ))}
      </Radio.Group>
      <Shell
        className={"iframe-hack"}
        device={StateApp?.device}
        style={{ border: "1px solid #eee" }}
      >
        <Shell.Branding>
          <div className="rectangular"></div>
          <span style={{ marginLeft: 10 }}>App Name</span>
        </Shell.Branding>
        <Shell.Navigation direction="hoz">
          <Search
            key="2"
            shape="simple"
            type="dark"
            palceholder="Search"
            style={{ width: "200px" }}
          />
        </Shell.Navigation>
        <Shell.Action>
          <img
            src="https://img.alicdn.com/tfs/TB1.ZBecq67gK0jSZFHXXa9jVXa-904-826.png"
            className="avatar"
            alt="用户头像"
          />
          <span style={{ marginLeft: 10 }}>MyName</span>
        </Shell.Action>

        <Shell.Navigation>
          <Nav embeddable aria-label="global navigation">
            <Nav.Item icon="account">Nav Item 1</Nav.Item>
            <Nav.Item icon="calendar">Nav Item 2</Nav.Item>
            <Nav.Item icon="atm">Nav Item 3</Nav.Item>
            <Nav.Item icon="account">Nav Item 4</Nav.Item>
            <Nav.Item icon="account">Nav Item 5</Nav.Item>
            <Nav.Item icon="account">Nav Item 6</Nav.Item>
            <Nav.Item icon="account">Nav Item 7</Nav.Item>
          </Nav>
        </Shell.Navigation>

        <Shell.Content>
          <div style={{ minHeight: 1200, background: "#fff" }}></div>
        </Shell.Content>
      </Shell>
    </div>
  );
}
