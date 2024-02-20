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
					dark: "#16101E",
					light: "#FFFFFF",
			  }
			: {
					dark: "#FFFFFF",
					light: "#16101E",
			  },
	});

	const QRCodeBase64 = QRCodeBuffer.toString("base64");

	return new NextResponse(
		getFrameHtmlResponse({
			image: {
				src: "data:image/png;base64," + QRCodeBase64,
				aspectRatio: "1:1",
			},
		})
	);
}

export async function POST(req: NextRequest): Promise<Response> {
	return getResponse(req);
}

export const dynamic = "force-dynamic";
