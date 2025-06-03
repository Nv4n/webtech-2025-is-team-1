import { useEffect, useState, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
	ReactFlow,
	ReactFlowProvider,
	addEdge,
	Controls,
	Background,
	MiniMap,
	MarkerType,
	useReactFlow,
	EdgeProps,
	Connection,
	Node,
	Edge,
	OnNodesChange,
	OnEdgesChange,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const nodeSchema = z.object({
	id: z.string(),
	type: z.string(),
	position: z.object({ x: z.number(), y: z.number() }),
	data: z.object({ label: z.string() }),
});

const edgeSchema = z.object({
	id: z.string(),
	source: z.string(),
	target: z.string(),
	label: z.string().optional(),
});

const formSchema = z.object({
	name: z.string().min(1),
	nodes: z.array(nodeSchema),
	edges: z.array(edgeSchema),
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

export default function CreateProjectForm() {
	const [initialNodes, setInitialNodes] = useState<Node[]>([]);
	const [initialEdges, setInitialEdges] = useState<Edge[]>([]);

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

			setInitialNodes(nodes);
			setInitialEdges([]);
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

	useEffect(() => {
		setValue("nodes", initialNodes);
		setValue("edges", initialEdges);
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
							render={() => null} // Just track it
						/>
						<Controller
							control={control}
							name="edges"
							render={() => null} // Just track it
						/>

						<FlowEditor
							nodes={nodes}
							edges={edges.map((e) => ({
								...e,
								type: "custom",
								markerEnd: { type: MarkerType.ArrowClosed },
							}))}
							onNodesChange={(changes) =>
								setValue("nodes", changes)
							}
							onEdgesChange={(changes) =>
								setValue("edges", changes)
							}
							onConnect={(params) => {
								const newEdge = {
									...params,
									id: `${params.source}-${params.target}`,
									type: "custom",
									markerEnd: { type: MarkerType.ArrowClosed },
								};
								setValue("edges", addEdge(newEdge, edges));
							}}
						/>

						<Button type="submit">Create Project</Button>
					</CardContent>
				</Card>
			</form>
		</ReactFlowProvider>
	);
}
