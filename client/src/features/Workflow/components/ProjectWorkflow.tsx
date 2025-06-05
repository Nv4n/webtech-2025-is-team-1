import { BaseNode } from "@/components/base-node";
import { DirectionalEdge } from "@/components/directional-edge";
import {
	Edge,
	OnNodesChange,
	OnEdgesChange,
	Connection,
	useReactFlow,
	ReactFlow,
	Controls,
	MiniMap,
	Background,
	Node,
	ReactFlowProvider,
} from "@xyflow/react";
import { useCallback, useEffect } from "react";

const nodeTypes = {
	baseNode: BaseNode,
};

const edgeTypes = {
	directional: DirectionalEdge,
};

type FlowEditorProps = {
	nodes: Node[];
	edges: Edge[];
	onNodesChange: OnNodesChange;
	onEdgesChange: OnEdgesChange;
	onConnect: (connection: Connection) => void;
};

const rfStyle = {
	backgroundColor: "#B8CEFF",
};

function Workflow({
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
				nodeTypes={nodeTypes}
				fitView
				style={rfStyle}
			>
			</ReactFlow>
		</div>
	);
}

export const ProjectWorkflow = (props: FlowEditorProps) => {
	return (
		<ReactFlowProvider>
			<Workflow {...props} />
		</ReactFlowProvider>
	);
};
