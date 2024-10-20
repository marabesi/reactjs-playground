import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  Form,
  NavLink,
  useNavigation,
  useSubmit,
} from "@remix-run/react";
import type {
  LinksFunction, LoaderFunctionArgs,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { ContactRecord, getContacts, createEmptyContact } from "./data";

import "./tailwind.css";
import { useEffect } from "react";

export const loader = async ({
  request,
}: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const contacts = await getContacts(q);
  return json({ contacts, q });
};

export const action = async () => {
  const contact = await createEmptyContact();
  return redirect(`/contacts/${contact.id}/edit`);
};

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const { contacts, q } = useLoaderData<typeof loader>();
  const submit = useSubmit();
  const navigation = useNavigation();

  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has(
      "q"
    );
  useEffect(() => {
    const searchField = document.getElementById("q");
    if (searchField instanceof HTMLInputElement) {
      searchField.value = q || "";
    }
  }, [q]);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div className="flex">
          <nav>
            <Form role="search" onChange={(event) =>
              submit(event.currentTarget)
            }>
              <input type="text" name="q" defaultValue={q || ""} className={searching ? "loading" : ""}/>
              <div
                aria-hidden
                hidden={!searching}
                id="search-spinner"
              />
            </Form>
            <Form
              method="post"
            >
              <button type="submit">New</button>
            </Form>
            {contacts.length ? (
              <ul>
                {contacts.map((contact: ContactRecord) => (
                  <li key={contact.id}>
                    <NavLink
                      className={({ isActive, isPending }) =>
                        isActive
                          ? "bg-gray-500"
                          : isPending
                            ? "pending"
                            : ""
                      }
                      to={`contacts/${contact.id}`}
                    >
                      {contact.first || contact.last ? (
                        <>
                          {contact.first} {contact.last}
                        </>
                      ) : (
                        <i>No Name</i>
                      )}{" "}
                      {contact.favorite ? (
                        <span>★</span>
                      ) : null}
                    </NavLink>
                  </li>
                ))}
              </ul>
            ) : (
              <p>
                <i>No contacts</i>
              </p>
            )}
          </nav>
          {children}
          <p>{navigation.state === "loading" ? "loading" : ""}</p>
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const navigation = useNavigation();

  return (
    <div
      className={
        navigation.state === "loading" ? "loading" : ""
      }
      id="detail"
    >
      <Outlet />
    </div>
  );
}
