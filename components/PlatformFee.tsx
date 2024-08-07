import React, { useState, useEffect } from 'react';
import { getContract, getPlatformFee, setPlatformFee } from '../utils/contract';
import { ethers } from 'ethers';
import { useAccount, useWalletClient, usePublicClient } from 'wagmi';

const PlatformFee: React.FC = () => {
  const [fee, setFee] = useState<string>('');
  const [newFee, setNewFee] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const { isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();

  useEffect(() => {
    if (isConnected && publicClient) {
      fetchPlatformFee();
    }
  }, [isConnected, publicClient]);

  const fetchPlatformFee = async () => {
    setLoading(true);
    setError(null);
    try {
      const currentFee = await getPlatformFee(publicClient);
      console.log("Current fee:", currentFee);
      setFee(currentFee);
    } catch (err) {
      console.error('Error fetching platform fee:', err);
      setError('Failed to fetch current platform fee. Make sure your wallet is connected.');
    } finally {
      setLoading(false);
    }
  };

  const handleSetFee = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!walletClient) return;
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const contract = await getContract(walletClient);
      await setPlatformFee(contract, newFee);
      await fetchPlatformFee();
      setNewFee('');
      setSuccess('Platform fee updated successfully!');
    } catch (err) {
      console.error('Error setting platform fee:', err);
      setError('Failed to set new platform fee. Make sure you have the right permissions.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="platform-fee-container">
      <h2>Platform Fee Management</h2>
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      
      <div className="current-fee">
        <h3>Current Platform Fee</h3>
        {fee ? (
          <p>{fee} ETH</p>
        ) : (
          <p>Unable to fetch current fee</p>
        )}
      </div>

      <form onSubmit={handleSetFee} className="set-fee-form">
        <h3>Set New Platform Fee</h3>
        <div className="input-group">
          <input
            type="number"
            step="0.000000000000000001"
            value={newFee}
            onChange={(e) => setNewFee(e.target.value)}
            placeholder="Enter new fee in ETH"
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Processing...' : 'Set New Fee'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PlatformFee;
