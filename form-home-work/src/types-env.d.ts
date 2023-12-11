interface User{
    id: number;
    address: string;
    age: number;
    birthday: Date;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
}
interface Post{
    id: number;
    userId: number;
    title: string;
    body: string;
    reactions: number;
    tags: string[];
}