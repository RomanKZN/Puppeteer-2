const { Given, When, And, Then, Before, After } = require("cucumber");
const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const {
  sessionSelection,
  seatSelection,
  bookButton,
} = require("../../lib/selectors");
const { clickElement, getText } = require("../../lib/commands");

Before(async function () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 500 });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});
//Ticket booking
Given("user is on start page", async function () {
  return await this.page.goto(`http://qamid.tmweb.ru/client/index.php`, {
    setTimeout: 50000,
  });
});

When("user select session {string}", async function (string) {
  return await clickElement(this.page, sessionSelection, string);
});
When("user seat selection", function () {
  return clickElement(this.page, seatSelection);
});
When("the user will click the book button", async function () {
  return await clickElement(this.page, bookButton);
});

Then("user will see the message {string}", async function (string) {
  const actual = await getText(this.page, "h2");
  const expected = await string;
  expect(actual).contains(expected);
});

//Can't buy a booked ticket

Then("the user will see an inactive button {string}", async function (string) {
  const is_disabled = await this.page.$eval("button", (elem) => elem.disabled);
  expect(is_disabled).to.be.true;
});
