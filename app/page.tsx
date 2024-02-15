import { getFrameMetadata } from "@coinbase/onchainkit";
import type { Metadata } from "next";
import { NEXT_PUBLIC_URL } from "./config";

const frameMetadata = getFrameMetadata({
	buttons: [
		{
			label: "My Warpcast profile",
		},
	],
	image: `${NEXT_PUBLIC_URL}/init.jpg`,
	post_url: `${NEXT_PUBLIC_URL}/api/generator`,
});

export const metadata: Metadata = {
	title: "Onframe QR Code Generator",
	description: "Onframe QR Code Generator",
	openGraph: {
		title: "Onframe QR Code Generator",
		description: "Onframe QR Code Generator",
		images: [`${NEXT_PUBLIC_URL}/init.jpg`],
	},
	other: {
		...frameMetadata,
	},
};

export default function Page() {
	return (
		<>
			<h1>Onframe QR Code Generator</h1>
		</>
	);
}
