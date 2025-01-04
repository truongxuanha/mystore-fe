import { Banknote, FileText, Inbox, Star, Truck } from "lucide-react";
import { useState } from "react";
import { cn } from "utils";

const PurchaseOrderDetail = () => {
  const [process, setProcess] = useState({
    index: 1,
    percent: 20,
  });
  const steps = [
    {
      status: "pending",
      label: "Đơn hàng đã đặt",
      icon: FileText,
      time: "2025-01-03",
    },
    {
      status: "confirmed",
      label: "Đã xác nhận đơn hàng",
      icon: Banknote,
      time: "2025-01-03",
    },
    { status: "shipped", label: "Đã giao cho ĐVVC", icon: Truck },
    { status: "delivered", label: "Đã nhận được hàng", icon: Inbox },
    { status: "reviewed", label: "Đánh giá", icon: Star },
  ];

  return (
    <div onClick={() => setProcess({ index: 2, percent: 40 })}>
      <div className={cn("w-full overflow-x-auto scrollbar-hide")}>
        <div className="min-w-[963px] py-10 px-6 bg-white border-t border-gray-300 border-dotted">
          <div className="relative stepper flex justify-between items-start">
            {steps.map((step, index) => (
              <div key={index} className="z-10 w-36 stepper__step flex flex-col justify-center items-center">
                <div
                  className={cn(
                    "w-14 h-14 bg-white flex items-center justify-center border-[4px]  rounded-full",
                    process.index == index + 1 ? "bg-[#2dc258] border-none" : process.index > index + 1 ? "border-[#2dc258]" : "border-gray-100",
                  )}
                >
                  {
                    <step.icon
                      size={30}
                      className={cn(process.index == index + 1 ? "text-white" : process.index > index + 1 ? "text-[#2dc258]" : "text-[#ccc]")}
                    />
                  }
                </div>
                <div className="capitalize mt-5 text-center">
                  <p className="text-wrap max-w-40">{step.label}</p>
                  <span className="text-xs text-[#00000042]">{step?.time ? new Date(step.time).toLocaleString("vi-VN") : ""}</span>
                </div>
              </div>
            ))}
            <div style={{ width: `${process.percent}%` }} className={cn("absolute  top-6 h-1")}>
              <span className="absolute h-full bg-[#2dc258] w-[calc(100%_-_130px)] ml-12"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseOrderDetail;
