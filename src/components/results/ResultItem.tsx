import React from 'react';

interface ResultItemProps {
  symbol: string;
  value: number;
}

const ResultItem = ({ symbol, value }: ResultItemProps) => {
  return (
    <div className="flex items-center">
      <p className="text-xl font-bold">{`${symbol}:`}</p>
      <p className="ml-2">{value}</p>
    </div>
  );
};

export default ResultItem;
