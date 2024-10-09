

const MarqueeItemSkeleton = () => {
  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="w-24 h-24 bg-gray-200 rounded-full animate-pulse" />
      <div className="w-20 h-4 bg-gray-200 rounded animate-pulse" />
    </div>
  );
};

export default MarqueeItemSkeleton;
