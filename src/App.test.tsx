import { act, fireEvent, render, screen } from '@testing-library/react';
import App from './App';

jest.mock('@ethersproject/providers', () => ({
  JsonRpcProvider: jest.fn().mockImplementation(() => ({
    getBlockNumber: jest.fn().mockResolvedValue(1337),
  })),
}));


test('renders last block number', async () => {
  render(<App />);

  const blockNumberElement = await screen.findByText(/Last Block Number: 1337/i);
  expect(blockNumberElement).toBeInTheDocument();
});


test('fetches USDT balance for valid address', async () => {
  render(<App />);

  const addressInput = screen.getByRole('textbox', { name: /address/i })as HTMLInputElement;
  const getBalanceButton = screen.getByRole('button', { name: /get usdt balance/i });

  addressInput.value = "0xdac17f958d2ee523a2206206994597c13d831ec7";
  fireEvent.change(addressInput);


  await act(async () => getBalanceButton.click());



  expect(screen.getByText(/USDT Balance:0.0061699877426/i)).toBeInTheDocument();
});
test('handles invalid address', async () => {
  render(<App />);
  const addressInput = screen.getByRole('textbox', { name: /address/i })as HTMLInputElement;
  const getBalanceButton = screen.getByRole('button', { name: /get usdt balance/i });

  addressInput.value = 'invalid address';
  fireEvent.change(addressInput);

  await act(async () => getBalanceButton.click());

  // Expect error message or console log
  expect(console.error).toHaveBeenCalledWith('Invalid Ethereum address');
});






// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
