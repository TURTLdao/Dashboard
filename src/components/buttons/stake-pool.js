
import { useEffect, useState } from 'react';
import { useRewardAddress, useWallet, useWalletList, useWalletTx } from '@meshsdk/react';

export const Delegate = ({ poolId }) => {
  const wallets = useWalletList();
  const { connect, connecting, connected, name } = useWallet();
  const tx = useWalletTx();
  const { wallet } = useWallet();
  const rewardAddress = useRewardAddress();
  const [error, setError] = useState();
  const [checking, setChecking] = useState(false);
  const [accountInfo, setAccountInfo] = useState();
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);

  const checkAccountStatus = async () => {
    try {
      setChecking(true);

      if (rewardAddress) {
        const info = await onCheck(rewardAddress);
        setAccountInfo(info);
      }

      setChecking(false);
    } catch (error) {
      setError(error);
    }
  };

  const registerAddress = async () => {
    setProcessing(true);
    setDone(false);
    try {
      if (rewardAddress) {
        const unsignedTx = await tx
          .registerStake(rewardAddress)
          .delegateStake(rewardAddress, poolId)
          .build();

        const signedTx = await wallet.signTx(unsignedTx);
        const txHash = await wallet.submitTx(signedTx);
        console.log('txHash', txHash);
        setDone(true);
      }
    } catch (error) {
      console.error('error', error);
      setError(error);
    }
    setProcessing(false);
  };

  const delegateStake = async () => {
    setProcessing(true);
    setDone(false);
    try {
      if (rewardAddress) {
        const unsignedTx = await tx
          .delegateStake(rewardAddress, poolId)
          .build();

        const signedTx = await wallet.signTx(unsignedTx);
        const txHash = await wallet.submitTx(signedTx);
        setDone(true);
      }
    } catch (error) {
      console.error('error', error);
      setError(error);
    }
    setProcessing(false);
  };

  useEffect(() => {
    checkAccountStatus();
  }, [rewardAddress]);

  if (checking) {
    return <span>Checking...</span>;
  }
  if (processing) {
    return <span>Loading...</span>;
  }
  if (done) {
    return <span>Stake Delegated</span>;
  }

  if (accountInfo?.active) {
    return accountInfo.poolId === poolId ? (
      <span>Stake Delegated</span>
    ) : (
      <span onClick={delegateStake}>Delegate Stake</span>
    );
  }

  return <span onClick={registerAddress}>Register Address</span>;
};
