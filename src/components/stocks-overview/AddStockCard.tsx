import React, { useState } from 'react';
import { IconButton, Input } from '../../components';
import { Stock } from '../../types';

type Props = {
  onAddStock: (stock: Stock) => void;
  onAddStockCancel: () => void;
};

const AddStockCard: React.FC<Props> = ({ onAddStock, onAddStockCancel }) => {
  const [newStockName, setNewStockName] = useState('');
  const [newStockTicker, setNewStockTicker] = useState('');

  const handleAddStock = () => {
    onAddStock({ name: newStockName, ticker: newStockTicker } as Stock);
  };

  const handleAddStockCancel = () => {
    onAddStockCancel();
  };

  return (
    <div className="flex flex-col gap-4 px-4 py-2 mb-4 bg-sky-500/10">
      <div className="flex flex-row self-end">
        <IconButton
          iconName="cancel"
          onClick={handleAddStockCancel}
          className="h-7 w-7 p-1.5 fill-slate-500"
        />
        <IconButton
          iconName="floppy-disk"
          onClick={handleAddStock}
          className="h-7 w-7 p-1.5 mr-[-0.5rem]"
        />
      </div>
      <div className="flex flex-row gap-4">
        <Input
          type="text"
          value={newStockName}
          label="Stock name"
          onChange={(e) => setNewStockName(e.target.value)}
          className="flex-grow mb-0"
        />
        <Input
          type="text"
          value={newStockTicker}
          label="Stock ticker"
          onChange={(e) => setNewStockTicker(e.target.value)}
          className="w-32 mb-0"
        />
      </div>
    </div>
  );
};

export default AddStockCard;
