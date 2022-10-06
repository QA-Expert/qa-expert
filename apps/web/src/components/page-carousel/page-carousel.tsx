import { ReactNode, useState } from 'react';
import { Block } from '../block/block';
import { Chewron } from '../chewron/chewron';

interface Props<T> {
  pages?: T[];
  getPage: (page: T) => ReactNode;
}

export function PageCarousel<T>({ pages, getPage }: Props<T>) {
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);

  if (!pages?.length) {
    return null;
  }

  const handleBackwardClick = () => {
    const newIndex =
      currentPageIndex >= 1 ? currentPageIndex - 1 : currentPageIndex;

    setCurrentPageIndex(newIndex);
  };
  const handleForwardClick = () => {
    const newIndex =
      currentPageIndex < pages.length - 1
        ? currentPageIndex + 1
        : currentPageIndex;

    setCurrentPageIndex(newIndex);
  };

  return (
    <Block orientation="row" size="fill">
      {pages?.length > 1 && (
        <Chewron
          direction={'backward'}
          css={{ fontSize: '$5' }}
          onClick={handleBackwardClick}
          disabled={currentPageIndex === 0}
        />
      )}

      {getPage(pages[currentPageIndex])}

      {pages?.length > 1 && (
        <Chewron
          direction={'forward'}
          css={{ fontSize: '$5' }}
          onClick={handleForwardClick}
          disabled={currentPageIndex === pages.length - 1}
        />
      )}
    </Block>
  );
}
