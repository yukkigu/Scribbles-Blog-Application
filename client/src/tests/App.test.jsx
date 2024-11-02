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

    // checks that axios is fetching data correctly
    expect(axios.get).toHaveBeenCalledWith(pathToServer + "/getPosts");
  });

  // checks that submit new post works properly
  it("submits new post", async () => {
    await act(async () => {
      render(<App />);
    });

    // opens PostModal
    fireEvent.click(screen.getByRole("button", { name: "new" }));
    // checks that modal is opened
    expect(screen.getByText(/Create new post/i));

    // fills the form in PostModal
    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: "Testing Post 3" },
    });
    fireEvent.change(screen.getByLabelText(/content/i), {
      target: { value: "Testing Post Content 3" },
    });

    // mocks successful post submission
    axios.post.mockResolvedValueOnce({
      data: {
        id: 3,
        username: "user3",
        title: "Testing Post 3",
        content: "Testing Post Content 3",
        date_posted: "2024-10-29",
        edited: "false",
      },
    });

    fireEvent.click(screen.getByRole("button", { name: "submit" }));
    // checks that modal is closed
    expect(screen.queryByText(/Create new post/i)).toBeNull();

    // checks that axios is posting data correctly
    expect(axios.post).toHaveBeenCalledWith(pathToServer + "/add", {
      title: "Testing Post 3",
      content: "Testing Post Content 3",
    });

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

    await waitFor(() => {
      expect(screen.getByText(/Testing Post 3/i)).toBeInTheDocument();
      expect(screen.getByText(/Testing Post Content 3/i)).toBeInTheDocument();
    });
  });

  // checks that delete post works properly
  it("delete post", async () => {
    await act(async () => {
      render(<App />);
    });

    // opens DeleteWarning Modal for first post by clilcking "Delete" button
    fireEvent.click(screen.getAllByRole("button", { name: "delete" })[0]);
    // checks that modal is opened
    expect(screen.getByText(/This action cannot be undone?/i));

    // mock axios delete response
    axios.delete.mockResolvedValueOnce({ data: { message: "Post deleted successfully" } });

    // Close modal
    fireEvent.click(screen.getAllByRole("button", { name: /Delete/i })[1]);

    // checks that axios.post is called with correct endpoint and id
    expect(axios.delete).toHaveBeenCalledWith(pathToServer + "/delete/1");

    // checks that modal is closed
    expect(screen.queryByText(/This action cannot be undone?/i)).toBeNull();

    // mocks fetching post after deleting
    axios.get.mockResolvedValueOnce({
      data: [
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

    // Wait for the state to update and ensure that the post is deleted
    await waitFor(() => {
      // check that the deleted post is no longer in the document
      expect(screen.queryByText(/Testing Post 1/i)).toBeNull();
      // checks that post 2 is still in the document
      expect(screen.getByText(/Testing Post 2/i)).toBeInTheDocument();
    });
  });
});
