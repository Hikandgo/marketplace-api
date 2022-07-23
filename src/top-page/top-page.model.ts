import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export enum TopCategory {
	Courses,
	Services,
	Books,
	ProductsName
}

export class HhData {

	@prop()
	count: number;

	@prop()
	juniorSalary: number;

	@prop()
	middleSalary: number;

	@prop()
	seniorSalary: number;
};

export class TopPageAdvantag {
	title: string;
	descriptions: string;
}

export interface TopPageModel extends Base { }

export class TopPageModel extends TimeStamps {

	@prop({ enum: TopCategory })
	firstCategory: TopCategory;

	@prop()
	secondCategory: string;

	@prop({ unique: true })
	title: string;

	@prop({ unique: true })
	alias: string;

	@prop()
	category: string;

	@prop({ type: () => [HhData] })
	hh?: HhData

	@prop({ type: () => [TopPageAdvantag] })
	advantages: TopPageAdvantag[]

	@prop()
	seoText: string;

	@prop({ type: () => [String] })
	tags: string[];
}
