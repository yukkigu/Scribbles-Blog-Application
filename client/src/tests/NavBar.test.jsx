import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import NavBar from "../components/NavBar";

const renderNavBar = (darkMode = true, route = "/home") => {
  // mocks submitPost function
  const submitPost = vi.fn();
  const setDarkMode = vi.fn();
  render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route
          path="/home"
          element={
            <NavBar
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              submitPost={submitPost}
              show={true}
            />
          }
        />
        <Route
          path="/about"
          element={<NavBar darkMode={darkMode} setDarkMode={setDarkMode} show={false} />}
        />
      </Routes>
    </MemoryRouter>
  );
  return { darkMode, setDarkMode };
};

describe("Navigation Bar Component", () => {
  // checks that navigation bar is rendered properly
  it("renders NavBar", () => {
    renderNavBar();
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/About/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "new" })).toBeInTheDocument();
  });

  // checks that post modal opens when 'New Post' button is clicked
  it("opens PostModal when 'New Post' button is clicked", () => {
    renderNavBar();

    // open PostModal
    fireEvent.click(screen.getByRole("button", { name: "new" }));

    expect(screen.getByText(/Create New Post/i)).toBeInTheDocument();
  });

  // checks that post modal closes when 'Close' button is clicked
  it("closes PostModal when 'onClose' is triggered by clicking 'Close'", () => {
    renderNavBar();

    // open PostModal
    fireEvent.click(screen.getByRole("button", { name: "new" }));

    // closes modal
    fireEvent.click(screen.getByText(/Close/i));
    // checks that post modal is closed
    expect(screen.queryByText(/Create new post/i)).toBeNull();
  });

  // checks that mode button changes mode of web page
  it("mode switches when dark/light icon is clicked", () => {
    const { setDarkMode } = renderNavBar(true);
    expect(screen.getByLabelText(/dark-icon/)).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText(/dark-icon/));
    expect(setDarkMode).toHaveBeenCalledWith(false);
    // simulate change from dark mode to light mode
    renderNavBar(false);
    expect(screen.getByLabelText(/light-icon/)).toBeInTheDocument();
  });

  // Checks that 'New Post' button does not appear in /about page
  it("does not render 'New Post' button on the about page", async () => {
    renderNavBar(true, "/about");

    expect(screen.queryByRole("button", { name: "new" })).toBeNull();
  });
});
