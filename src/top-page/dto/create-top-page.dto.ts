import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { TopCategory } from '../top-page.model';

export class HhDataDto {

	@IsNumber()
	count: number;

	@IsNumber()
	juniorSalary: number;

	@IsNumber()
	middleSalary: number;

	@IsNumber()
	seniorSalary: number;
}

export class TopPageAdvantagDto {

	@IsString()
	title: string;

	@IsString()
	descriptions: string;
}

export class CreateTopPageDto {

	@IsEnum(TopCategory)
	firstCategory: TopCategory;

	@IsString()
	secondCategory: string;

	@IsString()
	title: string;

	@IsString()
	alias: string;

	@IsString()
	category: string;

	@IsOptional()
	@ValidateNested()
	@Type(() => HhDataDto)
	hh?: HhDataDto;

	@IsArray()
	@ValidateNested()
	@Type(() => TopPageAdvantagDto)
	advantages: TopPageAdvantagDto[];

	@IsString()
	seoText: string;

	@IsArray()
	@IsString({ each: true })
	tags: string[];
}