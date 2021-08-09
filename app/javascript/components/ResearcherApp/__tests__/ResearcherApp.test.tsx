import * as React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';

import { ResearcherApp } from '../ResearcherApp';

const MOCK_INCENTIVES = [{
  id: 1,
  redeemed: false,
  code: 'CODE123'
}];

const ERROR_MSG = 'Something went wrong!';

describe('<ResearcherApp />', () => {
  beforeEach(() => {
    fetchMock.mockOnce(JSON.stringify(MOCK_INCENTIVES));
  });

  it('should show all incentives', async () => {
    const { getByText } = render(<ResearcherApp />);

    await waitFor(() => {
      expect(getByText(MOCK_INCENTIVES[0].code)).toBeInTheDocument();
    })
  });

  it('should create new Incentive on form submit', async () => {
    fetchMock.mockOnce(JSON.stringify(MOCK_INCENTIVES));

    const { getByText, getByRole } = render(<ResearcherApp />);

    fireEvent.change(getByRole('textbox'), MOCK_INCENTIVES[0].code);
    fireEvent.click(getByText('Save'));

    await waitFor(() => {
      expect(getByText(MOCK_INCENTIVES[0].code)).toBeInTheDocument();
    })
  });

  it('should show error if incentive is not unique', async () => {
    fetchMock.mockOnce(JSON.stringify({}), { status:422 });

    const { getByText, getByRole } = render(<ResearcherApp />);

    fireEvent.change(getByRole('textbox'), MOCK_INCENTIVES[0].code);
    fireEvent.click(getByText('Save'));

    await waitFor(() => {
      expect(getByText(ERROR_MSG)).toBeInTheDocument();
    })
  });
});

