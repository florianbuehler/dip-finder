import React, { useState } from 'react';
import { IconButton, Input } from './index';

type Props = {
  onAddStockCancel: () => void;
};

const AddStockCard: React.FC<Props> = ({ onAddStockCancel }) => {
  const [newStockName, setNewStockName] = useState('');
  const [newStockSymbol, setNewStockSymbol] = useState('');

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
          onClick={() => console.log('save')}
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
          value={newStockSymbol}
          label="Stock symbol"
          onChange={(e) => setNewStockSymbol(e.target.value)}
          className="w-32 mb-0"
        />
      </div>
    </div>
  );
};

export default AddStockCard;
