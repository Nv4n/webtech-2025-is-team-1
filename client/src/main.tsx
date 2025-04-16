import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
	RouterProvider,
	createRouteMask,
	createRouter,
} from "@tanstack/react-router";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

export const homeToTicketsMask = createRouteMask({
	routeTree,
	from: "/",
	to: "/tickets",
});

// Create a new router instance
const router = createRouter({ routeTree, routeMasks: [homeToTicketsMask] });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

const queryClient = new QueryClient();

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<StrictMode>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
				<ReactQueryDevtools
					initialIsOpen={false}
					position="top"
					buttonPosition="top-right"
				/>
			</QueryClientProvider>
		</StrictMode>
	);
}
