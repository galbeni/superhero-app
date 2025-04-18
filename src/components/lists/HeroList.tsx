import AutoSizer from 'react-virtualized-auto-sizer';
import InfiniteLoader from 'react-window-infinite-loader';
import { useEffect, useRef } from 'react';
import { FixedSizeGrid as Grid, GridChildComponentProps } from 'react-window';
import { useHeroesContext } from '@/context/heroes/useHeroesContext';
import { useFavoritesContext } from '@/context/favorites/useFavoritesContext';
import { useFilteredHeroes } from '@/hooks/useFilteredHeroes';
import { useUIContext } from '@/context/ui/useUIContext';
import { Card } from '@/components/card/Card';
import { SkeletonCard } from '@/components/card/SkeletonCard';
import { Spinner } from '@/components/Spinner';
import { GridConfig } from '@/constants/ui';
import { IHero } from '@/types';

const { MIN_CARD_WIDTH, ROW_HEIGHT, GAP, LOAD_DELAY } = GridConfig;

export const HeroList = () => {
  const { loading } = useHeroesContext();

  const {
    resetSignal,
    setCurrentPage
  } = useUIContext();

  const {
    filteredHeroes,
    filteredFull
  } = useFilteredHeroes();

  const {
    favorites,
    toggleFavorite
  } = useFavoritesContext();

  const columnCountRef = useRef(1);

  const gridRef = useRef<Grid>(null);

  useEffect(() => {
    if (gridRef.current) {
      gridRef.current?.scrollToItem({ rowIndex: 0, columnIndex: 0 });
    }
  }, [resetSignal]);

  return (
    <div className="w-full h-screen relative p-5 rounded-[30px]">
      {loading ? (
        <Spinner />
      ) : (
      <AutoSizer>
        {({ height, width }) => {
          if (width === 0 || height === 0) return null;

          const columns = Math.min(5, Math.floor(width / MIN_CARD_WIDTH));
          columnCountRef.current = columns;

          const itemWidth = width / columns - GAP;
          const totalItemCount = filteredFull.length;
          const rowCount = Math.ceil(totalItemCount / columns);

          const isItemLoaded = (index: number) => index < filteredHeroes.length;
          const hasMoreItems = filteredHeroes.length < filteredFull.length;

          const loadMoreItems = async () => {
            if (filteredHeroes.length < filteredFull.length) {
              await new Promise(resolve => setTimeout(resolve, LOAD_DELAY));
              setCurrentPage(prev => prev + 1);
            }
          };

          const Cell = ({ columnIndex, rowIndex, style }: GridChildComponentProps) => {
            const index = rowIndex * columns + columnIndex;
            const hero: IHero | undefined = filteredHeroes[index];
            const shouldShowSkeleton = hasMoreItems && !hero;
            let content = null;

            if (hero) {
              content = (
                <Card
                  hero={hero}
                  toggleFavorite={() => toggleFavorite(hero)}
                  isFavorite={favorites.some(favorite => favorite.id === hero.id)}
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
              itemCount={totalItemCount}
              loadMoreItems={loadMoreItems}
              threshold={columns * 2}
            >
              {({ onItemsRendered, ref }) => (
                <Grid
                  ref={el => {
                    ref(el);
                    gridRef.current = el;
                  }}
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
      )}
    </div>
  );
};