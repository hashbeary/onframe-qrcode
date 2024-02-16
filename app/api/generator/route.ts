import {
	FrameRequest,
	getFrameHtmlResponse,
	getFrameMessage,
} from "@coinbase/onchainkit";
import { NextRequest, NextResponse } from "next/server";
import QRCode from "qrcode";
import { NEXT_PUBLIC_URL } from "../../config";

async function getResponse(req: NextRequest): Promise<NextResponse> {
	const body: FrameRequest = await req.json();

	const { message } = await getFrameMessage(body, {
		neynarApiKey: "NEYNAR_ONCHAIN_KIT",
	});

	const lightmode = message?.button == 1 ? true : false;

	const QRCodeBuffer = await QRCode.toBuffer(
		"https://warpcast.com/" + message?.raw.action.cast.author.username,
		{
			width: 500,
			color: lightmode
				? {
						dark: "#16101E",
						light: "#FFFFFF",
				  }
				: {
						dark: "#FFFFFF",
						light: "#16101E",
				  },
		}
	);

	return new NextResponse(
		getFrameHtmlResponse({
			buttons: [
				{
					label: "⬅️",
				},
			],
			image: `data:image/png;base64,${QRCodeBuffer.toString("base64")}`,
			post_url: `${NEXT_PUBLIC_URL}`,
		})
	);
}

export async function POST(req: NextRequest): Promise<Response> {
	return getResponse(req);
}

export const dynamic = "force-dynamic";
