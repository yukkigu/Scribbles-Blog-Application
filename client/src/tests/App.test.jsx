import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import App from "../components/App";
import axios from "axios";

const pathToServer = "http://localhost:8080";

// mock axios
vi.mock("axios");

describe("App Component", () => {
  // mocks posts to be returned when axios.get is called
  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: [
        {
          id: 1,
          username: "user1",
          title: "Testing Post 1",
          content: "Testing Post Content 1",
          date_posted: "2024-10-28",
          edited: "false",
        },
        {
          id: 2,
          username: "user2",
          title: "Testing Post 2",
          content: "Testing Post Content 2",
          date_posted: "2024-10-29",
          edited: "true",
        },
      ],
    });
  });

  // checks that App, NavBar, and Message Components are rendered correctly
  it("renders the App component with NavBar and Message", async () => {
    // act() is needed because <App /> calls an async function fetchPosts()
    // which updates the state of postArr
    await act(async () => {
      render(<App />);
    });

    // NavBar renders
    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/About/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "new" })).toBeInTheDocument();

    // Message renders
    expect(
      screen.getByRole("heading", { name: /Welcome to Scribbles!/i, level: 1 })
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(
        /This is a platform for users to freely write and share their interests. Feel free to contribute by adding new posts./i
      )
    );
  });

  // checks that fetch functionality works
  it("fetches and displays posts", async () => {
    render(<App />);

    // wait for posts to be displayed
    const post1 = await screen.findByText(/Testing Post 1/i);
    const post2 = await screen.findByText(/Testing Post 2/i);

    expect(post1).toBeInTheDocument();
    expect(post2).toBeInTheDocument();

    // check that axios is fetching data correctly
    expect(axios.get).toHaveBeenCalledWith(pathToServer + "/getPosts");
  });

  it("submits new post", async () => {
    // mocks successful post submission
    axios.post.mockResolvedValue({
      data: {
        id: 3,
        username: "user3",
        title: "Testing Post 3",
        content: "Testing Post Content 3",
        date_posted: "2024-10-29",
        edited: "false",
      },
    });
    await act(async () => {
      render(<App />);
    });

    // opens PostModal
    fireEvent.click(screen.getByRole("button", { name: "new" }));

    // fills the form in PostModal
    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: "Testing Post 3" },
    });
    fireEvent.change(screen.getByLabelText(/content/i), {
      target: { value: "Testing Post Content 3" },
    });

    fireEvent.click(screen.getByRole("button", { name: "submit" }));

    // mocks fetching posts after submission
    axios.get.mockResolvedValueOnce({
      data: [
        {
          id: 1,
          username: "user1",
          title: "Testing Post 1",
          content: "Testing Post Content 1",
          date_posted: "2024-10-28",
          edited: "false",
        },
        {
          id: 2,
          username: "user2",
          title: "Testing Post 2",
          content: "Testing Post Content 2",
          date_posted: "2024-10-29",
          edited: "true",
        },
        {
          id: 3,
          username: "user3",
          title: "Testing Post 3",
          content: "Testing Post Content 3",
          date_posted: "2024-10-29",
          edited: "false",
        },
      ],
    });

    const post3 = await screen.findByText(/Testing Post 3/i);
    expect(post3).toBeInTheDocument();
  });
});
