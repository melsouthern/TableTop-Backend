const {
  formatCategoryDataToNested,
  formatUserDataToNested,
} = require("../db/utils/data-manipulation");

describe("formatCategoryDataToNested", () => {
  it("should return an empty array when passed empty array", () => {
    expect(formatCategoryDataToNested([])).toEqual([]);
  });
  it("should take an array of objects and return a nested array", () => {
    const input = [
      {
        slug: "strategy",
        description:
          "Strategy-focused board games that prioritise limited-randomness",
      },
      {
        slug: "hidden-roles",
        description:
          "One or more players around the table have a secret, and the rest of you need to figure out who! Players attempt to uncover each other's hidden role",
      },
      {
        slug: "dexterity",
        description:
          "Games involving physical skill, something like Gladiators, for Board Games!",
      },
      {
        slug: "push-your-luck",
        description:
          "Games that allow you to take bigger risks to achieve increasingly valuable rewards - or to decide to keep what you’ve got before you lose everything.",
      },
    ];
    const output = [
      [
        "strategy",
        "Strategy-focused board games that prioritise limited-randomness",
      ],
      [
        "hidden-roles",
        "One or more players around the table have a secret, and the rest of you need to figure out who! Players attempt to uncover each other's hidden role",
      ],
      [
        "dexterity",
        "Games involving physical skill, something like Gladiators, for Board Games!",
      ],
      [
        "push-your-luck",
        "Games that allow you to take bigger risks to achieve increasingly valuable rewards - or to decide to keep what you’ve got before you lose everything.",
      ],
    ];
    expect(formatCategoryDataToNested(input)).toEqual(output);
  });
  it("should return a new array without mutating the original data", () => {
    const input = [
      {
        slug: "strategy",
        description:
          "Strategy-focused board games that prioritise limited-randomness",
      },
      {
        slug: "hidden-roles",
        description:
          "One or more players around the table have a secret, and the rest of you need to figure out who! Players attempt to uncover each other's hidden role",
      },
      {
        slug: "dexterity",
        description:
          "Games involving physical skill, something like Gladiators, for Board Games!",
      },
      {
        slug: "push-your-luck",
        description:
          "Games that allow you to take bigger risks to achieve increasingly valuable rewards - or to decide to keep what you’ve got before you lose everything.",
      },
    ];
    expect(formatCategoryDataToNested(input)).not.toBe(input);
    formatCategoryDataToNested(input);
    expect(input).toEqual(input);
  });
});

describe("formatUserDataToNested", () => {
  it("should return an empty array when passed empty array", () => {
    expect(formatUserDataToNested([])).toEqual([]);
  });
  it("should take an array of objects and return a nested array", () => {
    const input = [
      {
        username: "tickle122",
        name: "Tom Tickle",
        avatar_url:
          "https://www.spiritsurfers.net/monastery/wp-content/uploads/_41500270_mrtickle.jpg",
      },
      {
        username: "grumpy19",
        name: "Paul Grump",
        avatar_url:
          "https://www.tumbit.com/profile-image/4/original/mr-grumpy.jpg",
      },
      {
        username: "happyamy2016",
        name: "Amy Happy",
        avatar_url:
          "https://vignette1.wikia.nocookie.net/mrmen/images/7/7f/Mr_Happy.jpg/revision/latest?cb=20140102171729",
      },
      {
        username: "cooljmessy",
        name: "Peter Messy",
        avatar_url: "https://i.imgur.com/WfX0Neu.jpg",
      },
    ];
    const output = [
      [
        "tickle122",
        "https://www.spiritsurfers.net/monastery/wp-content/uploads/_41500270_mrtickle.jpg",
        "Tom Tickle",
      ],
      [
        "grumpy19",
        "https://www.tumbit.com/profile-image/4/original/mr-grumpy.jpg",
        "Paul Grump",
      ],
      [
        "happyamy2016",
        "https://vignette1.wikia.nocookie.net/mrmen/images/7/7f/Mr_Happy.jpg/revision/latest?cb=20140102171729",
        "Amy Happy",
      ],
      ["cooljmessy", "https://i.imgur.com/WfX0Neu.jpg", "Peter Messy"],
    ];
    expect(formatUserDataToNested(input)).toEqual(output);
  });
  it("should return a new array without mutating the original data", () => {
    const input = [
      {
        username: "tickle122",
        name: "Tom Tickle",
        avatar_url:
          "https://www.spiritsurfers.net/monastery/wp-content/uploads/_41500270_mrtickle.jpg",
      },
      {
        username: "grumpy19",
        name: "Paul Grump",
        avatar_url:
          "https://www.tumbit.com/profile-image/4/original/mr-grumpy.jpg",
      },
      {
        username: "happyamy2016",
        name: "Amy Happy",
        avatar_url:
          "https://vignette1.wikia.nocookie.net/mrmen/images/7/7f/Mr_Happy.jpg/revision/latest?cb=20140102171729",
      },
      {
        username: "cooljmessy",
        name: "Peter Messy",
        avatar_url: "https://i.imgur.com/WfX0Neu.jpg",
      },
    ];
    expect(formatUserDataToNested(input)).not.toBe(input);
    formatUserDataToNested(input);
    expect(input).toEqual(input);
  });
});
