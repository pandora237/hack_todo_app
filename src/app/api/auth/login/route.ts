
import z from "zod";
import { NextRequest, NextResponse } from "next/server";
import clientFetch from "@/utils/request/fetcher";
import { api_routes } from "@/utils/request/api_route";
import { userCookies } from "@/utils/cookies";

export async function POST(request: NextRequest) {
    const cookies = await userCookies()

    const body = await request.json()

    let response = await clientFetch({ url: api_routes().auth.login, method: 'POST', body: body })

    if (response?.success) {
        cookies.token = null
        cookies.token = response?.data.token
    }

    return NextResponse.json(response)
}