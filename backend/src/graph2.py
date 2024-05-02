import pandas as pd
import matplotlib.pyplot as plt

# Load the CSV into a DataFrame
input_csv_path = "ethereum_transactions.csv"
df = pd.read_csv(input_csv_path)

# Assuming 'gasPrice' and 'value' are column names in your CSV
df['GasPricePercentage'] = (df['gasPrice'] / df['amount']) * 100

# Drop rows with duplicate GasPricePercentage values
df_unique = df.drop_duplicates(subset='GasPricePercentage')

# Create a scatter plot
plt.figure(figsize=(10, 6))
plt.scatter(df_unique['gasPrice'], df_unique['amount'], c='blue', alpha=0.5, label='GasPrice vs. Value')
plt.xlabel('Gas Price')
plt.ylabel('Value')

plt.title('Scatter Plot of Gas Price vs. Value with Unique Gas Price Percentages')
plt.legend()
plt.grid(True)
plt.show()
