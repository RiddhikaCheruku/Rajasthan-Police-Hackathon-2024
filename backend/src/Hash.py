import requests
import csv

def fetch_ethereum_transactions(api_key, address):
    base_url = "https://api.etherscan.io/api"
    module = "account"
    action = "txlist"
    
    # Set additional parameters
    params = {
        'module': module,
        'action': action,
        'address': address,
        'apikey': api_key,
    }

    
    response = requests.get(base_url, params=params)
    
    # Check if the request was successful (status code 200)
    if response.status_code == 200:
        return response.json()['result']
    else:
        print(f"Error: {response.status_code}")
        return None

def save_to_csv(transactions, output_file):
    # Extract relevant fields from each transaction
    headers = ['blockNumber', 'timestamp', 'hash', 'from', 'to', 'value', 'gasPrice', 'gas']

    # Write data to CSV file
    with open(output_file, 'w', newline='') as csv_file:
        writer = csv.DictWriter(csv_file, fieldnames=headers)
        writer.writeheader()
        for transaction in transactions:
            filtered_transaction = {key: transaction.get(key, None) for key in headers}
            writer.writerow(filtered_transaction)

def main():
    # Get API key and Ethereum address from the user
    api_key = 'QTXHARR4W7GRZMIWSAKEIRRU2C2QD3SKIZ'
    ethereum_address = '0x87d222b82f0438e35edd50b13c38066deb12d3a34080227c37b8da82480c54c7'
    transactions = fetch_ethereum_transactions(api_key, ethereum_address)

    if transactions:
        output_file = 'ethereum_transactions.csv'
        save_to_csv(transactions, output_file)
        print(f"Transactions saved to {output_file}")
    else:
        print("Failed to fetch transactions.")

if __name__ == "__main__":
    main()