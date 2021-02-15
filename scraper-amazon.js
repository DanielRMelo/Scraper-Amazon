const puppeteer = require('puppeteer');

async function scrapeProduct(url) {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(url);

	const [el] = await page.$x('//*[@id="landingImage"]');
	const src = await el.getProperty('src');
	const imageURL = await src.jsonValue();

	const [el2] = await page.$x('//span[@id="productTitle"]');
	const txt = await el2.getProperty('textContent');
	const title = await txt.jsonValue();

	const [el3] = await page.$x('//*[@id="priceblock_ourprice"]');
	const txt2 = await el3.getProperty('textContent');
	const price = await txt2.jsonValue();

	console.log({ imageURL, title, price });

	browser.close();
}

scrapeProduct('https://www.amazon.com.br/dp/B07C7LRP6L/ref=s9_acsd_al_bw_c2_x_2_i?pf_rd_m=A3RN7G7QC5MWSZ&pf_rd_s=merchandised-search-4&pf_rd_r=6VHKNFJTZ01E8RHCH11R&pf_rd_t=101&pf_rd_p=70c2c44e-b85b-4a23-8108-3f69f62813f3&pf_rd_i=19527565011');
