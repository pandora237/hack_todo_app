


type StoreState = {
    user: null | User,
    setUser: (user: User | null) => void,
    categories: Categorie[],
    setCategories: (categories: Categorie[] | []) => void,
}


type User = {
    token: string,
    user: {
        id: number,
        username: string,
        email: string,
        first_name: string,
        last_name: string,
        avatar: string
    }
}

enum Priority {
    Low = "low",
    Medium = "medium",
    High = "high"
}



type Task = {
    id: number;
    title: string,
    description: string,
    status: boolean,
    start_date: string,
    end_date: string,
    time_reminder: number,
    priority: number,
    category: Categorie
}

type Categorie = {
    id: number,
    name: string,
    description: string,
    icon?: string,
}