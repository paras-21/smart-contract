// utils/contract.ts

import { ethers } from 'ethers';
import { abi as contractABI } from './M0InvoiceHandler.json';
import { PublicClient, WalletClient, createPublicClient, http } from 'viem';

const contractAddress = '0x776a4f7251b4cEe575C303C9905787433a6E3837';

async function getEtheresSigner(walletClient: WalletClient) {
  const [account] = await walletClient.getAddresses();
  const provider = new ethers.BrowserProvider(walletClient.transport);
  return provider.getSigner(account);
}

export const getContract = async (walletClient: WalletClient) => {
  const signer = await getEtheresSigner(walletClient);
  return new ethers.Contract(contractAddress, contractABI, signer);
};

export const getPlatformFee = async (publicClient: PublicClient) => {
  try {
    const fee = await publicClient.readContract({
      address: contractAddress,
      abi: contractABI,
      functionName: 'platformFee',
    });
    return ethers.formatEther(fee as bigint);
  } catch (error) {
    console.error('Error fetching platform fee:', error);
    throw error;
  }
};

export const setPlatformFee = async (contract: ethers.Contract, newFee: string) => {
  try {
    const tx = await contract.setPlatformFee(ethers.parseEther(newFee));
    await tx.wait();
    return true;
  } catch (error) {
    console.error('Error setting platform fee:', error);
    throw error;
  }
};
