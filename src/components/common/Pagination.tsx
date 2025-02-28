import { AiOutlineEllipsis } from "react-icons/ai";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { MdFirstPage, MdLastPage } from "react-icons/md";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageHandler: (currentPage: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  pageHandler,
}: PaginationProps) => {
  const pageList = Array.from({ length: totalPages }, (_, index) => index + 1);
  const leftPage = Math.max(currentPage - 2, 1);
  const rightPage = Math.min(leftPage + 4, totalPages);

  return (
    <div className="flex flex-row items-center justify-center gap-3 py-12 text-sm text-black">
      {currentPage > 1 ? (
        <button onClick={() => pageHandler(1)}>
          <MdFirstPage
            className="cursor-pointer hover:text-main"
            size={"1.1rem"}
          />
        </button>
      ) : (
        <div className="aspect-square w-[0.875rem] opacity-100"> </div>
      )}
      {currentPage > 1 ? (
        <button onClick={() => pageHandler(currentPage - 1)}>
          <IoIosArrowBack className="cursor-pointer hover:text-main" />
        </button>
      ) : (
        <div className="aspect-square w-[0.875rem] opacity-100"> </div>
      )}
      {leftPage > 1 && (
        <div className="flex flex-row items-center gap-3">
          <button
            onClick={() => pageHandler(1)}
            className="flex h-6 w-6 items-center justify-center hover:text-main"
          >
            1
          </button>
          <AiOutlineEllipsis />
        </div>
      )}
      {pageList.slice(leftPage - 1, rightPage).map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => pageHandler(pageNumber)}
          className={`${pageNumber === currentPage ? "bg-main text-white" : ""} flex h-6 w-6 items-center justify-center rounded-full hover:text-main`}
        >
          {pageNumber}
        </button>
      ))}
      {rightPage < totalPages && (
        <div className="flex flex-row items-center gap-3">
          <AiOutlineEllipsis />
          <button
            className="flex h-6 w-6 items-center justify-center hover:text-main"
            onClick={() => pageHandler(totalPages)}
          >
            {totalPages}
          </button>
        </div>
      )}
      {currentPage < totalPages ? (
        <button onClick={() => pageHandler(currentPage + 1)}>
          <IoIosArrowForward className="cursor-pointer hover:text-main" />
        </button>
      ) : (
        <div className="aspect-square w-[0.875rem] opacity-100"> </div>
      )}
      {currentPage < totalPages ? (
        <button onClick={() => pageHandler(totalPages)}>
          <MdLastPage
            className="cursor-pointer hover:text-main"
            size={"1.1rem"}
          />
        </button>
      ) : (
        <div className="aspect-square w-[0.875rem] opacity-100" />
      )}
    </div>
  );
};

export default Pagination;
