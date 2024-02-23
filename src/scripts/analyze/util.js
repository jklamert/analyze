const { Mortgage } = require("shared-portfolio-code");

module.exports = {
  /**
   * Method to determine if a home is a good deal or not.
   * @param {*} home
   * @param {number} MORTGAGE_RATE ()
   * @param {number} comparableBeds
   * @param {number} comparableBaths
   * @param {number} rentIncome
   * @returns {
        isDeal: Boolean;
        COCROI: Number;
        cashFlow: Number;
        expenses: Number;
        monthlyPayment: Number;
      }
   */
  isDeal: function (
    home,
    MORTGAGE_RATE,
    comparableBeds,
    comparableBaths,
    rentIncome
  ) {
    //Monthly expenses
    const RENT = Number.parseInt(rentIncome); //3 bed 2 bath rents in arnold
    const TAXES = 140;
    // const SEWER = 37;
    const INSURANCE = 166;
    // const WATER = 33;
    // const GARBAGE = 45;
    const VACANCY_PERCENTAGE = 5;
    const REPAIR_PERCENTAGE = 5;
    const CAPEX_PERCENTAGE = 5;
    const PROPERTY_MANAGEMENT_PERCENTAGE = 10;
    // const PROPERTY_MANAGEMENT = RENT * (PROPERTY_MANAGEMENT_PERCENTAGE / 100);
    const DOWN_PAYMENT_PERCENTAGE = 25;
    const CLOSING_COSTS = 2000;
    const REHAB_BUDGET = 0;

    const {
      mlsId,
      mlsStatus,
      price,
      hoa,
      sqFt,
      pricePerSqFt,
      lotSize,
      beds,
      baths,
      fullBaths,
      partialBaths,
      streetLine,
      stories,
      city,
      state,
      zip,
      soldDate,
      propertyType,
      yearBuilt,
      timeZone,
      url,
      location,
      latLong,
      propertyId,
      listingId,
      listingRemarks,
    } = home;

    const DOWN_PAYMENT = price * (DOWN_PAYMENT_PERCENTAGE / 100);

    // console.debug("Mortgage: ", price, DOWN_PAYMENT, MORTGAGE_RATE, 30);

    const MC = new Mortgage(price, DOWN_PAYMENT, MORTGAGE_RATE, 30);
    const result = MC.calculate();

    // console.debug("Result: ", result);

    const { totalNumberOfPayments, monthlyPayment, yearlyPayment } = result;

    const VACANCY = RENT * (VACANCY_PERCENTAGE / 100);
    const REPAIRS = RENT * (REPAIR_PERCENTAGE / 100);
    const CAPEX = RENT * (CAPEX_PERCENTAGE / 100);

    // console.debug("Monthly Payment: ", monthlyPayment);

    const EXPENSES =
      TAXES +
      CAPEX +
      // SEWER +
      // WATER +
      // GARBAGE +
      monthlyPayment +
      VACANCY +
      REPAIRS +
      INSURANCE;

    // console.debug("EXPENSES: ", RENT, EXPENSES);

    const MONTHLY_CASHFLOW = RENT - EXPENSES;

    const COCROI = ((MONTHLY_CASHFLOW * 12) / DOWN_PAYMENT) * 100;

    // console.debug("COCROI: ", COCROI);

    // console.debug("MONTHLY_CASHFLOW: ", MONTHLY_CASHFLOW);

    let isDeal = false;
    if (beds === comparableBeds && baths === comparableBaths) {
      //We are interested only in homes that have two or three beds.
      //The house must have at most 2 baths and at least one bath.
      //Next we look deeper at the value per sqft.
      if (COCROI > 7) {
        isDeal = true;
      }
    }

    // console.debug("isDeal: ", isDeal);

    return {
      isDeal: isDeal,
      COCROI: COCROI,
      cashFlow: MONTHLY_CASHFLOW,
      expenses: EXPENSES,
      monthlyPayment: monthlyPayment,
      downPayment: DOWN_PAYMENT,
    };
  },

  /**
   * Method that parses the listings for keywords.
   * @returns Boolean
   */
  hasKeyWords: function (home) {
    const {
      mlsId,
      mlsStatus,
      price,
      hoa,
      sqFt,
      pricePerSqFt,
      lotSize,
      beds,
      baths,
      fullBaths,
      partialBaths,
      streetLine,
      stories,
      city,
      state,
      zip,
      soldDate,
      propertyType,
      yearBuilt,
      timeZone,
      url,
      location,
      latLong,
      propertyId,
      listingId,
      listingRemarks,
    } = home;

    const keywords = [
      "investor",
      "rehab",
      "flip",
      "renovation",
      "fix",
      "TLC",
      "distressed",
      "DYI",
      "As-Is",
    ];

    let isInteresting = false;
    for (const word of keywords) {
      if (listingRemarks.includes(word)) {
        isInteresting = true;
      }
    }

    return isInteresting;
  },
};
