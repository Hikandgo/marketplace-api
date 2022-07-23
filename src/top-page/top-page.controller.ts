
import { Controller, Post, Body, Get, Param, Patch, Delete, HttpCode, BadRequestException, NotFoundException, ValidationPipe, UsePipes, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guards';
import { IdValidationPipe } from 'src/pipes/id-validation.pipe';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { FindTopPageDto } from './dto/find.top-page.dto';
import { ALIAS_NOT_FOUND, TOP_PAGE_NOT_FOUND } from './top-page.constants';
import { TopPageModel } from './top-page.model';
import { TopPageService } from './top-page.service';


@Controller('top-page')
export class TopPageController {
	constructor(private readonly topPageService: TopPageService) { }

	@UsePipes(new ValidationPipe())
	@Post('create')
	async create(@Body() dto: CreateTopPageDto) {
		return this.topPageService.create(dto);
	}

	@Get(':id')
	async get(@Param('id', IdValidationPipe) id: string) {
		const findPage = await this.topPageService.findById(id);
		if (!findPage) {
			throw new NotFoundException(TOP_PAGE_NOT_FOUND)
		}
		return findPage;
	}

	@Get('byAlias/:alias')
	async getByAlias(@Param('alias') alias: string) {
		const findAlias = await this.topPageService.findByAlias(alias);
		if (!findAlias) {
			throw new NotFoundException(ALIAS_NOT_FOUND)
		}
		return findAlias;
	}

	@Patch(':id')
	async patch(@Param('id', IdValidationPipe) id: string, @Body() dto: CreateTopPageDto) {
		const updatePage = await this.topPageService.updateById(id, dto);
		if (!updatePage) {
			throw new NotFoundException(TOP_PAGE_NOT_FOUND)
		}
		return updatePage;
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	async delete(@Param('id', IdValidationPipe) id: string, @Body() dto: TopPageModel) {
		const deletePage = await this.topPageService.deleteById(id);
		if (!deletePage) {
			throw new NotFoundException(TOP_PAGE_NOT_FOUND)
		}
	}


	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('find')
	async find(@Body() dto: FindTopPageDto) {
		return this.topPageService.findByCategory(dto.firstCategory);
	}

	@Get('textSearch/:text')
	async textSearch(@Param('text') text: string) {
		return this.topPageService.findByText(text);
	}
}
