import * as React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';

import { CandidateApp } from '../CandidateApp';

const MOCK_INCENTIVE = {
  id: 1,
  redeemed: false,
  code: 'CODE123'
}

const ERROR_MSG = 'Something went wrong!';

describe('<Redeem />', () => {
  it('should show redeemed code when clicking `Redeem`', async () => {
    fetchMock.mockOnce(JSON.stringify(MOCK_INCENTIVE));

    const { getByText } = render(<CandidateApp />);

    fireEvent.click(getByText('Redeem'));

    await waitFor(() => {
      expect(getByText(MOCK_INCENTIVE.code)).toBeInTheDocument();
    })
  });

  it('should show error when no incentives can be redeemed', async () => {
    fetchMock.mockOnce(JSON.stringify({}), { status: 422 });

    const { getByText } = render(<CandidateApp />);

    fireEvent.click(getByText('Redeem'));

    await waitFor(() => {
      expect(getByText(ERROR_MSG)).toBeInTheDocument();
    });
  });
});

