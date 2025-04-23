
export const api_routes = () => {
    let base_url = process.env.NEXT_PUBLIC_API_URL

    return {
        context: {
            get: `${base_url}/context/`,
        },
        auth: {
            login: `${base_url}/login/`,
            register: `${base_url}/register/`,
            logout: `${base_url}/logout/`,
        },
        task: {
            getAll: `${base_url}/tasks/`,
            add: `${base_url}/tasks/`,
            edit: `${base_url}/tasks/{id}/`,
            patch: `${base_url}/tasks/{id}/`,
            getSingle: `${base_url}/tasks/{id}/`,
            delete: `${base_url}/tasks/{id}/`,
            setStatus: `${base_url}/tasks/`,
        },
        invitations: {
            add: `${base_url}/invitations/`,
        },
        categories: {
            getAll: `${base_url}/categories/`,
        }
    }
}

