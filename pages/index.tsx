import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

const ConnectButton = dynamic(() => import('../components/ConnectButton'), { ssr: false })
const PlatformFee = dynamic(() => import('../components/PlatformFee'), { ssr: false })

const Home: NextPage = () => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null

  return (
    <div>
      <h1>Welcome to My dApp</h1>
      <ConnectButton />
      <PlatformFee />
    </div>
  );
};

export default Home;
