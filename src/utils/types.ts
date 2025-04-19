


type StoreState = {
    user: null | User,
    setUser: (user?: User) => void,

}


type User = {
    id: number,

}
type Task = {
    id: number;
}

type Categories = {
    id: number,
    title: string,
    descrition: string

}