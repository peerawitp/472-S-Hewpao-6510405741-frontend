import { Bank } from '@/interfaces/Bank';
import React, { useState, useEffect } from 'react';

interface BankDropdownProps {
  value: string | null;
  onChange: (bankCode: string | null) => void;
}

const BankDropdown: React.FC<BankDropdownProps> = ({ value, onChange }) => {
  const [banks, setBanks] = useState<Bank[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBanks() {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('/payout-account/get-available-banks');
        if (!response.ok) {
          throw new Error('Failed to fetch banks');
        }
        const data = await response.json();
        setBanks(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchBanks();
  }, []);

  const handleBankChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const bankCode = event.target.value || null;
    onChange(bankCode);
  };

  if (isLoading) {
    return <div>Loading banks...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700" htmlFor="bank">เลือกธนาคาร</label>
      <select
        id="bank"
        value={value || ''}
        onChange={handleBankChange}
        className="mt-1 block w-full border border-gray-300 px-3 py-2 rounded-md"
      >
        <option value="">-- เลือกธนาคาร --</option>
        {banks.map((bank) => (
          <option key={bank.SwiftCode} value={bank.SwiftCode}>
            {bank.NameEN}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BankDropdown;