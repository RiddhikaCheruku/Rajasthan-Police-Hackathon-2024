import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

def load_data(file_path):
    # Load CSV file into a DataFrame
    df = pd.read_csv(file_path)
    return df

def apply_heuristics(df):
    # Rule 1: Identify large transactions (amount > threshold)
    large_transactions = df[df['amount'] > 1000]

    # Rule 2: Identify rapid movements (change in amount > threshold)
    df['amount_change'] = df.groupby('from')['amount'].diff()
    rapid_movements = df[df['amount_change'].abs() > 500]

    return large_transactions, rapid_movements

def visualize_heuristics_results(large_transactions, rapid_movements):
    # Visualize large transactions
    sns.scatterplot(x='from', y='to', hue='amount', size='gasPrice', data=large_transactions, palette='viridis', sizes=(10, 200))
    plt.title('Large Transactions')
    plt.xlabel('From Address')
    plt.ylabel('To Address')
    plt.show()

    # Visualize rapid movements
    sns.scatterplot(x='from', y='to', hue='amount_change', size='gasPrice', data=rapid_movements, palette='viridis', sizes=(10, 200))
    plt.title('Rapid Movements')
    plt.xlabel('From Address')
    plt.ylabel('To Address')
    plt.show()

def main():
    # Replace with the path to your CSV file
    file_path = 'ethereum_transactions.csv'

    # Load data
    data = load_data(file_path)

    # Apply heuristics
    large_transactions, rapid_movements = apply_heuristics(data)

    # Visualize heuristic analysis results
    visualize_heuristics_results(large_transactions, rapid_movements)

if __name__ == "__main__":
    main()
