"use client";

import { AnimatePresence, motion } from "framer-motion";

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const sizeData = [
  { size: "XS", chest: "33–35", length: "27", shoulder: "16" },
  { size: "S", chest: "35–37", length: "28", shoulder: "17" },
  { size: "M", chest: "38–40", length: "29", shoulder: "18" },
  { size: "L", chest: "41–43", length: "30", shoulder: "19" },
  { size: "XL", chest: "44–46", length: "31", shoulder: "20" },
  { size: "2XL", chest: "47–49", length: "32", shoulder: "21" },
  { size: "3XL", chest: "50–52", length: "33", shoulder: "22" },
];

export default function SizeGuideModal({ isOpen, onClose }: SizeGuideModalProps) {
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
                  Size Matrix
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
                    <th className="text-center py-3 px-4 text-white/40 uppercase tracking-widest font-normal">
                      Chest (in)
                    </th>
                    <th className="text-center py-3 px-4 text-white/40 uppercase tracking-widest font-normal">
                      Length (in)
                    </th>
                    <th className="text-center py-3 pl-4 text-white/40 uppercase tracking-widest font-normal">
                      Shoulder (in)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sizeData.map((row, i) => (
                    <tr
                      key={row.size}
                      className={
                        i < sizeData.length - 1
                          ? "border-b border-white/5"
                          : ""
                      }
                    >
                      <td className="py-3 pr-4 text-white font-semibold">
                        {row.size}
                      </td>
                      <td className="text-center py-3 px-4">{row.chest}</td>
                      <td className="text-center py-3 px-4">{row.length}</td>
                      <td className="text-center py-3 pl-4">{row.shoulder}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-6 text-[0.6rem] font-mono text-white/30 uppercase tracking-widest">
              All measurements in inches. Products are true to size. Size up for
              oversized fit.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
