import * as React from 'react';
import { useState } from 'react';

interface Props {
  create: (code: string) => void;
  loading: boolean;
  error: string | null;
}

export const IncentiveForm: React.FC<Props> = ({ create, loading, error }) => {
  const [inputValue, setInputValue] = useState('');

  async function handleClickSave() {
    await create(inputValue);
    setInputValue('');
  }

  return (
    <div>
      <div className="flex space-x-2 pb-4">
        <input
          disabled={loading}
          className="text-xl border"
          type="text"
          name="incentive_code"
          value={inputValue}
          onChange={e => setInputValue(e.currentTarget.value)}
        />
        <button
          disabled={loading}
          className="hover:bg-gray-100 bg-gray-200 rounded-md px-4 py-2"
          onClick={handleClickSave}
        >
          Save
        </button>
      </div>

      {error && (
        <div className="pb-4 text-red-600 italic">
          {error}
        </div>
      )}
    </div>
  );
};

export default IncentiveForm;
