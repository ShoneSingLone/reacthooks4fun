import type { RouteObject } from "react-router-dom";
import { Outlet, Link, useParams } from "react-router-dom";

export let routes: RouteObject[] = [
  {
    path: "/",
    element: <Outlet />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "/courses",
        element: <Courses />,
        children: [
          { index: true, element: <CoursesIndex /> },
          { path: "/courses/:id", element: <Course /> },
        ],
      },
      { path: "*", element: <NoMatch /> },
    ],
  },
];

export function ConsoleNav() {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/courses">Courses</Link>
      </li>
      <li>
        <Link to="/nothing-here">Nothing Here</Link>
      </li>
    </ul>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function Courses() {
  return (
    <>
      <h2>Courses</h2>
      <Outlet />
    </>
  );
}

function CoursesIndex() {
  return (
    <div>
      <p>列表</p>
      <nav>
        <ul>
          <li>
            <Link to="react-fundamentals">React Fundamentals</Link>
          </li>
          <li>
            <Link to="advanced-react">Advanced React</Link>
          </li>
          <li>
            <Link to="react-router">React Router</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

function Course() {
  let { id } = useParams<"id">();
  return (
    <div>
      <h2>
        Welcome to the {id!.split("-").map(capitalizeString).join(" ")} course!
      </h2>

      <p>This is a great course. You're gonna love it!</p>

      <Link to="/courses">See all courses</Link>
    </div>
  );
}

function capitalizeString(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function NoMatch() {
  return (
    <div>
      <h2>It looks like you're lost...</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}
