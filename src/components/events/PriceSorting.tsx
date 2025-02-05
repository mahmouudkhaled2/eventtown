import { Button } from '@/components/ui/button';
import { useEvents } from '@/providers/events/events-provider';
import { ArrowUpDown } from 'lucide-react';
import React, { useCallback } from 'react';

const PriceSorting = () => {
  const { setParams } = useEvents();
  const toggleSorting = useCallback(() => {
    setParams((prev) => ({
      ...prev,
      sort: prev.sort === 'eventPrice' ? '-eventPrice' : 'eventPrice',
    }));
  }, [setParams]);

  return (
    <Button variant="ghost" onClick={toggleSorting}>
      Price
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );
};

export default PriceSorting;
