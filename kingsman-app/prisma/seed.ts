import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({
  adapter,
});

async function main() {
  await prisma.product.createMany({
    data: [
      {
        name: "Olive.",
        price: 12,
        image:
          "https://cdn.shopify.com/s/files/1/1762/7269/files/5_100_1000x1000.jpg?v=1761463435",
        quantity: 50,
      },
      {
        name: "Noir.",
        price: 12,
        image:
          "https://mn-la.com/cdn/shop/files/7_95_dab806f8-ec1a-4949-87fe-7e8e641debab.jpg?v=1763226264&width=600",
        quantity: 50,
      },
      {
        name: "Dark.",
        price: 12,
        image:
          "https://cdn.shopify.com/s/files/1/1762/7269/files/IMG-4765_1000x1000.jpg?v=1751352855",
        quantity: 50,
      },

      {
        name: "Beige.",
        price: 12,
        image: "/images/beige.png",
        quantity: 50,
      },
      {
        name: "Covered.",
        price: 12,
        image: "/images/covered.png",
        quantity: 50,
      },

      {
        name: "Drowning.",
        price: 12,
        image: "/images/drowning.png",
        quantity: 50,
      },

      {
        name: "Future.",
        price: 12,
        image: "/images/future.png",
        quantity: 50,
      },

      {
        name: "Italy.",
        price: 12,
        image: "/images/italy.png",
        quantity: 50,
      },
      {
        name: "Liberty.",
        price: 12,
        image: "/images/liberty.png",
        quantity: 50,
      },
      {
        name: "Logo.",
        price: 12,
        image: "/images/logo.jpg",
        quantity: 50,
      },

      {
        name: "Mary.",
        price: 12,
        image: "/images/mary.png",
        quantity: 50,
      },

      {
        name: "Smiths.",
        price: 12,
        image: "/images/smiths.png",
        quantity: 50,
      },

      {
        name: "Vintage.",
        price: 12,
        image: "/images/vintage.png",
        quantity: 50,
      },
    ],
    skipDuplicates: false,
  });

  console.log("Seed data inserted successfully.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
