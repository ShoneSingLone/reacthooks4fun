import { useRoutes } from "react-router-dom";
import { routes } from "./ConsoleNav";
export function ConsoleMain() {
  let element = useRoutes(routes);
  return element;
}
