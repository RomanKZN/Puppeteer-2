const {
  sessionSelection,
  seatSelection,
  bookButton,
} = require("./selectors.js");
const { clickElement, getText } = require("./lib/commands.js");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("http://qamid.tmweb.ru/client/index.php");
  await page.setDefaultNavigationTimeout(0);
});

afterEach(() => {
  page.close();
});

describe("qamid.tmweb.ru tests", () => {
  test("Ticket booking'", async () => {
    await clickElement(page, sessionSelection);
    await clickElement(page, seatSelection);
    await clickElement(page, bookButton);
    const actual = await getText(page, "h2");
    expect(actual).toContain("Вы выбрали билеты:");
  });

  test("The first link text 'Идем В Кино'", async () => {
    const actual = await getText(page, "h1");
    expect(actual).toContain("Идёмвкино");
  });

  test("Book tickets for another day'", async () => {
    await clickElement(
      page,
      "body > nav > a:nth-child(5) > span.page-nav__day-week"
    );
    await page.click(sessionSelection);
    await page.click(seatSelection);
    await page.click(bookButton);
    const actual = await getText(page, "h2");
    expect(actual).toContain("Вы выбрали билеты:");
  });
});

describe("Nigative qamid.tmweb.ru test", () => {
  test("Can't buy a booked ticket'", async () => {
    await page.click(sessionSelection);
    const is_disabled = await page.$eval("button", (elem) => elem.disabled);
    expect(is_disabled).toBe(true);
  });
});
