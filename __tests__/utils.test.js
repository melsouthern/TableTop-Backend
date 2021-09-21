const {
  formatCategoryDataToNested,
  formatUserDataToNested,
  formatReviewDataToNested,
  formatCommentDataToNested,
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
    expect(input).toEqual(input);
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
    expect(input).toEqual(input);
  });
});
