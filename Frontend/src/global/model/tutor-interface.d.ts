import { IReview } from "./review-interface";

export interface ITutor {
	id: string;
	name: string;
	description: string;
	profilePictureURL: string;
	rating: number;
	skillSet: string[];
	reviews: IReview[];
}
