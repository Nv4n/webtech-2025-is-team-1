import { FakeTicketApi } from "@/features/Ticket/service/ticketApi";
import { Ticket } from "@/features/Ticket/types/Ticket";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

export const useGetTicket = (id: string) => {
	const { data, isLoading } = useQuery({
		queryKey: ["tickets", id],
		queryFn: () => FakeTicketApi().getTicketList(),
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

function fetchTicketDetailsFakeApi() {
	const { data: ticketList, isLoading: isLoadingTickets } = useQuery({
		queryKey: ["tickets"],
		queryFn: () => {
			return FakeTicketApi().getTicketList();
		},
		select: (data) => {
			return Object.values(data);
		},
	});
	const { data: userList, isLoading: isLoadingUsers } = useQuery({
		queryKey: ["users"],
		queryFn: () => {
			return FakeProfileApi().getProfileList();
		},
		select: (data) => {
			return Object.values(data);
		},
	});
	const { data: projectList, isLoading: isLoadingProjects } = useQuery({
		queryKey: ["projects"],
		queryFn: () => {
			return FakeProjectApi().getProjectList();
		},
		select: (data) => {
			return Object.values(data);
		},
	});
	if (isLoadingProjects || isLoadingTickets || isLoadingUsers) {
		return [];
	}
	if (!ticketList || !userList || !projectList) {
		return [];
	}
	const ticketsWithDetails = ticketList.map((ticket) => {
		const updatedBy = userList.find((user) => user.id === ticket.updatedBy);
		const assignedTo = userList.find((user) => user.id === ticket.assignee);
		const project = projectList.find((proj) => proj.id === ticket.project);

		return {
			...ticket,
			updatedBy: updatedBy ?? fallBackProfile,
			assignedTo: assignedTo ?? fallBackProfile,
			project,
		};
	});

	return ticketsWithDetails;
}