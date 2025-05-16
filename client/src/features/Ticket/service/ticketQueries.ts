import { FakeTicketApi } from "@/features/Ticket/service/ticketApi";
import { Ticket } from "@/features/Ticket/types/Ticket";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

export const useGetTicket = (id: string) => {
	const { data, isLoading } = useQuery({
		queryKey: ["tickets", id],
		queryFn: () => FakeTicketApi().getTicketDetails(),
		select: (data) => {
			return Object.entries(data).filter(([key, _]) => key === id)[0][1];
		},
	});

	return { data, isLoading };
};

export const useUpdateTicket = (id: string) => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: (data: Ticket) => {
			return FakeTicketApi().updateTicket(data);
		},
		onSuccess: () => {
			toast.success("Ticket updated successfully!");
			queryClient.invalidateQueries({ queryKey: ["tickets", id] });
			navigate({
				to: "/tickets/$ticketId",
				params: { ticketId: id },
			});
		},
		onError: () => {
			toast.error("Failed to create ticket.");
		},
	});
	return { mutation };
};
