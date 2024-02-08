import { faker } from "@faker-js/faker";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  const users = [];
  for (let i = 0; i < 20; i++) {
    const user = {
      email: faker.internet.email(),
      name: faker.person.fullName(),
      username: faker.internet.userName(),
      image: faker.image.avatar(),
      bio: faker.lorem.sentence(),
      link: faker.internet.url(),
    } satisfies Prisma.UserCreateInput;

    const dbUser = await prisma.user.create({ data: user });

    users.push(dbUser);
  }

  const posts = [];

  for (let index = 0; index < 100; index++) {
    const randomUserIndex = faker.number.int({ min: 0, max: users.length - 1 });

    const randomWorldCount = faker.number.int({
      min: 5,
      max: 12,
    });

    const post = {
      content: faker.lorem.sentence(randomWorldCount),
      published: true,
      userId: users[randomUserIndex].id,
      createdAt: faker.date.recent(),
    } satisfies Prisma.PostUncheckedCreateInput;

    const postDb = await prisma.post.create({ data: post });

    posts.push(postDb);
  }

  for (let i = 0; i < 200; i++) {
    const randomUserIndex = faker.number.int({ min: 0, max: users.length - 1 });

    const randomPostIndex = faker.number.int({ min: 0, max: posts.length - 1 });

    const like = {
      userId: users[randomUserIndex].id,
      postId: posts[randomPostIndex].id,
    } satisfies Prisma.LikeUncheckedCreateInput;

    await prisma.like.create({ data: like });
  }
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
