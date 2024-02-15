import satori from "satori";
import FrameCard from "../components/FrameCard";

export const generateSVG = async () => {
	const font = await fetch(
		"https://fonts.googleapis.com/css2?family=Protest+Riot&display=swap"
	);
	const svg = await satori(<FrameCard />, {
		width: 500,
		height: 500,
		fonts: [
			{
				data: await font.arrayBuffer(),
				name: "Protest Riot",
				style: "normal",
				weight: 400,
			},
		],
	});

	return Buffer.from(svg).toString("base64");
};
