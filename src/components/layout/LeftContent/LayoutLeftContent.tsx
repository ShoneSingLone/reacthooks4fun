import "./LayoutLeftContent.css";
import _ from "lodash";

export function LayoutLeftContent({
  nav,
  main,
}: {
  nav: JSX.Element;
  main: JSX.Element;
}) {
  return (
    <div className="layout-container-left-content flex">
      <div>{nav}</div>
      <div>{main}</div>
    </div>
  );
}
