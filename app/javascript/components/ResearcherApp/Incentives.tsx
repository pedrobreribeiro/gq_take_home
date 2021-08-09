import * as React from 'react';

interface Props {
  incentives: Incentive[];
  loading: boolean;
}

export const Incentives: React.FC<Props> = ({ incentives, loading }) => {
  if (loading) return <span>loading...</span>

  return (
    incentives.length >= 0 && (
      <table className="min-w-full table-fixed">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Code
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {incentives.map(({ code, redeemed }) => (
            <tr key={code}>
              <td className="px-6 py-4 whitespace-nowrap">
                <section className="inline-flex items-center justify-center">
                  {code}
                  {redeemed && (
                    <span className="inline-flex items-center justify-center ml-2 px-2 py-1 mr-2 text-xs font-bold text-red-100 bg-red-600 rounded-full">
                        Redeemed
                    </span>
                  )}
                </section>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  )
}

export default Incentives;