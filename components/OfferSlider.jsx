"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { offers } from '@/data/mockData';

export default function OfferSlider() {
  const [currentOffer, setCurrentOffer] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentOffer((prev) => (prev + 1) % offers.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-yellow-500 text-black py-2 overflow-hidden">
      <div className="container mx-auto px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentOffer}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center font-semibold text-sm md:text-base"
          >
            {offers[currentOffer]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
