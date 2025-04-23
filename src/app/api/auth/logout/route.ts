import { userCookies } from "@/utils/cookies";
import { api_routes } from "@/utils/request/api_route";
import clientFetch from "@/utils/request/fetcher";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
    const no_fetch = request.nextUrl.searchParams.get("no_fetch")
    const cookies = await userCookies()

    let response = {
        success: true,
        status: 200,
        message: 'success logout.',
    }

    const token = cookies.token as string

    if (!(no_fetch && no_fetch === '1')) {
        response = await clientFetch({ url: api_routes().auth.login, method: 'POST', token: token, body: {} })
    }

    // if (response?.success) {
    if (true) {
        cookies.token = null
    }

    return NextResponse.json(response)
}
