"use client";

import { AnimatePresence, motion } from "framer-motion";

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  productType: "tshirt" | "sweatshirt";
}

interface SizeRow {
  size: string;
  length: string;
  width: string;
  sleeve?: string;
}

const tshirtData: SizeRow[] = [
  { size: "S", length: "71", width: "47" },
  { size: "M", length: "75", width: "52" },
  { size: "L", length: "79", width: "57" },
  { size: "XL", length: "82", width: "61" },
  { size: "2XL", length: "84", width: "64" },
  { size: "3XL", length: "85", width: "68" },
];

const sweatshirtData: SizeRow[] = [
  { size: "S", length: "71", width: "55", sleeve: "64" },
  { size: "M", length: "73", width: "59", sleeve: "66" },
  { size: "L", length: "75", width: "63", sleeve: "66" },
  { size: "XL", length: "78", width: "68", sleeve: "67" },
  { size: "2XL", length: "80", width: "73", sleeve: "68" },
];

const toIn = (cm: string) => (Number(cm) * 0.393701).toFixed(1);

export default function SizeGuideModal({ isOpen, onClose, productType }: SizeGuideModalProps) {
  const isSweatshirt = productType === "sweatshirt";
  const data = isSweatshirt ? sweatshirtData : tshirtData;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            className="relative z-10 bg-neutral-900 border border-white/10 p-8 max-w-lg w-full shadow-2xl"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <p className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-white/40 mb-1">
                  Reference Document
                </p>
                <h3 className="font-syncopate uppercase text-white text-lg tracking-wider">
                  Size Matrix ({isSweatshirt ? "Sweatshirt" : "T-Shirt"})
                </h3>
              </div>
              <button
                onClick={onClose}
                className="text-white/40 hover:text-white transition-colors"
                aria-label="Close size guide"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full font-mono text-xs text-white/70">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 pr-4 text-white/40 uppercase tracking-widest font-normal">
                      Size
                    </th>
                    <th className="text-center py-3 px-4 text-white/40 uppercase tracking-widest font-normal whitespace-nowrap">
                      Length
                    </th>
                    <th className="text-center py-3 px-4 text-white/40 uppercase tracking-widest font-normal whitespace-nowrap">
                      Width
                    </th>
                    {isSweatshirt && (
                      <th className="text-center py-3 pl-4 text-white/40 uppercase tracking-widest font-normal whitespace-nowrap">
                        Sleeve
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, i) => (
                    <tr
                      key={row.size}
                      className={
                        i < data.length - 1
                          ? "border-b border-white/5"
                          : ""
                      }
                    >
                      <td className="py-3 pr-4 text-white font-semibold">
                        {row.size}
                      </td>
                      <td className="text-center py-3 px-4 whitespace-nowrap">
                        {row.length}cm <span className="text-white/30 hidden sm:inline">({toIn(row.length)}&quot;)</span>
                      </td>
                      <td className="text-center py-3 px-4 whitespace-nowrap">
                        {row.width}cm <span className="text-white/30 hidden sm:inline">({toIn(row.width)}&quot;)</span>
                      </td>
                      {isSweatshirt && (
                        <td className="text-center py-3 pl-4 whitespace-nowrap">
                          {row.sleeve}cm <span className="text-white/30 hidden sm:inline">({toIn(row.sleeve ?? "0")}&quot;)</span>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-6 text-[0.6rem] font-mono text-white/40 uppercase tracking-widest leading-relaxed">
              Measurements provided by suppliers. May vary by up to 2&quot; (5cm).<br />
              <span className="text-white/70 font-semibold">Pro tip:</span> Measure a product you own and compare.
              {isSweatshirt && " Runs small. For a perfect fit, we recommend sizing up."}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
