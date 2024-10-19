'use client';

import React, { useState, useEffect } from 'react';
import DashLayout from '@/components/Layouts/dashLayout';
import Web3 from 'web3';
import UserRegistrationABI from '@/contracts/UserRegistrationABI.json';
import Link from 'next/link';

// Contract address
const contractAddress = '0xf1A6e40d86ef1D119f9978B7c5dcd34Ff34566a4';

// Dummy data for current and previous campaigns
const currentCampaignsDummy = [
  { id: 'uniform', name: 'Uniform Campaign', goal: 50, raised: 30, endDate: 'Dec 31, 2024' },
];
const previousCampaignsDummy = [
  { id: 'classrooms', name: 'New Classroom Initiative', goal: 10, raised: 10, endDate: 'Jan 15, 2024' },
];

// Campaign Interface
interface Campaign {
  id: string;
  name: string;
  description: string;
  goal: number;
  amountRaised: number;
}

export default function CrowdfundingPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [previousCampaigns] = useState(previousCampaignsDummy);
  const [contract, setContract] = useState<any>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    description: '',
    goal: 0,
    end: '',
  });

  useEffect(() => {
    // Automatically connect wallet and fetch campaigns
    const connectWalletAndFetchCampaigns = async () => {
      if (window.ethereum) {
        try {
          const web3 = new Web3(window.ethereum);
          const accounts = await web3.eth.getAccounts();

          if (accounts.length > 0) {
            setIsConnected(true);
            setAccount(accounts[0]);

            const donationContract = new web3.eth.Contract(UserRegistrationABI, contractAddress);
            setContract(donationContract);

            fetchCampaigns(donationContract);
          }
        } catch (error) {
          console.error('Error connecting wallet:', error);
        }
      }
    };

    connectWalletAndFetchCampaigns();
  }, []);

  const fetchCampaigns = async (donationContract: any) => {
    try {
      setLoading(true);
      const totalCampaigns = await donationContract.methods.getCampaignCount().call();
      const fetchedCampaigns: Campaign[] = [];

      for (let i = 0; i < totalCampaigns; i++) {
        const campaign = await donationContract.methods.getCampaign(i).call();
        fetchedCampaigns.push({
          id: campaign.id,
          name: campaign.name,
          description: campaign.description,
          goal: parseFloat(campaign.goal),
          amountRaised: parseFloat(campaign.amountRaised),
        });
      }

      setCampaigns(fetchedCampaigns);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    } finally {
      setLoading(false);
    }
  };

  const createCampaign = async () => {
    if (contract && account) {
      try {
        setLoading(true);
        await contract.methods.createCampaign(
          newCampaign.name,
          newCampaign.description,
          Web3.utils.toWei(newCampaign.goal.toString(), 'ether'),
          newCampaign.end
        ).send({ from: account });

        alert('Campaign created successfully');
        setNewCampaign({ name: '', description: '', goal: 0, end: '' });
        fetchCampaigns(contract);
      } catch (error) {
        console.error('Error creating Campaign', error);
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please connect your wallet first');
    }
  };

  const donateToCampaign = async (campaignId: string, amount: string) => {
    if (contract && account) {
      try {
        await contract.methods.donate(campaignId).send({
          from: account,
          value: Web3.utils.toWei(amount, 'ether'),
        });
        alert('Thank you for your donation!');
      } catch (error) {
        console.error('Donation failed:', error);
      }
    } else {
      alert('Please connect your wallet first.');
    }
  };

  return (
    <DashLayout>
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-blue-600">Support Educational Campaigns</h1>
        <p className="text-xl mt-2 text-gray-700">Help students and schools in rural areas get the resources they need.</p>
      </header>

      {/* Section to Create a New Campaign */}
      <section className="mb-12 p-8 bg-blue-200 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Create a New Campaign</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Campaign Name"
            value={newCampaign.name}
            onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
            className="border p-2 rounded w-full bg-blue-200"
          />
          <textarea
            placeholder="Campaign Description"
            value={newCampaign.description}
            onChange={(e) => setNewCampaign({ ...newCampaign, description: e.target.value })}
            className="border p-2 rounded w-full bg-blue-200"
          />
          <input
            type="number"
            placeholder="Goal in ETH"
            value={newCampaign.goal}
            onChange={(e) => setNewCampaign({ ...newCampaign, goal: parseFloat(e.target.value) })}
            className="border p-2 rounded w-full bg-blue-200"
          />
          <input
            type="date"
            placeholder="End Date"
            value={newCampaign.end}
            onChange={(e) => setNewCampaign({ ...newCampaign, end: e.target.value })}
            className="border p-2 rounded w-full bg-blue-200"
          />
          <button
            className="bg-green-300 text-white px-4 py-2 rounded-md"
            onClick={createCampaign}
          >
            {loading ? 'Creating Campaign...' : 'Create Campaign'}
          </button>
        </div>
      </section>
      
     
      {/* List of Current Campaigns */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Current Campaigns</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentCampaignsDummy.map((campaign) => (
            <div key={campaign.id} className="shadow-lg bg-blue-300 p-5 rounded-lg hover:bg-yellow-300 transition-colors">
              <h2 className="text-2xl font-semibold text-blue-600">{campaign.name}</h2>
              <div className="mt-4">
                <ProgressBar goal={campaign.goal} amountRaised={campaign.raised} />
                <div className="mt-4">
                  <span className="font-semibold text-gray-700">Goal: </span>
                  <span>{campaign.goal} ETH</span>
                </div>
                <div className="mt-2">
                  <span className="font-semibold text-gray-700">Raised: </span>
                  <span>{campaign.raised} ETH</span>
                </div>
              </div>
              <div className="mt-6 flex justify-between items-center">
                <input
                  type="text"
                  placeholder="Amount in ETH"
                  className="border rounded-md p-2 mr-2"
                  id={`donate-amount-${campaign.id}`}
                />
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded-md"
                  onClick={() =>
                    donateToCampaign(
                      campaign.id,
                      (document.getElementById(`donate-amount-${campaign.id}`) as HTMLInputElement).value
                    )
                  }
                >
                  Donate
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* List of Previous Campaigns */}
      <section>
        <div className="space-y-8">
        <h2 className="text-2xl font-bold mb-4">Previous Campaigns</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {previousCampaigns.map((campaign) => (
            <Link href={`/campaigns/${campaign.id}`} key={campaign.id}>
              <div className="bg-blue-300 p-4 rounded-lg hover:bg-yellow-300 transition-colors">
                <h2 className="text-2xl font-semibold text-blue-600">{campaign.name}</h2>
              <p className="text-gray-700 mt-2">Goal: {campaign.goal} ETH</p>
              <p className="text-gray-700 mt-2">Raised: {campaign.raised} ETH</p>
              <p className="text-gray-700 mt-2">Ended on: {campaign.endDate}</p>
                <div className="mt-2 w-full bg-neutral-700 rounded-full h-3 my-2">
                  <div className="bg-primary h-3 rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      </section>
    </DashLayout>
  );
}

// Progress Bar component

const ProgressBar = ({ goal, amountRaised }: { goal: number; amountRaised: number }) => {
    const percentage = (amountRaised / goal) * 100;
    return (
      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden mt-4">
        <div
          className="bg-blue-500 h-full"
          style={{ width: `${percentage > 100 ? 100 : percentage}%` }}
        ></div>
      </div>
    );
  };