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
        name: "Regal",
        price: 200,
        image: "/images/suit-01.png",
        quantity: 1000,
      },
      {
        name: "Noble",
        price: 150,
        image: "/images/suit-02.png",
        quantity: 1000,
      },
      {
        name: "Prestige",
        price: 220,
        image: "/images/suit-03.png",
        quantity: 1000,
      },
      {
        name: "Imperial",
        price: 250,
        image: "/images/suit-04.png",
        quantity: 1000,
      },
      {
        name: "Majestic",
        price: 240,
        image: "/images/suit-05.png",
        quantity: 1000,
      },
      {
        name: "Sovereign",
        price: 280,
        image: "/images/suit-06.png",
        quantity: 1000,
      },
      {
        name: "Sterling",
        price: 230,
        image: "/images/suit-07.png",
        quantity: 1000,
      },
      {
        name: "Monarch",
        price: 300,
        image: "/images/suit-08.png",
        quantity: 1000,
      },
      {
        name: "Elite",
        price: 210,
        image: "/images/suit-09.png",
        quantity: 1000,
      },
      {
        name: "Opulent",
        price: 260,
        image: "/images/suit-10.png",
        quantity: 1000,
      },
      {
        name: "Paramount",
        price: 290,
        image: "/images/suit-11.png",
        quantity: 1000,
      },
      {
        name: "Velour",
        price: 240,
        image: "/images/suit-12.png",
        quantity: 1000,
      },
      {
        name: "Ascend",
        price: 220,
        image: "/images/suit-13.png",
        quantity: 1000,
      },
      {
        name: "Legacy",
        price: 270,
        image: "/images/suit-14.png",
        quantity: 1000,
      },
      {
        name: "Apex",
        price: 230,
        image: "/images/suit-15.png",
        quantity: 1000,
      },
      {
        name: "Prime",
        price: 210,
        image: "/images/suit-16.png",
        quantity: 1000,
      },
      {
        name: "Crest",
        price: 220,
        image: "/images/suit-17.png",
        quantity: 1000,
      },
      {
        name: "Vanguard",
        price: 280,
        image: "/images/suit-18.png",
        quantity: 1000,
      },
      {
        name: "Heritage",
        price: 260,
        image: "/images/suit-19.png",
        quantity: 1000,
      },
      {
        name: "Refined",
        price: 240,
        image: "/images/suit-20.png",
        quantity: 1000,
      },
      {
        name: "Virtue",
        price: 210,
        image: "/images/suit-21.png",
        quantity: 1000,
      },
      {
        name: "Poise",
        price: 220,
        image: "/images/suit-22.png",
        quantity: 1000,
      },
      {
        name: "Eminence",
        price: 290,
        image: "/images/suit-23.png",
        quantity: 1000,
      },
      {
        name: "Summit",
        price: 230,
        image: "/images/suit-24.png",
        quantity: 1000,
      },
      {
        name: "Noir",
        price: 250,
        image: "/images/suit-25.png",
        quantity: 1000,
      },
      {
        name: "Grand",
        price: 220,
        image: "/images/suit-26.png",
        quantity: 1000,
      },
      {
        name: "Honor",
        price: 240,
        image: "/images/suit-27.png",
        quantity: 1000,
      },
      {
        name: "Estate",
        price: 260,
        image: "/images/suit-28.png",
        quantity: 1000,
      },
      {
        name: "Couture",
        price: 300,
        image: "/images/suit-29.png",
        quantity: 1000,
      },
      {
        name: "Signature",
        price: 280,
        image: "/images/suit-30.png",
        quantity: 1000,
      },
      {
        name: "Classic",
        price: 200,
        image: "/images/suit-31.png",
        quantity: 1000,
      },
      {
        name: "Radiant",
        price: 240,
        image: "/images/suit-32.png",
        quantity: 1000,
      },
      {
        name: "Lucent",
        price: 230,
        image: "/images/suit-33.png",
        quantity: 1000,
      },
      {
        name: "Echelon",
        price: 310,
        image: "/images/suit-34.png",
        quantity: 1000,
      },
      {
        name: "Royal",
        price: 260,
        image: "/images/suit-35.png",
        quantity: 1000,
      },
      {
        name: "Supreme",
        price: 320,
        image: "/images/suit-36.png",
        quantity: 1000,
      },
      {
        name: "Ardent",
        price: 280,
        image: "/images/suit-37.png",
        quantity: 1000,
      },
      {
        name: "Gallant",
        price: 260,
        image: "/images/suit-38.png",
        quantity: 1000,
      },
      {
        name: "Distinguished",
        price: 320,
        image: "/images/suit-39.png",
        quantity: 1000,
      },
      {
        name: "Exquisite",
        price: 300,
        image: "/images/suit-40.png",
        quantity: 1000,
      },
      {
        name: "Timeless",
        price: 240,
        image: "/images/suit-41.png",
        quantity: 1000,
      },
      {
        name: "Aristocrat",
        price: 340,
        image: "/images/suit-42.png",
        quantity: 1000,
      },
      {
        name: "Bespoke",
        price: 350,
        image: "/images/suit-43.png",
        quantity: 1000,
      },
      {
        name: "Luxor",
        price: 290,
        image: "/images/suit-44.png",
        quantity: 1000,
      },
    ],

    skipDuplicates: false,
  });

  console.log("Seed data inserted successfully.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
