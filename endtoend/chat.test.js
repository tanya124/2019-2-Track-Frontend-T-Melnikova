import 'expect-puppeteer';

require('regenerator-runtime/runtime');

describe('Testing', () => {
	beforeAll(async () => {
		await page.goto('http://localhost:3000/2019-2-Track-Frontend-T-Melnikova/', {
			waitUntil: 'load',
			timeout: 0
		});
	}, 600000);

	it('create new chat and send message to this chat', async () => {
		await page.waitForSelector('[id="create_chat_button"]');
		await page.click('[id="create_chat_button"');
		await expect(page).toMatch('Новый чат');
		await page.type('input[name=username]', 'NewChat');
		await page.click('input[type=button]');
		await expect(page).toMatch('NewChat');

		await page.click('[id="NewChat"]');
		await page.waitForSelector('.formInput');
		await expect(page).toMatch('NewChat');

		await page.click('textarea[name=message_text]');
		await page.type('textarea[name=message_text]', 'NewMessage');
		await page.keyboard.press('Enter');
		await expect(page).toMatch('NewMessage');

		await page.click('[id="back"]');
	}, 300000);
	
	it('go to profile and change name', async () => {
		await page.waitForSelector('img[name=burger_button]');
		await page.click('img[name=burger_button]');
		await expect(page).toMatch('Редактировать профиль');

		await page.click('[id="change_profile"]');
		await expect(page).toMatch('Минимальная длина - 5 символов');

		await page.click('input[name="fullname"]');
		await page.type('input[name="fullname"]', 'NewName');
		await page.click('[id="save"]');
	}, 300000);
});