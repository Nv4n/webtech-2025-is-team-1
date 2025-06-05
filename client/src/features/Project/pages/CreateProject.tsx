import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { EdgeSchema, NodeSchema } from "@/features/Workflow/types/ReactFlow";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Background,
	Connection,
	Controls,
	Edge,
	EdgeChange,
	EdgeProps,
	MarkerType,
	MiniMap,
	Node,
	NodeChange,
	OnEdgesChange,
	OnNodesChange,
	ReactFlow,
	ReactFlowProvider,
	addEdge,
	applyEdgeChanges,
	applyNodeChanges,
	useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
	name: z.string().min(1),
	nodes: z.array(NodeSchema),
	edges: z.array(EdgeSchema),
});

type CustomEdgeProps = EdgeProps;

const CustomEdge = ({
	id,
	sourceX,
	sourceY,
	targetX,
	targetY,
	markerEnd,
}: CustomEdgeProps) => {
	return (
		<g>
			<path
				id={id}
				d={`M${sourceX},${sourceY} L${targetX},${targetY}`}
				stroke="#000"
				strokeWidth={2}
				markerEnd={markerEnd}
				fill="none"
			/>
			<text
				x={(sourceX + targetX) / 2}
				y={(sourceY + targetY) / 2 - 5}
				textAnchor="middle"
				style={{ fontSize: 12 }}
			>
				{`${id}`}
			</text>
		</g>
	);
};

const edgeTypes = {
	custom: CustomEdge,
};

type FlowEditorProps = {
	nodes: Node[];
	edges: Edge[];
	onNodesChange: OnNodesChange;
	onEdgesChange: OnEdgesChange;
	onConnect: (connection: Connection) => void;
};

function FlowEditor({
	nodes,
	edges,
	onNodesChange,
	onEdgesChange,
	onConnect,
}: FlowEditorProps) {
	const { setEdges } = useReactFlow();

	const handleDeleteEdge = useCallback(
		(event: KeyboardEvent) => {
			if (event.key === "Delete" || event.key === "Backspace") {
				setEdges((eds) => eds.filter((e) => !e.selected));
			}
		},
		[setEdges]
	);

	useEffect(() => {
		document.addEventListener("keydown", handleDeleteEdge);
		return () => document.removeEventListener("keydown", handleDeleteEdge);
	}, [handleDeleteEdge]);

	return (
		<div className="h-96 w-full rounded border">
			<ReactFlow
				nodes={nodes}
				edges={edges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				onConnect={onConnect}
				edgeTypes={edgeTypes}
				fitView
			>
				<Controls />
				<MiniMap />
				<Background />
			</ReactFlow>
		</div>
	);
}

export const CreateProjectForm = () => {
	const [initialNodes, setNodes] = useState<Node[]>([]);
	const [initialEdges, setEdges] = useState<Edge[]>([]);

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
				type: "default",
				position: { x: i * 150, y: 100 },
				data: { label: s.label },
			}));

			setNodes(nodes);
			setEdges([]);
		};

		fetchStatuses();
	}, []);

	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			nodes: [],
			edges: [],
		},
	});

	const { handleSubmit, register, setValue, control, watch } = form;
	const onNodesChange = useCallback(
		(changes: NodeChange<Node>[]) => {
			setNodes((nds) => applyNodeChanges(changes, nds));
			setValue("nodes", z.array(nodeSchema).parse(initialNodes));
		},
		[setNodes, initialNodes, setValue]
	);

	const onEdgesChange = useCallback(
		(changes: EdgeChange<Edge>[]) => {
			setEdges((edgs) => applyEdgeChanges(changes, edgs));
			setValue("edges", z.array(edgeSchema).parse(initialEdges));
		},
		[setEdges, initialEdges, setValue]
	);

	useEffect(() => {
		setValue("nodes", z.array(nodeSchema).parse(initialNodes));
		setValue("edges", z.array(edgeSchema).parse(initialEdges));
	}, [initialNodes, initialEdges, setValue]);

	const nodes = watch("nodes");
	const edges = watch("edges");

	const onSubmit = (data: unknown) => {
		console.log("Form Submitted:", data);
	};

	return (
		<ReactFlowProvider>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
				<Card>
					<CardContent className="space-y-4 p-4">
						<Input
							{...register("name" as const)}
							placeholder="Project Name"
						/>

						<Controller
							control={control}
							name="nodes"
							render={() => <></>}
						/>
						<Controller
							control={control}
							name="edges"
							render={() => <></>}
						/>

						<FlowEditor
							nodes={nodes}
							edges={edges.map((e) => ({
								...e,
								type: "custom",
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
									type: "custom",
									markerEnd: { type: MarkerType.ArrowClosed },
									sourceHandle: null,
									targetHandle: null,
								};
								setValue(
									"edges",
									z
										.array(EdgeSchema)
										.parse(addEdge(newEdge, edges))
								);
							}}
						/>

						<Button type="submit">Create Project</Button>
					</CardContent>
				</Card>
			</form>
		</ReactFlowProvider>
	);
};
