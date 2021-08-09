import * as React from 'react';

import useIncentive from '@hooks/useIncentive';

export const Redeem: React.FC = () => {
  const { loading, error, redeemedIncentive, redeem } = useIncentive();

  return (
    <div>
      <div className="pb-4">
        <button
          disabled={loading}
          className="hover:bg-gray-100 bg-gray-200 rounded-md px-4 py-2"
          onClick={redeem}
        >
          {loading ? 'loading...' : 'Redeem'}
        </button>
      </div>

      {!error && redeemedIncentive && (
        <div className="py-4 text-green-600 italic">
          Your code is: <span className="font-bold">{redeemedIncentive.code}</span>. Thanks for participating in our research!
        </div>
      )}

      {error && (
        <div className="py-4 text-red-600 italic">
          {error}
        </div>
      )}
    </div>
  );
};
