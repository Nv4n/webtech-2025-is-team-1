import { serverAddr } from "@/config/config";
import { getCookie } from "@/features/Auth/utils/cookies";
import { Ticket, TicketSchema } from "@/features/Ticket/types/Ticket";
import { TicketFilter } from "@/features/Ticket/types/TicketFilter";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { z } from "zod";

export function useGetApiTickets(filter?: TicketFilter) {
	if (filter) {
		return useGetApiFilteredTickets(filter);
	}
	return useGetApiAllTickets();
}

export function useGetApiFilteredTickets(filter: TicketFilter) {
	const { data, isLoading } = useQuery({
		queryKey: ["tickets", filter],
		queryFn: async () => {
			const res = await fetch(`${serverAddr}/api/tickets/`, {
				method: "GET",
				headers: {
					Authorization: `Bearer ${getCookie("authtoken")}`,
					"Content-Type": "application/json",
				},
			});

			if (!res.ok) {
				console.error("Fetch error:", res.status, res.statusText);
				toast.error("Server error");
			}
			const ticketsResp = await res.json();

			const parsedTickets = z.array(TicketSchema).safeParse(ticketsResp);

			if (parsedTickets.success) {
				console.log(parsedTickets.data);

				return parsedTickets.data;
			} else {
				console.error("Parse error:", parsedTickets.error.message);
				toast.error("Couldn't read tickets data");
			}
		},
	});
	return { data, isLoading };
}

export function useGetApiAllTickets() {
	const { data, isLoading } = useQuery({
		queryKey: ["tickets"],
		queryFn: async () => {
			const res = await fetch(`${serverAddr}/api/tickets/`, {
				method: "GET",
				headers: {
					Authorization: `Bearer ${getCookie("authtoken")}`,
					"Content-Type": "application/json",
				},
			});

			if (!res.ok) {
				console.error("Fetch error:", res.status, res.statusText);
				toast.error("Server error");
			}
			const ticketsResp = await res.json();

			const parsedTickets = z.array(TicketSchema).safeParse(ticketsResp);

			if (parsedTickets.success) {
				console.log(parsedTickets.data);

				return parsedTickets.data;
			} else {
				console.error("Parse error:", parsedTickets.error.message);
				toast.error("Couldn't read tickets data");
			}
		},
	});
	return { data, isLoading };
}

export const useGetApiTicket = (id: string) => {
	const { data, isLoading } = useQuery({
		queryKey: ["tickets", id],
		queryFn: async () => {
			const res = await fetch(`${serverAddr}/api/tickets/${id}`, {
				headers: {
					Authorization: `Bearer ${getCookie("authtoken")}`,
				},
			});

			const jsonedTicket = await res.json();
			const parsedTicket = TicketSchema.safeParse(jsonedTicket);
			if (parsedTicket.success) {
				return parsedTicket.data;
			} else {
				console.log(`${parsedTicket.error}`);
			}
		},
	});
	return { data, isLoading };
};

export const useUpdateApiTicket = (id: string) => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { mutate } = useMutation({
		mutationFn: async (data: Ticket) => {
			return await fetch(`${serverAddr}/api/tickets/${id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${getCookie("authtoken")}`,
				},
				body: JSON.stringify(data),
			});
		},
		onSuccess: () => {
			toast.success("Ticket updated successfully!");
			queryClient.invalidateQueries({
				queryKey: ["tickets", id],
			});
			navigate({
				to: "/tickets/$ticketId",
				params: { ticketId: id },
			});
		},
		onError: () => {
			toast.error("Failed to update ticket.");
		},
	});
	return { mutate };
};
