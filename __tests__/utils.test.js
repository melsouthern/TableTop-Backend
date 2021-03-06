const {
  formatCategoryDataToNested,
  formatUserDataToNested,
  formatReviewDataToNested,
  formatCommentDataToNested,
  checkReviewIdExists,
  checkColumnExists,
  checkOrderSpecifier,
  checkCategoryExists,
  checkCommentIdExists,
  checkUserExists,
} = require("../db/utils/data-manipulation");

const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const db = require("../db/connection.js");
beforeEach(() => seed(testData));
afterAll(() => db.end());

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
    expect(input).toEqual([
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
    ]);
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
    expect(input).toEqual([
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
    ]);
  });
});

describe("formatReviewDataToNested", () => {
  it("should return an empty array when passed empty array", () => {
    expect(formatReviewDataToNested([])).toEqual([]);
  });
  it("should take an array of objects and return a nested array", () => {
    const input = [
      {
        title: "Culture a Love of Agriculture With Agricola",
        designer: "Uwe Rosenberg",
        owner: "tickle122",
        review_img_url:
          "https://images.pexels.com/photos/4917821/pexels-photo-4917821.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        review_body:
          "You could sum up Agricola with the simple phrase 'Farmyeard Fun' but the mechanics and game play add so much more than that. You'll find yourself torn between breeding pigs, or sowing crops. Its joyeous and rewarding and it makes you think of time spent outside, which is much harder to do these days!",
        category: "strategy",
        created_at: new Date(1610964020514),
        votes: 1,
      },
      {
        title: "JengARRGGGH!",
        designer: "Leslie Scott",
        owner: "grumpy19",
        review_img_url:
          "https://images.pexels.com/photos/4009761/pexels-photo-4009761.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
        review_body:
          "Few games are equiped to fill a player with such a defined sense of mild-peril, but a friendly game of Jenga will turn the mustn't-make-it-fall anxiety all the way up to 11! Fiddly fun for all the family, this game needs little explaination. Whether you're a player who chooses to play it safe, or one who lives life on the edge, eventually the removal of blocks will destabilise the tower and all your Jenga dreams come tumbling down.",
        category: "dexterity",
        created_at: new Date(1610964101251),
        votes: 5,
      },
      {
        title: "Karma Karma Chameleon",
        designer: "Rikki Tahta",
        owner: "happyamy2016",
        review_img_url:
          "https://images.pexels.com/photos/5350049/pexels-photo-5350049.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        review_body:
          "Try to trick your friends. If you find yourself being dealt the Chamelean card then the aim of the game is simple; blend in... Meanwhile the other players aim to be as vague as they can to not give the game away ",
        category: "hidden-roles",
        created_at: new Date(1610964102151),
        votes: 5,
      },
      {
        title: "One Night Ultimate Werewolf",
        designer: "Akihisa Okui",
        owner: "happyamy2016",
        review_img_url:
          "https://images.pexels.com/photos/5350049/pexels-photo-5350049.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        review_body: "We couldn't find the werewolf!",
        category: "hidden-roles",
        created_at: new Date(1610964101251),
        votes: 5,
      },
      {
        title: "A truly Quacking Game; Quacks of Quedlinburg",
        designer: "Wolfgang Warsch",
        owner: "happyamy2016",
        review_img_url:
          "https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg",
        review_body:
          "Ever wish you could try your hand at mixing potions? Quacks of Quedlinburg will have you mixing up a homebrew like no other. Each player buys different ingredients (chips) that are drawn at random to reach the most points, but watch out, you'd better not let your cauldrom explode.",
        category: "push-your-luck",
        created_at: new Date(1610964101251),
        votes: 10,
      },
    ];
    const output = [
      [
        "Culture a Love of Agriculture With Agricola",
        "You could sum up Agricola with the simple phrase 'Farmyeard Fun' but the mechanics and game play add so much more than that. You'll find yourself torn between breeding pigs, or sowing crops. Its joyeous and rewarding and it makes you think of time spent outside, which is much harder to do these days!",
        "Uwe Rosenberg",
        "https://images.pexels.com/photos/4917821/pexels-photo-4917821.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        1,
        "strategy",
        "tickle122",
        new Date(1610964020514),
      ],
      [
        "JengARRGGGH!",
        "Few games are equiped to fill a player with such a defined sense of mild-peril, but a friendly game of Jenga will turn the mustn't-make-it-fall anxiety all the way up to 11! Fiddly fun for all the family, this game needs little explaination. Whether you're a player who chooses to play it safe, or one who lives life on the edge, eventually the removal of blocks will destabilise the tower and all your Jenga dreams come tumbling down.",
        "Leslie Scott",
        "https://images.pexels.com/photos/4009761/pexels-photo-4009761.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
        5,
        "dexterity",
        "grumpy19",
        new Date(1610964101251),
      ],
      [
        "Karma Karma Chameleon",
        "Try to trick your friends. If you find yourself being dealt the Chamelean card then the aim of the game is simple; blend in... Meanwhile the other players aim to be as vague as they can to not give the game away ",
        "Rikki Tahta",
        "https://images.pexels.com/photos/5350049/pexels-photo-5350049.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        5,
        "hidden-roles",
        "happyamy2016",
        new Date(1610964102151),
      ],
      [
        "One Night Ultimate Werewolf",
        "We couldn't find the werewolf!",
        "Akihisa Okui",
        "https://images.pexels.com/photos/5350049/pexels-photo-5350049.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        5,
        "hidden-roles",
        "happyamy2016",
        new Date(1610964101251),
      ],
      [
        "A truly Quacking Game; Quacks of Quedlinburg",
        "Ever wish you could try your hand at mixing potions? Quacks of Quedlinburg will have you mixing up a homebrew like no other. Each player buys different ingredients (chips) that are drawn at random to reach the most points, but watch out, you'd better not let your cauldrom explode.",
        "Wolfgang Warsch",
        "https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg",
        10,
        "push-your-luck",
        "happyamy2016",
        new Date(1610964101251),
      ],
    ];
    expect(formatReviewDataToNested(input)).toEqual(output);
  });
  it("should return a new array without mutating the original data", () => {
    const input = [
      {
        title: "Culture a Love of Agriculture With Agricola",
        designer: "Uwe Rosenberg",
        owner: "tickle122",
        review_img_url:
          "https://images.pexels.com/photos/4917821/pexels-photo-4917821.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        review_body:
          "You could sum up Agricola with the simple phrase 'Farmyeard Fun' but the mechanics and game play add so much more than that. You'll find yourself torn between breeding pigs, or sowing crops. Its joyeous and rewarding and it makes you think of time spent outside, which is much harder to do these days!",
        category: "strategy",
        created_at: new Date(1610964020514),
        votes: 1,
      },
      {
        title: "JengARRGGGH!",
        designer: "Leslie Scott",
        owner: "grumpy19",
        review_img_url:
          "https://images.pexels.com/photos/4009761/pexels-photo-4009761.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
        review_body:
          "Few games are equiped to fill a player with such a defined sense of mild-peril, but a friendly game of Jenga will turn the mustn't-make-it-fall anxiety all the way up to 11! Fiddly fun for all the family, this game needs little explaination. Whether you're a player who chooses to play it safe, or one who lives life on the edge, eventually the removal of blocks will destabilise the tower and all your Jenga dreams come tumbling down.",
        category: "dexterity",
        created_at: new Date(1610964101251),
        votes: 5,
      },
      {
        title: "Karma Karma Chameleon",
        designer: "Rikki Tahta",
        owner: "happyamy2016",
        review_img_url:
          "https://images.pexels.com/photos/5350049/pexels-photo-5350049.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        review_body:
          "Try to trick your friends. If you find yourself being dealt the Chamelean card then the aim of the game is simple; blend in... Meanwhile the other players aim to be as vague as they can to not give the game away ",
        category: "hidden-roles",
        created_at: new Date(1610964102151),
        votes: 5,
      },
      {
        title: "One Night Ultimate Werewolf",
        designer: "Akihisa Okui",
        owner: "happyamy2016",
        review_img_url:
          "https://images.pexels.com/photos/5350049/pexels-photo-5350049.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        review_body: "We couldn't find the werewolf!",
        category: "hidden-roles",
        created_at: new Date(1610964101251),
        votes: 5,
      },
      {
        title: "A truly Quacking Game; Quacks of Quedlinburg",
        designer: "Wolfgang Warsch",
        owner: "happyamy2016",
        review_img_url:
          "https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg",
        review_body:
          "Ever wish you could try your hand at mixing potions? Quacks of Quedlinburg will have you mixing up a homebrew like no other. Each player buys different ingredients (chips) that are drawn at random to reach the most points, but watch out, you'd better not let your cauldrom explode.",
        category: "push-your-luck",
        created_at: new Date(1610964101251),
        votes: 10,
      },
    ];
    expect(formatReviewDataToNested(input)).not.toBe(input);
    formatReviewDataToNested(input);
    expect(input).toEqual([
      {
        title: "Culture a Love of Agriculture With Agricola",
        designer: "Uwe Rosenberg",
        owner: "tickle122",
        review_img_url:
          "https://images.pexels.com/photos/4917821/pexels-photo-4917821.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        review_body:
          "You could sum up Agricola with the simple phrase 'Farmyeard Fun' but the mechanics and game play add so much more than that. You'll find yourself torn between breeding pigs, or sowing crops. Its joyeous and rewarding and it makes you think of time spent outside, which is much harder to do these days!",
        category: "strategy",
        created_at: new Date(1610964020514),
        votes: 1,
      },
      {
        title: "JengARRGGGH!",
        designer: "Leslie Scott",
        owner: "grumpy19",
        review_img_url:
          "https://images.pexels.com/photos/4009761/pexels-photo-4009761.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
        review_body:
          "Few games are equiped to fill a player with such a defined sense of mild-peril, but a friendly game of Jenga will turn the mustn't-make-it-fall anxiety all the way up to 11! Fiddly fun for all the family, this game needs little explaination. Whether you're a player who chooses to play it safe, or one who lives life on the edge, eventually the removal of blocks will destabilise the tower and all your Jenga dreams come tumbling down.",
        category: "dexterity",
        created_at: new Date(1610964101251),
        votes: 5,
      },
      {
        title: "Karma Karma Chameleon",
        designer: "Rikki Tahta",
        owner: "happyamy2016",
        review_img_url:
          "https://images.pexels.com/photos/5350049/pexels-photo-5350049.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        review_body:
          "Try to trick your friends. If you find yourself being dealt the Chamelean card then the aim of the game is simple; blend in... Meanwhile the other players aim to be as vague as they can to not give the game away ",
        category: "hidden-roles",
        created_at: new Date(1610964102151),
        votes: 5,
      },
      {
        title: "One Night Ultimate Werewolf",
        designer: "Akihisa Okui",
        owner: "happyamy2016",
        review_img_url:
          "https://images.pexels.com/photos/5350049/pexels-photo-5350049.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        review_body: "We couldn't find the werewolf!",
        category: "hidden-roles",
        created_at: new Date(1610964101251),
        votes: 5,
      },
      {
        title: "A truly Quacking Game; Quacks of Quedlinburg",
        designer: "Wolfgang Warsch",
        owner: "happyamy2016",
        review_img_url:
          "https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg",
        review_body:
          "Ever wish you could try your hand at mixing potions? Quacks of Quedlinburg will have you mixing up a homebrew like no other. Each player buys different ingredients (chips) that are drawn at random to reach the most points, but watch out, you'd better not let your cauldrom explode.",
        category: "push-your-luck",
        created_at: new Date(1610964101251),
        votes: 10,
      },
    ]);
  });
});

describe("formatCommentDataToNested", () => {
  it("should return an empty array when passed empty array", () => {
    expect(formatCommentDataToNested([])).toEqual([]);
  });
  it("should take an array of objects and return a nested array", () => {
    const input = [
      {
        body: "I loved this game too!",
        votes: 16,
        author: "happyamy2016",
        review_id: 2,
        created_at: new Date(1511354163389),
      },
      {
        body: "My dog loved this game too!",
        votes: 3,
        author: "tickle122",
        review_id: 4,
        created_at: new Date(1610964545410),
      },
      {
        body: "I didn't know dogs could play games",
        votes: 10,
        author: "weegembump",
        review_id: 4,
        created_at: new Date(1610964588110),
      },
      {
        body: "EPIC board game!",
        votes: 16,
        author: "tickle122",
        review_id: 2,
        created_at: new Date(1511354163389),
      },
    ];
    const output = [
      [
        "happyamy2016",
        2,
        16,
        new Date(1511354163389),
        "I loved this game too!",
      ],
      [
        "tickle122",
        4,
        3,
        new Date(1610964545410),
        "My dog loved this game too!",
      ],
      [
        "weegembump",
        4,
        10,
        new Date(1610964588110),
        "I didn't know dogs could play games",
      ],
      ["tickle122", 2, 16, new Date(1511354163389), "EPIC board game!"],
    ];
    expect(formatCommentDataToNested(input)).toEqual(output);
  });
  it("should return a new array without mutating the original data", () => {
    const input = [
      {
        body: "I loved this game too!",
        votes: 16,
        author: "happyamy2016",
        review_id: 2,
        created_at: new Date(1511354163389),
      },
      {
        body: "My dog loved this game too!",
        votes: 3,
        author: "tickle122",
        review_id: 4,
        created_at: new Date(1610964545410),
      },
      {
        body: "I didn't know dogs could play games",
        votes: 10,
        author: "weegembump",
        review_id: 4,
        created_at: new Date(1610964588110),
      },
      {
        body: "EPIC board game!",
        votes: 16,
        author: "tickle122",
        review_id: 2,
        created_at: new Date(1511354163389),
      },
    ];
    expect(formatCommentDataToNested(input)).not.toBe(input);
    formatCommentDataToNested(input);
    expect(input).toEqual([
      {
        body: "I loved this game too!",
        votes: 16,
        author: "happyamy2016",
        review_id: 2,
        created_at: new Date(1511354163389),
      },
      {
        body: "My dog loved this game too!",
        votes: 3,
        author: "tickle122",
        review_id: 4,
        created_at: new Date(1610964545410),
      },
      {
        body: "I didn't know dogs could play games",
        votes: 10,
        author: "weegembump",
        review_id: 4,
        created_at: new Date(1610964588110),
      },
      {
        body: "EPIC board game!",
        votes: 16,
        author: "tickle122",
        review_id: 2,
        created_at: new Date(1511354163389),
      },
    ]);
  });
});

describe("checkReviewIdExists", () => {
  it("should return either true or false when passed a number", async () => {
    const result = await checkReviewIdExists(9);
    expect(result).toBe(true);
  });
  it("should return true when the review_id passed in as an argument exists in the reviews table", async () => {
    const trueTest1 = await checkReviewIdExists(1);
    expect(trueTest1).toBe(true);
    const trueTest3 = await checkReviewIdExists(3);
    expect(trueTest3).toBe(true);
    const trueTest7 = await checkReviewIdExists(7);
    expect(trueTest7).toBe(true);
  });
  it("should return false when the review_id passed in as an argument does not exist in the reviews table", async () => {
    const falseTest987 = await checkReviewIdExists(987);
    expect(falseTest987).toBe(false);
    const falseTest1238 = await checkReviewIdExists(1238);
    expect(falseTest1238).toBe(false);
    const falseTest456 = await checkReviewIdExists(456);
    expect(falseTest456).toBe(false);
  });
  it("should not mutate the passed argument, and should return new output", async () => {
    const input = 2;
    const checkNewOutput = await checkReviewIdExists(input);
    expect(checkNewOutput).not.toBe(input);
    await checkReviewIdExists(input);
    expect(input).toEqual(2);
  });
});

describe("checkColumnExists", () => {
  it("should return either true or false when passed a variable", () => {
    expect(checkColumnExists("cats")).toBe(false);
    expect(checkColumnExists("votes")).toBe(true);
  });
  it("should return true if sort_by argument exists as a category", () => {
    expect(checkColumnExists("title")).toBe(true);
    expect(checkColumnExists("comment_count")).toBe(true);
  });
  it("should return false if sort_by argument does not exist as a category", () => {
    expect(checkColumnExists("comment count")).toBe(false);
    expect(checkColumnExists(647)).toBe(false);
  });
  it("should not mutate the passed argument, and should return new output", () => {
    const input = 27;
    expect(checkColumnExists(input)).not.toBe(input);
    checkColumnExists(input);
    expect(input).toEqual(27);
  });
});

describe("checkOrderSpecifier", () => {
  it("should return either true or false when passed a variable", () => {
    expect(checkOrderSpecifier("DDESCC")).toBe(false);
    expect(checkOrderSpecifier("desc")).toBe(true);
  });
  it("should return true if order argument passed matches DESC, desc, ASC or asc", () => {
    expect(checkOrderSpecifier("DESC")).toBe(true);
    expect(checkOrderSpecifier("desc")).toBe(true);
    expect(checkOrderSpecifier("ASC")).toBe(true);
    expect(checkOrderSpecifier("asc")).toBe(true);
  });
  it("should return false if order argument passed does not match DESC, desc, ASC or asc", () => {
    expect(checkOrderSpecifier("descending")).toBe(false);
    expect(checkOrderSpecifier(678)).toBe(false);
  });
  it("should not mutate the passed argument, and should return new output", () => {
    const input = "asc";
    expect(checkOrderSpecifier(input)).not.toBe(input);
    checkOrderSpecifier(input);
    expect(input).toEqual("asc");
  });
});

describe("checkCategoryExists", () => {
  it("should return either false or the new amended value when passed a variable", async () => {
    const testingFalse = await checkCategoryExists("cats");
    expect(testingFalse).toBe(false);
    const testingCorrectValue = await checkCategoryExists("social_deduction");
    expect(testingCorrectValue).toBe("social deduction");
  });
  it("should return false when category argument passed is not a category in the reviews table", async () => {
    const testingString = await checkCategoryExists("socialdeduction");
    expect(testingString).toBe(false);
    const testingNum = await checkCategoryExists(678);
    expect(testingNum).toBe(false);
  });
  it("should return amended value when category argument passed is a category in the reviews table", async () => {
    const testingDexterity = await checkCategoryExists("dexterity");
    expect(testingDexterity).toBe("dexterity");
    const testingEuroGame = await checkCategoryExists("euro_game");
    expect(testingEuroGame).toBe("euro game");
  });
  it("should not mutate the passed argument, and should return new output", async () => {
    const input = "cats";
    const checkNewOutput = await checkCategoryExists(input);
    expect(checkNewOutput).not.toBe(input);
    await checkCategoryExists(input);
    expect(input).toEqual("cats");
  });
});

describe("checkCommentIdExists", () => {
  it("should return either true or false when passed a number", async () => {
    const result = await checkCommentIdExists(1);
    expect(result).toBe(true);
  });
  it("should return true when the comment_id passed in as an argument exists in the comments table", async () => {
    const trueTest1 = await checkCommentIdExists(4);
    expect(trueTest1).toBe(true);
    const trueTest3 = await checkCommentIdExists(3);
    expect(trueTest3).toBe(true);
    const trueTest7 = await checkCommentIdExists(5);
    expect(trueTest7).toBe(true);
  });
  it("should return false when the comment_id passed in as an argument does not exist in the comments table", async () => {
    const falseTest987 = await checkCommentIdExists(987);
    expect(falseTest987).toBe(false);
    const falseTest1238 = await checkCommentIdExists(1238);
    expect(falseTest1238).toBe(false);
    const falseTest456 = await checkCommentIdExists(456);
    expect(falseTest456).toBe(false);
  });
  it("should not mutate the passed argument, and should return new output", async () => {
    const input = 980;
    const checkNewOutput = await checkCommentIdExists(input);
    expect(checkNewOutput).not.toBe(input);
    await checkCommentIdExists(input);
    expect(input).toEqual(980);
  });
});

describe("checkUserExists", () => {
  it("should return either true or false when passed a variable", async () => {
    const testingFalse = await checkUserExists("cats");
    expect(testingFalse).toBe(false);
    const testingTrue = await checkUserExists("dav3rid");
    expect(testingTrue).toBe(true);
  });
  it("should return false when user argument passed is not a username in the users table", async () => {
    const testingString = await checkUserExists("catsAndDogs");
    expect(testingString).toBe(false);
    const testingNum = await checkUserExists(678);
    expect(testingNum).toBe(false);
  });
  it("should return true when user argument passed is a username in the users table", async () => {
    const testingMallionaire = await checkUserExists("mallionaire");
    expect(testingMallionaire).toBe(true);
    const testingEuroGame = await checkUserExists("bainesface");
    expect(testingEuroGame).toBe(true);
  });
  it("should not mutate the passed argument, and should return new output", async () => {
    const input = "cats";
    const checkNewOutput = await checkUserExists(input);
    expect(checkNewOutput).not.toBe(input);
    await checkUserExists(input);
    expect(input).toEqual("cats");
  });
});
