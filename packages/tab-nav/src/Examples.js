export const tabs = [
  {
    name: "Root",
    url: "/",
    exact: true
  },
  {
    name: "Test 1",
    url: `/test1`
  },
  {
    name: "Test 2",
    url: "/test2",
    exact: true
  }
];

export const isActive = (path, match, location) =>
  !!(match || path === location.pathname);
