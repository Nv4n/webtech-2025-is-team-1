import { serverAddr } from "@/config/config";
import { getCookie, deleteCookie } from "@/features/Auth/utils/cookies";
import { TicketSchema } from "@/features/Ticket/types/Ticket";
import { TicketFilter } from "@/features/Ticket/types/TicketFilter";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { z } from "zod";

export function useGetFilteredTickets(filter: TicketFilter) {
	const navigate = useNavigate();
	const { data, isLoading } = useQuery({
		queryKey: ["tickets"],
		queryFn: async () => {
			const res = await fetch(`${serverAddr}/api/tickets/`, {
				method: "GET",
				headers: {
					Authorization: `Bearer ${getCookie("authtoken")}`,
					"Content-Type": "application/json",
				},
				// body: JSON.stringify(filter),
			});
			// console.log(res);

			if (!res.ok) {
				console.error("Fetch error:", res.status, res.statusText);
				// deleteCookie("authtoken");
				// navigate({ to: "/login" });
			}
			const ticketsResp = await res.json();

			const parsedTickets = z.array(TicketSchema).safeParse(ticketsResp);

			// console.log(parsedTickets);

			if (parsedTickets.success) {
				// console.log("success");
				console.log(parsedTickets.data);

				return parsedTickets.data;
			} else {
				console.error("Parse error:", parsedTickets.error.message);
				// deleteCookie("authtoken");
				// navigate({ to: "/login" });
			}
		},
	});
	return { data, isLoading };
}
