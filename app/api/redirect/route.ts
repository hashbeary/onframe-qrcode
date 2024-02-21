import { NEXT_PUBLIC_URL } from "@/app/config";

export async function POST(): Promise<Response> {
	return Response.redirect(NEXT_PUBLIC_URL);
}

export const dynamic = "force-dynamic";
