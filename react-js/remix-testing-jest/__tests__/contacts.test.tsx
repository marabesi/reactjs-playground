import React from "react";
import { json } from "@remix-run/node";
import { createRemixStub } from "@remix-run/testing";
import {
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import Index from "../app/routes/_index";

test("renders loader data", async () => {
  // ⚠️ This would usually be a component you import from your app code
  

  const RemixStub = createRemixStub([
    {
      path: "/",
      Component: Index,
      loader() {
        return json({ message: "hello" });
      },
    },
  ]);

  render(<RemixStub />);

  await waitFor(() => screen.findByText("Contact list"));
});
