const { isDeal, hasKeyWords } = require("../scripts/analyze/util");

describe("Analyze Util", () => {
  test("Listing has keywords", () => {
    const home = {
      listingRemarks:
        "This home is fixxer-upper. It has a beautiful backyard with a white pikket fence.",
    };
    const result = hasKeyWords(home);
    expect(result).toBeTruthy();
  });
  test("Listing does not have keywords", () => {
    const home = {
      listingRemarks: "It has a beautiful backyard with a white pikket fence.",
    };
    const result = hasKeyWords(home);
    expect(result).toBeFalsy();
  });
  test("Listing is a deal", () => {
    const home = {
      mlsId: 123,
      mlsStatus: "Active",
      price: 175000,
      hoa: 15,
      sqFt: 1250,
      pricePerSqFt: 120,
      lotSize: 35000,
      beds: 3,
      baths: 2,
      fullBaths: 2,
      partialBaths: 0,
      streetLine: "Rainbow Road",
      stories: 1,
      city: "Arnold",
      state: "MO",
      zip: "63010",
      soldDate: null,
      propertyType: 6,
      yearBuilt: 1969,
      timeZone: "US/Central",
      url: "/MO/Arnold/2839-Jeffrey-Ct-63010/home/79988170",
      location: null,
      latLong: null,
      propertyId: 79988170,
      listingId: 164249395,
      listingRemarks: "It is a nice home.",
    };
    const result = isDeal(home, 7.1, 3, 2, 1800);
    expect(result.isDeal).toBeTruthy();
  });
  test("Listing is not a deal", () => {
    const home = {
      mlsId: 123,
      mlsStatus: "Active",
      price: 360000,
      hoa: 15,
      sqFt: 1250,
      pricePerSqFt: 288,
      lotSize: 35000,
      beds: 3,
      baths: 2,
      fullBaths: 2,
      partialBaths: 0,
      streetLine: "Rainbow Road",
      stories: 1,
      city: "Arnold",
      state: "MO",
      zip: "63010",
      soldDate: null,
      propertyType: 6,
      yearBuilt: 1969,
      timeZone: "US/Central",
      url: "/MO/Arnold/2839-Jeffrey-Ct-63010/home/79988170",
      location: null,
      latLong: null,
      propertyId: 79988170,
      listingId: 164249395,
      listingRemarks: "It is a nice home.",
    };
    const result = isDeal(home, 7.1, 3, 2, 1800);
    expect(result.isDeal).toBeFalsy();
  });
});
