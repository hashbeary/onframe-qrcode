import { NEXT_PUBLIC_URL } from "@/app/config";
import {
	FrameRequest,
	getFrameHtmlResponse,
	getFrameMessage,
} from "@coinbase/onchainkit";
import { NextRequest, NextResponse } from "next/server";
import QRCode from "qrcode";

async function getResponse(req: NextRequest): Promise<NextResponse> {
	const body: FrameRequest = await req.json();

	const { message } = await getFrameMessage(body, {
		neynarApiKey: "NEYNAR_ONCHAIN_KIT",
	});

	const darkMode = message?.button == 2 ? true : false;
	const customLink = message?.input;
	const link = customLink
		? customLink
		: "https://warpcast.com/" + message?.raw.action.interactor.username;

	const QRCodeBuffer = await QRCode.toBuffer(link, {
		width: 250,
		color: darkMode
			? {
					dark: "#FFFFFF",
					light: "#16101E",
			  }
			: {
					dark: "#16101E",
					light: "#FFFFFF",
			  },
	});

	const QRCodeBase64 = QRCodeBuffer.toString("base64");

	return new NextResponse(
		getFrameHtmlResponse({
			buttons: [
				{
					label: "⬅️",
				},
			],
			image: {
				src: "data:image/png;base64," + QRCodeBase64,
				aspectRatio: "1:1",
			},
			post_url: `${NEXT_PUBLIC_URL}/api/redirect`,
		})
	);
}

export async function POST(req: NextRequest): Promise<Response> {
	return getResponse(req);
}

export const dynamic = "force-dynamic";
