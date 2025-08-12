export interface Todo {
    id : string;
    text: string;
    completed: boolean;
    date: string;   // 'YYYY-MM-DD' 형식
    order: number;  // 리스트 순서
}
