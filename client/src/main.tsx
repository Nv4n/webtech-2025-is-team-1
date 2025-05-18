import { Toaster } from "@/components/ui/sonner";
import { routeTree } from "@/routeTree.gen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
	RouterProvider,
	createRouteMask,
	createRouter,
} from "@tanstack/react-router";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

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

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 20_000,
		},
	},
});

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
				<Toaster />
			</QueryClientProvider>
		</StrictMode>
	);
}
