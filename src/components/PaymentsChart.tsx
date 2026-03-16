"use client";
import { useState } from "react";

const monthsData = [
  { month: "Jan", payments: 45000, violations: 2500 },
  { month: "Feb", payments: 48000, violations: 1800 },
  { month: "Mar", payments: 52000, violations: 3200 },
  { month: "Apr", payments: 49000, violations: 2100 },
  { month: "May", payments: 51000, violations: 2800 },
  { month: "Jun", payments: 54000, violations: 1500 },
  { month: "Jul", payments: 53000, violations: 2200 },
  { month: "Aug", payments: 55000, violations: 1900 },
  { month: "Sep", payments: 52000, violations: 2600 },
  { month: "Oct", payments: 56000, violations: 1700 },
  { month: "Nov", payments: 54000, violations: 2400 },
  { month: "Dec", payments: 58000, violations: 2000 },
];

export default function PaymentsChart() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hoveredType, setHoveredType] = useState<
    "payments" | "violations" | null
  >(null);

  const maxValue = Math.max(
    ...monthsData.map((d) => d.payments + d.violations),
  );
  const chartHeight = 280;

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-black">
            HOA Monthly Payments, Violations and late fees (last 12 months)
          </h3>
          <p className="text-base text-black/60 mt-1">
            Monthly breakdown of payments and fees
          </p>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#1FA372] rounded"></div>
            <span className="text-base font-semibold text-black">Payments</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#FF8C42] rounded"></div>
            <span className="text-base font-semibold text-black">
              Late / Violations Fees
            </span>
          </div>
        </div>
      </div>

      {/* Chart Area */}
      <div className="relative" style={{ height: `${chartHeight + 60}px` }}>
        {/* Y-axis labels */}
        <div
          className="absolute left-0 top-0 flex flex-col justify-between text-sm font-semibold text-black"
          style={{ height: `${chartHeight}px` }}
        >
          <span>${(maxValue / 1000).toFixed(0)}K</span>
          <span>${((maxValue * 0.75) / 1000).toFixed(0)}K</span>
          <span>${((maxValue * 0.5) / 1000).toFixed(0)}K</span>
          <span>${((maxValue * 0.25) / 1000).toFixed(0)}K</span>
          <span>$0K</span>
        </div>

        {/* Chart container */}
        <div className="ml-14 h-full">
          <div
            className="relative border-l-2 border-b-2 border-black/20 pl-4"
            style={{ height: `${chartHeight}px` }}
          >
            <div className="h-full flex items-end justify-between gap-4">
              {monthsData.map((data, index) => {
                const totalValue = data.payments + data.violations;
                const totalHeightPercent = (totalValue / maxValue) * 100;
                const paymentsHeightPercent =
                  (data.payments / totalValue) * 100;
                const violationsHeightPercent =
                  (data.violations / totalValue) * 100;
                const isHovered = hoveredIndex === index;

                return (
                  <div
                    key={data.month}
                    className="flex flex-col items-center gap-3 flex-1"
                  >
                    {/* Bar container */}
                    <div
                      className="flex justify-center items-end"
                      style={{ height: `${chartHeight - 10}px` }}
                    >
                      {/* Stacked bars wrapper with fixed 10px width */}
                      <div
                        className="flex flex-col-reverse relative"
                        style={{
                          height: `${totalHeightPercent}%`,
                          width: "10px",
                        }}
                      >
                        {/* Payments bar (bottom - green) */}
                        <div
                          className="transition-all duration-300 cursor-pointer relative"
                          style={{
                            height: `${paymentsHeightPercent}%`,
                            width: "10px",
                            backgroundColor:
                              isHovered && hoveredType === "payments"
                                ? "#25C589"
                                : "#1FA372",
                            boxShadow:
                              isHovered && hoveredType === "payments"
                                ? "0 4px 16px rgba(31, 163, 114, 0.4)"
                                : "none",
                            zIndex: hoveredType === "payments" ? 10 : 1,
                          }}
                          onMouseEnter={() => {
                            setHoveredIndex(index);
                            setHoveredType("payments");
                          }}
                          onMouseLeave={() => {
                            setHoveredIndex(null);
                            setHoveredType(null);
                          }}
                        >
                          {/* Tooltip for payments */}
                          {isHovered && hoveredType === "payments" && (
                            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black text-white px-3 py-2 rounded-lg text-sm font-bold whitespace-nowrap shadow-xl z-50">
                              Payments: ${data.payments.toLocaleString()}
                              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-black"></div>
                            </div>
                          )}
                        </div>

                        {/* Violations bar (top - orange) */}
                        <div
                          className="transition-all duration-300 cursor-pointer relative"
                          style={{
                            height: `${violationsHeightPercent}%`,
                            width: "10px",
                            backgroundColor:
                              isHovered && hoveredType === "violations"
                                ? "#FFA05C"
                                : "#FF8C42",
                            boxShadow:
                              isHovered && hoveredType === "violations"
                                ? "0 4px 16px rgba(255, 140, 66, 0.4)"
                                : "none",
                            zIndex: hoveredType === "violations" ? 10 : 1,
                          }}
                          onMouseEnter={() => {
                            setHoveredIndex(index);
                            setHoveredType("violations");
                          }}
                          onMouseLeave={() => {
                            setHoveredIndex(null);
                            setHoveredType(null);
                          }}
                        >
                          {/* Tooltip for violations */}
                          {isHovered && hoveredType === "violations" && (
                            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black text-white px-3 py-2 rounded-lg text-sm font-bold whitespace-nowrap shadow-xl z-50">
                              Violations: ${data.violations.toLocaleString()}
                              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-black"></div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Month labels below x-axis */}
            <div className="absolute bottom-0 left-4 right-0 flex justify-between gap-4 translate-y-8">
              {monthsData.map((data, index) => {
                const isHovered = hoveredIndex === index;
                return (
                  <div
                    key={`label-${data.month}`}
                    className="flex-1 flex justify-center"
                  >
                    <span
                      className={`text-sm font-bold transition-all duration-300 ${
                        isHovered ? "text-black scale-110" : "text-black/70"
                      }`}
                    >
                      {data.month}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
