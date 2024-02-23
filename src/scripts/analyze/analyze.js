const { getClient } = require("../../connectionProvider");
const { getListings } = require("./persistence");
const { isDeal, hasKeyWords } = require("./util");

/**
 * Method to get the listings from the database.
 */
async function findDeals(listings, beds, baths, rent) {
  const deals = listings.filter((home) => {
    const dealObj = isDeal(home, 7.1, beds, baths, rent);

    home.COCROI = dealObj.COCROI;
    home.cashFlow = dealObj.cashFlow;
    home.expenses = dealObj.expenses;
    home.monthlyPayment = dealObj.monthlyPayment;
    home.downPayment = dealObj.downPayment;

    return dealObj?.isDeal;
  });

  return deals;
}

function displayDeals(dealsFound) {
  dealsFound.forEach((home) => {
    const url = home.url;
    console.debug(
      `www.redfin.com${url} | COCROI: ${home.COCROI} | CashFlow: ${home.cashFlow} | Projected Expense: ${home.expenses} | Down payment: ${home.downPayment} | Purchase Price: ${home.price}`
    );
  });
}

/**
 * Driver for finding deals.
 */
const main = async () => {
  const listingRows = await getListings();
  const dealsFound = await findDeals(listingRows, 3, 2, 1800);

  console.debug("----------------------------------------------");
  console.debug("3 bed 2 bath dealsFound: ", dealsFound.length);
  console.debug("----------------------------------------------");
  displayDeals(dealsFound);

  const dealsFound3B1B = await findDeals(listingRows, 3, 1, 1300);

  console.debug("----------------------------------------------");
  console.debug("3 bed 1 bath dealsFound: ", dealsFound3B1B.length);
  console.debug("----------------------------------------------");
  displayDeals(dealsFound3B1B);

  const dealsFound2B2B = await findDeals(listingRows, 2, 2, 1450);
  const dealsFound2B3B = await findDeals(listingRows, 2, 3, 1450);
  const twoBedDeals = [...dealsFound2B2B, ...dealsFound2B3B];

  console.debug("\n----------------------------------------------");
  console.debug("2 bed 2+ bath dealsFound: ", twoBedDeals.length);
  console.debug("----------------------------------------------");
  displayDeals(twoBedDeals);

  const dealsFound2B1B = await findDeals(listingRows, 2, 1, 1250);

  console.debug("\n----------------------------------------------");
  console.debug("2 bed 1 bath dealsFound: ", dealsFound2B1B.length);
  console.debug("----------------------------------------------");
  displayDeals(dealsFound2B1B);

  const dealsFound1B1B = await findDeals(listingRows, 1, 1, 1100);

  console.debug("\n----------------------------------------------");
  console.debug("1 bed 1 bath dealsFound: ", dealsFound1B1B.length);
  console.debug("----------------------------------------------");
  displayDeals(dealsFound1B1B);

  process.exit(0);
};
main();
