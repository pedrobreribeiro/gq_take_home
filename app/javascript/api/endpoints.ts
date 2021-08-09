
export const getIncentives = async (): Promise<Incentive[]> => {
  const resp = await fetch('/api/incentives');
  if (resp.ok) {
    return await resp.json();
  }
  return null;
};

export const createIncentive = async (code: string): Promise<Incentive[]> => {
  const resp = await fetch('/api/incentives', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code }),
  });
  if (resp.ok) {
    return await resp.json();
  }
  return null;
};

export const updateIncentive = async (id: number, params: Partial<Incentive>): Promise<Incentive> => {
  const resp = await fetch(`/api/incentives/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  if (resp.ok) {
    return await resp.json();
  }
  return null;
};

export const redeemIncentive = async (): Promise<Incentive> => {
  const resp = await fetch('/api/incentives/redeem', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  if (resp.ok) {
    return await resp.json();
  }
  return null;
}
