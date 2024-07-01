const PaginationSkeleton = () => {
  return (
    <div className="flex animate-pulse flex-row items-center justify-center gap-5 p-12">
      <div className="h-5 w-4 bg-gray-100 dark:bg-slate-600" />
      <div className="h-5 w-4 bg-gray-100 dark:bg-slate-600" />
      <div className="h-5 w-4 bg-gray-100 dark:bg-slate-600" />
      <div className="h-5 w-4 bg-gray-100 dark:bg-slate-600" />
      <div className="h-5 w-4 bg-gray-100 dark:bg-slate-600" />
      <div className="h-5 w-4 bg-gray-100 dark:bg-slate-600" />
      <div className="h-5 w-4 bg-gray-100 dark:bg-slate-600" />
      <div className="h-5 w-4 bg-gray-100 dark:bg-slate-600" />
    </div>
  );
};

export default PaginationSkeleton;