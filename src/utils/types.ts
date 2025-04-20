


type StoreState = {
    user: null | User,
    setUser: (user?: User) => void,

}


type User = {
    id: number,
    isLogged: boolean

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
    start_date: Date,
    end_date: Date,
    time_reminder: number,
    priority: number,
    category: Categorie
}

type Categorie = {
    id: number,
    title: string,
    description: string
}