import AutoSizer from 'react-virtualized-auto-sizer';
import InfiniteLoader from 'react-window-infinite-loader';
import { useRef } from 'react';
import { FixedSizeGrid as Grid, GridChildComponentProps } from 'react-window';
import { useFavoritesContext } from '@/context/favorites/useFavoritesContext';
import { Card } from '@/components/card/Card';
import { SkeletonCard } from '@/components/card/SkeletonCard';
import { IHero } from '@/types';
import { GridConfig } from '@/constants/ui';

const { MIN_CARD_WIDTH, ROW_HEIGHT, GAP } = GridConfig;

export const FavoriteList = () => {
  const { favorites, toggleFavorite } = useFavoritesContext();
  const columnCountRef = useRef(1);

  return (
    <div className="w-full h-screen p-5 rounded-[30px]">
      <AutoSizer>
        {({ height, width }) => {
          if (width === 0 || height === 0) return null;

          const columns = Math.min(5, Math.floor(width / MIN_CARD_WIDTH));
          columnCountRef.current = columns;

          const itemWidth = width / columns - GAP;
          const itemCount = favorites.length;
          const rowCount = Math.ceil(itemCount / columns);
          const hasMoreItems = false;

          const isItemLoaded = (index: number) => index < favorites.length;

          const loadMoreItems = async (): Promise<void> => {
            // no extra loading, just a dummy async function for the lib
            await new Promise(resolve => setTimeout(resolve, 0));
          };

          const Cell = ({ columnIndex, rowIndex, style }: GridChildComponentProps) => {
            const index = rowIndex * columns + columnIndex;
            const hero: IHero | undefined = favorites[index];
            const shouldShowSkeleton = hasMoreItems && !hero;
            let content = null;

            if (hero) {
              content = (
                <Card
                  hero={hero}
                  toggleFavorite={() => toggleFavorite(hero)}
                  isFavorite={true}
                />
              );
            } else if (shouldShowSkeleton) {
              content = <SkeletonCard />;
            }

            return (
              <div style={{ ...style, padding: GAP / 2 }}>
                {content}
              </div>
            );
          };

          return (
            <InfiniteLoader
              isItemLoaded={isItemLoaded}
              itemCount={itemCount}
              loadMoreItems={loadMoreItems}
              threshold={columns * 2}
            >
              {({ onItemsRendered, ref }) => (
                <Grid
                  ref={ref}
                  columnCount={columns}
                  columnWidth={itemWidth + GAP}
                  height={height}
                  rowCount={rowCount}
                  rowHeight={ROW_HEIGHT + GAP}
                  width={width}
                  itemKey={({ columnIndex, rowIndex }) =>
                    `${rowIndex * columns + columnIndex}-${columns}`
                  }
                  onItemsRendered={({ overscanRowStartIndex, overscanRowStopIndex }) => {
                    const startIndex = overscanRowStartIndex * columns;
                    const stopIndex = (overscanRowStopIndex + 1) * columns - 1;
                    onItemsRendered({
                      overscanStartIndex: startIndex,
                      overscanStopIndex: stopIndex,
                      visibleStartIndex: startIndex,
                      visibleStopIndex: stopIndex
                    });
                  }}
                >
                  {Cell}
                </Grid>
              )}
            </InfiniteLoader>
          );
        }}
      </AutoSizer>
    </div>
  );
};