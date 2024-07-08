const InformationViewerSkeleton = () => {
  return (
    <div className="w-[60rem] animate-pulse max-[1024px]:w-[39.75rem] max-[744px]:w-[calc(100%_-_48px)]">
      <div className="flex flex-row items-center justify-between overflow-x-hidden max-[1024px]:flex-col">
        <div className="w-full pb-4 lg:hidden">
          <div className="h-10 w-96 bg-gray-100 dark:bg-slate-600" />
          <div className="flex flex-row items-end justify-between py-4">
            <div className="flex flex-row items-center gap-2">
              <div className="h-12 w-12 rounded-full bg-gray-100 shadow dark:bg-slate-600" />
              <div className="space-y-1">
                <p className="h-4 w-8 bg-gray-100 dark:bg-slate-600" />
                <p className="h-4 w-20 bg-gray-100 dark:bg-slate-600" />
              </div>
            </div>
            <div className="flex flex-row items-center gap-3">
              <div className="flex flex-row items-center gap-1 text-gray2">
                <div className="h-4 w-4 bg-gray-100 dark:bg-slate-600" />
                <div className="h-4 w-7 bg-gray-100 dark:bg-slate-600" />
              </div>
              <div className="flex flex-row items-center gap-1 text-gray2">
                <div className="h-4 w-4 bg-gray-100 dark:bg-slate-600" />
                <div className="h-4 w-7 bg-gray-100 dark:bg-slate-600" />
              </div>
            </div>
          </div>
        </div>
        <div className="h-[34.5rem] w-[29.375rem] max-[1024px]:w-full max-[744px]:h-[27.5625rem]">
          <div className="h-[26.0625rem] w-full rounded-2xl bg-gray-100 max-[744px]:h-[19.125rem] dark:bg-slate-600" />
          <div className="flex w-fit flex-row items-center gap-[0.875rem] overflow-x-hidden pt-[0.875rem]">
            {[1, 2, 3, 4].map((value) => (
              <div
                key={value}
                className="h-[6.6875rem] w-[6.6875rem] rounded-lg bg-gray-100 dark:bg-slate-600"
              />
            ))}
          </div>
        </div>
        <div className="flex h-[34.5rem] w-[29.375rem] flex-col overflow-y-auto px-[1.25rem] max-[1024px]:h-fit max-[1024px]:w-full max-[1024px]:px-0 max-[1024px]:pt-8">
          <div className="max-[1024px]:hidden">
            <div className="h-10 w-96 bg-gray-100 dark:bg-slate-600" />
            <div className="flex flex-row items-end justify-between py-4">
              <div className="flex flex-row items-center gap-2">
                <div className="h-12 w-12 rounded-full bg-gray-100 shadow dark:bg-slate-600" />
                <div className="space-y-1">
                  <p className="h-4 w-8 bg-gray-100 dark:bg-slate-600" />
                  <p className="h-4 w-20 bg-gray-100 dark:bg-slate-600" />
                </div>
              </div>
              <div className="flex flex-row items-center gap-3">
                <div className="flex flex-row items-center gap-1 text-gray2">
                  <div className="h-4 w-4 bg-gray-100 dark:bg-slate-600" />
                  <div className="h-4 w-7 bg-gray-100 dark:bg-slate-600" />
                </div>
                <div className="flex flex-row items-center gap-1 text-gray2">
                  <div className="h-4 w-4 bg-gray-100 dark:bg-slate-600" />
                  <div className="h-4 w-7 bg-gray-100 dark:bg-slate-600" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center gap-1 py-3">
            <div className="h-4 w-4 bg-gray-100 dark:bg-slate-600" />
            <div className="h-4 w-60 bg-gray-100 dark:bg-slate-600" />
          </div>
          <div className="flex flex-col gap-2 py-4">
            <div className="h-5 w-full bg-gray-100 dark:bg-slate-600" />
            <div className="h-5 w-full bg-gray-100 dark:bg-slate-600" />
            <div className="h-5 w-full bg-gray-100 dark:bg-slate-600" />
            <div className="h-5 w-full bg-gray-100 dark:bg-slate-600" />
            <div className="h-5 w-20 bg-gray-100 dark:bg-slate-600" />
          </div>
          <div className="flex flex-row items-center gap-1 pb-8">
            <div className="h-6 w-16 rounded-full bg-gray-100 dark:bg-slate-600" />
            <div className="h-6 w-16 rounded-full bg-gray-100 dark:bg-slate-600" />
            <div className="h-6 w-16 rounded-full bg-gray-100 dark:bg-slate-600" />
          </div>
          <div className="flex flex-col gap-3 border-y-2 border-gray3 px-6 py-4">
            <div className="h-6 w-32 bg-gray-100 dark:bg-slate-600" />
            {[1, 2, 3].map((value) => (
              <div
                key={value}
                className="ml-6 h-5 w-80 bg-gray-100 align-baseline dark:bg-slate-600"
              />
            ))}
          </div>
        </div>
      </div>
      <div className="mt-20 flex h-48 flex-col">
        <div className="h-48 w-full rounded-2xl border-[0.0625rem] bg-gray-100 dark:bg-slate-600" />
      </div>
      <div className="-mt-4 flex h-fit w-full flex-col justify-center gap-2 rounded-b-2xl border-x-[0.0625rem] border-b-[0.0625rem] px-6 pb-10 pt-12">
        <div className="h-8 w-40 bg-gray-100 dark:bg-slate-600" />
        <div className="flex flex-row items-start gap-1">
          <div className="h-5 w-5 bg-gray-100 dark:bg-slate-600" />
          <div className="h-5 w-80 bg-gray-100 dark:bg-slate-600" />
        </div>
      </div>
      <div className="mt-6 flex flex-row items-center justify-end gap-3">
        <div className="flex flex-row items-center gap-1">
          <div className="h-4 w-4 bg-gray-100 dark:bg-slate-600" />
          <div className="h-4 w-7 bg-gray-100 dark:bg-slate-600" />
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="h-4 w-4 bg-gray-100 dark:bg-slate-600" />
          <div className="h-4 w-7 bg-gray-100 dark:bg-slate-600" />
        </div>
      </div>
    </div>
  );
};

export default InformationViewerSkeleton;