// menuItems.js
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PagesIcon from '@mui/icons-material/Pages';
import SettingsIcon from '@mui/icons-material/Settings';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import CallReceivedIcon from '@mui/icons-material/CallReceived';
import CallMadeIcon from '@mui/icons-material/CallMade';

const menuItems = [
  { text: 'My WTree Pages', icon: <PagesIcon /> },
  { text: 'My Wallets', icon: <AccountBalanceWalletIcon /> },
  { text: 'Settings', icon: <SettingsIcon /> },
  { text: 'Analytics', icon: <AnalyticsIcon /> },
  { text: 'Received Donations', icon: <CallReceivedIcon /> },
  { text: 'Sent Donations', icon: <CallMadeIcon /> }
];

export default menuItems;
