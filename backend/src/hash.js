const fetch = require("node-fetch");
const fs = require("fs");

async function fetch_ethereum_transactions(api_key, address) {
  const base_url = "https://api.etherscan.io/api";
  const module = "account";
  const action = "txlist";

  const params = {
    module: module,
    action: action,
    address: address,
    apikey: api_key,
  };
  const url = new URL(base_url);
  url.search = new URLSearchParams(params).toString();

  const response = await fetch(url);

  if (response.status === 200) {
    const data = await response.json();
    console.log("API Response:", data);
    return data.result;
  } else {
    console.log(`Error: ${response.status}`);
    return null;
  }
}

function save_to_csv(transactions, output_file) {
  const headers = [
    "blockNumber",
    "timestamp",
    "hash",
    "from",
    "to",
    "value",
    "gasPrice",
    "gas",
  ];

  const csvRows = [];
  csvRows.push(headers.join(","));

  for (const transaction of transactions) {
    const filteredTransaction = {};
    for (const key of headers) {
      filteredTransaction[key] = transaction[key] || null;
    }
    const values = headers.map((key) => filteredTransaction[key]);
    csvRows.push(values.join(","));
  }

  const csvData = csvRows.join("\n");

  fs.writeFileSync(output_file, csvData);
}

async function hashFile() {
  const api_key = "QTXHARR4W7GRZMIWSAKEIRRU2C2QD3SKIZ";
  const ethereum_address = "0x207841b7AE1Ae7757B5E8a1672b3f7fC1df60b9D";
  const transactions = await fetch_ethereum_transactions(
    api_key,
    ethereum_address
  );

  if (transactions) {
    const output_file = "ethereum_transactions.csv";
    save_to_csv(transactions, output_file);
    console.log(`Transactions saved to ${output_file}`);
  } else {
    console.log("Failed to fetch transactions.");
  }
}

hashFile();
