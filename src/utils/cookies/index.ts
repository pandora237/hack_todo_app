import { cookies } from "next/headers";

const userCookies: CustomCookie = {
    get token() {
        return cookies().has("token") ? cookies().get("token")?.value ?? null : null;
    },
    set token(value: string | null) {
        value ? cookies().set("token", `${value}`, { secure: true, httpOnly: true }) : cookies().delete('token')

    }
}

export default userCookies