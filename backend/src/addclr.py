import pandas as pd
from sklearn.cluster import KMeans
from sklearn.preprocessing import LabelEncoder
import matplotlib.pyplot as plt
import seaborn as sns

def load_data(file_path):
    # Load CSV file into a DataFrame
    df = pd.read_csv(file_path)
    return df

def preprocess_data(df):
    # Use LabelEncoder to convert addresses to numerical values
    label_encoder = LabelEncoder()
    df['from_encoded'] = label_encoder.fit_transform(df['amount'])
    df['to_encoded'] = label_encoder.fit_transform(df['to'])
    return df

def cluster_addresses(df, num_clusters):
    # Extract features for clustering
    features = df[['from_encoded', 'to_encoded']]

    # Apply KMeans clustering
    kmeans = KMeans(n_clusters=num_clusters, random_state=42)
    df['cluster'] = kmeans.fit_predict(features)

    return df

def visualize_clusters(df):
    # Visualize clusters using a scatter plot
    sns.scatterplot(x='from_encoded', y='to_encoded', hue='cluster', data=df, palette='viridis')
    plt.title('Address Clustering')
    plt.xlabel('From Address (Encoded)')
    plt.ylabel('To Address (Encoded)')
    plt.show()

def main():
    # Replace with the path to your CSV file
    file_path = '/Users/mokshagrawal/Documents/blockchain flow investigation/ethereum_transactions.csv'

    # Number of clusters (you may adjust this based on your data)
    num_clusters = 3

    # Load and preprocess data
    data = load_data(file_path)
    data = preprocess_data(data)

    # Cluster addresses
    clustered_data = cluster_addresses(data, num_clusters)

    # Visualize clusters
    visualize_clusters(clustered_data)

    # Print the clustered data (optional)
    print(clustered_data[['from', 'to', 'cluster']])

if __name__ == "__main__":
    main()
