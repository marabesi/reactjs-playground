import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="">
      <h1 className="text-2xl">Contact list</h1>
      <p>Made following <a href="https://remix.run/docs/en/main/start/tutorial" className="underline">remix tutorial</a></p>
    </div>
  );
}
