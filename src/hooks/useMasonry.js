import { useState, useEffect } from 'react';

const useMasonryGrid = gridContainerRef => {
  const [columns, setColumns] = useState([]);
  const [columnsHeight, setColumnsHeight] = useState([]);

  useEffect(() => {
    if (!gridContainerRef?.current) return;

    const gridContainer = gridContainerRef?.current;
    const columnCount = Number(getComputedStyle(gridContainer).getPropertyValue('--column-count'));
    const newColumns = [];
    const newColumnsHeight = [];

    for (let i = 0; i < columnCount; i++) {
      const column = document.createElement('div');
      column.className = 'column';
      gridContainer.appendChild(column);
      newColumns.push(column);
      newColumnsHeight.push(0);
    }

    setColumns(newColumns);
    setColumnsHeight(newColumnsHeight);
  }, [gridContainerRef]);

  const updateGrid = card => {
    const minColumnHeight = Math.min(...columnsHeight);
    const minColumnsIndex = columnsHeight.indexOf(minColumnHeight);

    columns[minColumnsIndex].appendChild(card);
    const updatedColumnsHeight = [...columnsHeight];
    updatedColumnsHeight[minColumnsIndex] = columns[minColumnsIndex].offsetHeight;
    setColumnsHeight(updatedColumnsHeight);
  };

  return { columns, updateGrid };
};

export default useMasonryGrid;
