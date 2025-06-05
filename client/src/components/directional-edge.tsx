
import {
  BaseEdge,
  EdgeProps
} from "@xyflow/react";

export type GetSpecialPathParams = {
	sourceX: number;
	sourceY: number;
	targetX: number;
	targetY: number;
};

export const getSpecialPath = (
	{ sourceX, sourceY, targetX, targetY }: GetSpecialPathParams,
	offset: number
) => {
	const centerX = (sourceX + targetX) / 2;
	const centerY = (sourceY + targetY) / 2;

	return `M ${sourceX} ${sourceY} Q ${centerX} ${
		centerY + offset
	} ${targetX} ${targetY}`;
};

export const DirectionalEdge = ({
	source,
	target,
	sourceX,
	sourceY,
	targetX,
	targetY,
	sourcePosition,
	targetPosition,
	style = {},
	markerEnd,
}: EdgeProps) => {
	const edgePathParams = {
		sourceX,
		sourceY,
		sourcePosition,
		targetX,
		targetY,
		targetPosition,
	};

	let path = "";
	path = getSpecialPath(edgePathParams, sourceX < targetX ? 25 : -25);

	return (
		<>
			<BaseEdge path={path} markerEnd={markerEnd} style={style} />
		</>
	);
};
