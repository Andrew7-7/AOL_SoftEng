export interface ITransaction {
    id: string;
    courseId: number;
    paymentMethod: string;
    price: number;
    tutorEmail: string;
    userEmail: string;
}