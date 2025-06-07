import { ProjectWorkflow } from "@/features/Workflow/components/ProjectWorkflow";
import { EdgeSchema, NodeSchema } from "@/features/Workflow/types/ReactFlow";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Edge,
	EdgeChange,
	MarkerType,
	Node,
	NodeChange,
	addEdge,
	applyEdgeChanges,
	applyNodeChanges,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
	name: z.string().min(1),
	nodes: z.array(NodeSchema),
	edges: z.array(EdgeSchema),
});

export const ProjectCreateForm = () => {
	const [initialNodes, setNodes] = useState<Node[]>([]);
	const [initialEdges, setEdges] = useState<Edge[]>([]);

	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			nodes: [],
			edges: [],
		},
	});

	useEffect(() => {
		// Replace with your API call
		const fetchStatuses = async () => {
			const statuses = [
				{ id: "todo", label: "To Do" },
				{ id: "inprogress", label: "In Progress" },
				{ id: "done", label: "Done" },
			];

			const nodes: Node[] = statuses.map((s, i) => ({
				id: s.id,
				type: "baseNode",
				position: { x: i * 150, y: 150 },
				data: { label: s.label },
			}));

			setNodes(nodes);
			setEdges([]);
		};

		fetchStatuses();
	}, []);

	const onNodesChange = useCallback(
		(changes: NodeChange<Node>[]) => {
			setNodes((nds) => {
				console.log(nds);
				console.log(changes);

				return applyNodeChanges(changes, nds);
			});
			form.setValue("nodes", z.array(NodeSchema).parse(initialNodes));
		},
		[setNodes]
	);

	const onEdgesChange = useCallback(
		(changes: EdgeChange<Edge>[]) => {
			setEdges((edgs) => applyEdgeChanges(changes, edgs));
			// setValue("edges", z.array(EdgeSchema).parse(initialEdges));
		},
		[setEdges]
	);

	form.setValue("nodes", z.array(NodeSchema).parse(initialNodes));

	const onSubmit = (data: unknown) => {
		console.log("Form Submitted:", data);
	};

	return (
		<ProjectWorkflow
			nodes={initialNodes}
			edges={initialEdges.map((e) => ({
				...e,
				type: "directional",
				markerEnd: { type: MarkerType.ArrowClosed },
				sourceHandle: e.sourceHandle ?? null,
				targetHandle: e.targetHandle ?? null,
			}))}
			onNodesChange={onNodesChange}
			onEdgesChange={onEdgesChange}
			onConnect={(params) => {
				const newEdge: Edge = {
					...params,
					id: `${params.source}-${params.target}`,
					type: "baseNode",
					markerEnd: { type: MarkerType.ArrowClosed },
					sourceHandle: null,
					targetHandle: null,
				};
				form.setValue(
					"edges",
					z.array(EdgeSchema).parse(addEdge(newEdge, initialEdges))
				);
			}}
		/>
	);
};
