import { ICourseDetail } from "./courseDetail-interface";

export interface ICourse {
	id: string;
	Type: string;
	Color: string;
	CourseName: string;
	Status: string;
	Chapters: number;
	CourseID: string;
	Sessions: number;
	CourseImage: string;
	banner: string;
	skill: string;
	description: string;
	chapterBreakdown: string[];
	totalHours: string;
}
