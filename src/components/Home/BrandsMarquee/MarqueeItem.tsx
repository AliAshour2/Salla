import React from "react";

const MarqueeItem = React.memo(
  ({ name, image }: { name: string; image: string }) => {
    return (
      <>
        <div className="flex flex-col items-center space-y-2 mx-4">
          <div className="w-24 h-24  overflow-hidden">
            <img src={image} alt={name} className="w-full h-full object-fill" />
          </div>
          <p className="text-md  font-medium text-gray-800 ">{name}</p>
        </div>
      </>
    );
  }
);

export default MarqueeItem;
