import { Injectable } from '@nestjs/common';
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { TopCategory, TopPageModel } from './top-page.model';

@Injectable()
export class TopPageService {
	constructor(@InjectModel(TopPageModel) private readonly topPageModel: ModelType<TopPageModel>) { }

	async create(dto: CreateTopPageDto): Promise<DocumentType<TopPageModel>> {
		return this.topPageModel.create(dto)
	}

	async deleteById(id: string) {
		return this.topPageModel.findByIdAndDelete(id).exec()
	}

	async updateById(id: string, dto: CreateTopPageDto) {
		return this.topPageModel.findByIdAndUpdate(id, dto, { new: true }).exec()
	}

	async findById(id: string) {
		return this.topPageModel.findById(id).exec()
	}

	async findByAlias(alias: string) {
		return this.topPageModel.findOne({ alias: alias }).exec()
	}

	async findByCategory(firstCategory: TopCategory) {
		return this.topPageModel
			.aggregate()
			.match({
				firstCategory
			})
			.group({
				_id: { secondCategory: '$secondCategory' },
				pages: { $push: { alias: '$alias', title: '$title' } }
			}).exec()
	}

	async findByText(text: string) {
		return this.topPageModel.find({ $text: { $search: text, $caseSensitive: false } }).exec();
	}


}
