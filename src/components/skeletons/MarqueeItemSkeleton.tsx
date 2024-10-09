
const MarqueeItemSkeleton = () => {
  return (
    <div className="flex flex-col items-center mx-4">
      <div className="w-24 h-24 bg-gray-200 rounded-full animate-pulse" />
      <div className="w-20 h-4 bg-gray-300 rounded animate-pulse mt-2" />
    </div>
  );
};

export default MarqueeItemSkeleton;
