import { ICourseDetail } from "./courseDetail-interface";

export interface ICourse {
    id: string,
    Type: string,
    Color: string,
    CourseName: string,
    Status: string,
    Chapters: number,
    CourseID: number,
    Sessions: number,
    CourseImage: string,
    banner: string,
	CourseDetail: ICourseDetail[];
}
