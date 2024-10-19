const CourseSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="p-6">
        <div className="h-6 bg-yellow-200 rounded mb-4"></div>
        <div className="h-4 bg-yellow-200 rounded mb-4"></div>
        <div className="flex justify-between items-center mb-4">
          <div className="h-4 bg-yellow-200 rounded w-1/4"></div>
          <div className="h-4 bg-yellow-200 rounded w-1/4"></div>
        </div>
        <div className="flex items-center mb-4">
          <div className="h-5 w-5 bg-yellow-200 rounded-full mr-1"></div>
          <div className="h-4 bg-yellow-200 rounded w-1/6"></div>
          <div className="h-4 bg-yellow-200 rounded w-1/3 ml-2"></div>
        </div>
        <div className="flex justify-between items-center">
          <div className="h-4 bg-yellow-200 rounded w-1/3"></div>
          <div className="h-8 bg-yellow-200 rounded-full w-1/4"></div>
        </div>
      </div>
    </div>
  );
};

export default CourseSkeleton;
