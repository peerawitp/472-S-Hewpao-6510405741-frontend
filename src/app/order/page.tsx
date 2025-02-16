import Link from "next/link";
import React from "react";

function page() {
  return (
    <div className="min-h-screen">
      <div className="min-h-screen flex items-center justify-center h-full">
        <Link
          href="order/create-order"
          className="text-[#FFFFFF] bg-[#000000] border-dotted flex rounded-tl-[16px] rounded-tr-[16px] h-[fit-content] p-[16px] rounded-bl-[16px] w-[fit-content] hover:bg-[#494949] rounded-br-[16px] font-medium"
        >
          Create order
        </Link>
      </div>
    </div>
  );
}

export default page;
