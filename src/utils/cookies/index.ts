import { cookies } from "next/headers";

export async function userCookies() {
    const cookieStore = await cookies();

    return {
        get token() {
            return cookieStore.has("token") ? cookieStore.get("token")?.value ?? null : null;
        },
        set token(value: string | null) {
            value
                ? cookieStore.set("token", `${value}`, { secure: true, httpOnly: true })
                : cookieStore.delete("token");
        }
    };
}