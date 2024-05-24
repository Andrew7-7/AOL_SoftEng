import { IReview } from "./review-interface";

export interface ITutor {
	id: string;
	name: string;
	description: string;
	profilePictureURL: string;
	rating: number;
	price: string;
	skillSet: string[];
	reviews: IReview[];
}
