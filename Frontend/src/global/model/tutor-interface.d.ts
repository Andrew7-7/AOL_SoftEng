export interface ITutor {
	id: string;
	name: string;
	description: string;
	profilePictureURL: string;
	rating: number;
	skillSet: stringp[];
	reviews: Reviewp[];
}
