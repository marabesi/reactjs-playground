import { describe, test } from "vitest";
import { createRemixStub } from "@remix-run/testing";
import {
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import Index from "../app/routes/_index";

describe("contact list", () => {
  test("renders contact list", async () => {
  
    const RemixStub = createRemixStub([
      {
        path: "/",
        Component: Index,
      },
    ]);
  
    render(<RemixStub />);

    await waitFor(() => screen.findByText("Contact list"));
  });
});
