"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "./src/features/components/ui/button";

export default function Landing() {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* HERO */}
      <section className="h-screen flex flex-col justify-center items-center text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-7xl font-semibold tracking-tight"
        >
          Kingsman Co
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mt-6 text-gray-500 text-lg max-w-xl"
        >
          Timeless pieces. Modern silhouettes. Built for presence.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="mt-10"
        >
          <Link href="/products">
            <Button className="bg-black text-white hover:bg-gray-800 rounded-full px-10 py-5 text-lg">
              Enter Shop
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* DIVIDER */}
      <div className="w-full border-t border-gray-200" />

      {/* BRAND STATEMENT */}
      <section className="py-24 px-6 text-center max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-medium leading-snug"
        >
          Designed with intention. Worn with confidence.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-6 text-gray-500"
        >
          Kingsman Co focuses on clean design, premium feel, and pieces that
          elevate your everyday style.
        </motion.p>
      </section>

      {/* FEATURE BLOCKS */}
      <section className="grid md:grid-cols-3 border-t border-gray-200">
        {["Minimal", "Refined", "Essential"].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            className="p-12 border-r last:border-r-0 border-gray-200 text-center"
          >
            <h3 className="text-xl font-medium">{item}</h3>
            <p className="mt-4 text-gray-500 text-sm">
              Built around simplicity and strong identity.
            </p>
          </motion.div>
        ))}
      </section>

      {/* FINAL CTA */}
      <section className="py-24 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-medium"
        >
          Step into Kingsman
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-8"
        >
          <Link href="/products">
            <Button className="bg-black text-white hover:bg-gray-800 rounded-full px-10 py-5 text-lg">
              Shop Now
            </Button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
