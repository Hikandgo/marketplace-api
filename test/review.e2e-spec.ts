import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { Types } from 'mongoose';
import { CreateReviewDto } from 'src/review/dto/create-review.dto';

const productId = new Types.ObjectId().toHexString();

const testDto: CreateReviewDto = {
	name: 'Тест',
	title: 'Загловок',
	description: 'Описание тестов',
	rating: 5,
	productId
}

describe('AppController (e2e)', () => {
	let app: INestApplication;
	let createdId: string;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	afterEach(async () => {
		return app.close()
	});

	it('/review/create (POST) - success', async () => {
		await request(app.getHttpServer())
			.post('/review/create')
			.send(testDto)
			.expect(201)
			.then(({ body }: request.Response) => {
				createdId = body._id;
				expect(createdId).toBeDefined();
			});
	});

	it('/review/byProduct/:productId (GET) - success', () => {
		request(app.getHttpServer())
			.get('/review/byProduct/' + productId)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body.length).toBe(1)
			});
	});

	it('/review/:id (DELETE) - success', () => {
		request(app.getHttpServer())
			.delete('/review/create' + createdId)
			.expect(200)
	});

	afterAll(async () => {
		await app.close();

	});
});
