import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import NavBar from "../components/NavBar";
import axios from "axios";

const pathToServer = "http://localhost:8080";

describe("Navigation Bar Component", () => {
  // NavBar renders
  it("renders NavBar", () => {
    // mocks submitPost function
    const submitPost = vi.fn();
    render(<NavBar submitPost={submitPost} />);
  });
});
