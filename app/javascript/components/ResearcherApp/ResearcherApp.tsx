import * as React from 'react';

import useIncentive from '@hooks/useIncentive';

import Incentives from './Incentives';
import IncentiveForm from './IncentiveForm';

export const ResearcherApp: React.FC = () => {
  const { loading, error, incentives, create, list } = useIncentive();

  React.useEffect(() => { list(); }, []);

  return (
    <div className="px-12 py-6">
      <h1 className="text-2xl font-bold mb-6">Setup incentive</h1>
      <p className="mb-4">Enter the coupon code for the candidate to receive:</p>

      <IncentiveForm create={create} error={error} loading={loading} />
      <Incentives incentives={incentives} loading={loading} />
    </div>
  );
};
