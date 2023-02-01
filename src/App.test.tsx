import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";

const server = setupServer(
  rest.get("https://swapi.dev/api/people/1", (req, res, ctx) => {
    return res(
      ctx.json({ name: "Chewbacca", height: 220, hair_color: "brown" })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Valid tests of App", () => {
  test("renders star wars header", () => {
    render(<App />);
    const linkElement = screen.getByText(/star wars/i);
    expect(linkElement).toBeInTheDocument();
  });

  test("loads and displays star wars character", async () => {
    render(<App />);

    await waitFor(() => screen.findByText(/Name:/i));

    expect(screen.getByText("Name: Chewbacca")).toBeVisible();
    expect(screen.getByText("Height: 220")).toBeVisible();
    expect(screen.getByText("Hair Colour: brown")).toBeVisible();
  });
});

describe("Error situations for App", () => {
  test("handles server error", async () => {
    server.use(
      rest.get("https://swapi.dev/api/people/1", (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    render(<App />);

    await waitFor(() => screen.findByText(/Oops/i));
    expect(
      screen.getByText("Oops... something went wrong, try again 🤕")
    ).toBeVisible();
  });

  test("handles teapot error", async () => {
    server.use(
      rest.get("https://swapi.dev/api/people/1", (req, res, ctx) => {
        return res(ctx.status(418));
      })
    );

    render(<App />);

    await waitFor(() => screen.findByText(/tea/i));
    expect(
      screen.getByText("418 I'm a tea pot 🫖, silly")
    ).toBeVisible();
  });
});
