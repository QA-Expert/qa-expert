import List from '@mui/material/List';
import { GetCourseQuery } from '__generated__/graphql';
import { NavigationPageListItem } from './navigation-page-list-item';
import usePagination from '@mui/material/usePagination';
import Link from 'next/link';

type Props = {
  pages: GetCourseQuery['course']['pages'];
  onPageChange: (currentPageIndex: number) => void;
  currentPageIndex: number;
};

export function NavigationPagesList({
  pages,
  onPageChange,
  currentPageIndex,
}: Props) {
  const { items } = usePagination({
    count: pages.length,
    page: currentPageIndex + 1,
  });

  return (
    <List
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      {items.map(({ page, type, selected }) =>
        // NOTE: we need that check as item is represented as UsePaginationItem
        // and there are different types of pagination items like "..." that can be used to reduce amount of shown pages "1 2 ... 9 10"
        // so we care only about actual pages
        page && type === 'page' ? (
          <Link key={page} href={`#${page}`}>
            <NavigationPageListItem
              currentPageNumber={page}
              page={pages[page - 1]}
              selected={selected}
              onClick={() => onPageChange(page - 1)}
            />
          </Link>
        ) : null,
      )}
    </List>
  );
}
