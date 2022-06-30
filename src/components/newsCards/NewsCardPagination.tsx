import { Pagination } from "react-bootstrap";
import { ICardListState } from "./NewsCardList";


export const NewsCardPagination = ({ state, handleChangePage }: { state: ICardListState; handleChangePage: (page: number) => void; }) => {
  let { pageCount, currentPage } = state;

  let pageList = Array.from({ length: pageCount }, (v, k) => k + 1);
  let max = Math.min(currentPage + 2, pageCount - 1);
  let min = Math.max(currentPage - 2, 2);

  function shouldShowItem(pageNumber: number): boolean {
    return (
      pageNumber === 1 ||
      pageNumber === pageCount ||
      (pageNumber >= min && pageNumber <= max));
  }

  function shouldShowEllipsis(pageNumber: number): boolean {
    return (
      pageNumber === 2 && pageNumber <= min) ||
      (pageNumber === (pageCount - 1) && pageNumber >= max);
  }

  return (
    <Pagination className='my-3'>
      <Pagination.First onClick={() => handleChangePage(1)} />
      <Pagination.Prev onClick={() => handleChangePage(Math.max(currentPage - 1, 1))} />
      {pageList.map((pageNumber: number) => shouldShowItem(pageNumber) ? (
        <Pagination.Item
          key={pageNumber}
          active={pageNumber === currentPage}
          onClick={() => handleChangePage(pageNumber)}
        >
          {pageNumber}
        </Pagination.Item>
      ) :
        shouldShowEllipsis(pageNumber) ? (
          <Pagination.Ellipsis key={pageNumber} />
        ) :
          <div key={pageNumber}></div>
      )}
      <Pagination.Next onClick={() => handleChangePage(Math.min(currentPage + 1, pageCount))} />
      <Pagination.Last onClick={() => handleChangePage(pageCount)} />
    </Pagination>
  );
};
