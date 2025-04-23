
import userCookies from "@/utils/cookies";
import z from "zod";
import { NextRequest, NextResponse } from "next/server";
import clientFetch from "@/utils/request/fetcher";
import { api_routes } from "@/utils/request/api_route";

export async function POST(request: NextRequest) {

    console.log('bodybody', request)
    const body = await request.json()

    let response = await clientFetch({ url: api_routes().auth.login, method: 'POST', body: body })

    if (response?.success) {
        userCookies.token = null
        userCookies.token = response?.data.token
    }

    return NextResponse.json(response)
}