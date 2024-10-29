import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react"
import "@testing-library/jest-dom/vitest"

// runs cleanup (clearing jsdom) after each test case 
afterEach(() => {
    cleanup();
})