import networkx as nx
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.animation as animation
import mplcursors

# Read the CSV file with "from" and "to" columns
df = pd.read_csv('ethereum2.csv', names=['from', 'to', 'amount'])

# Create a directed graph
G = nx.DiGraph()

# Add transactions and their weights (Bitcoin amounts) as directed edges
for row in df.itertuples(index=False):
    source, target, amount = row
    try:
        amount = float(amount)  # Convert amount to float
    except ValueError:
        print(f"Error: Invalid amount value '{amount}' in the CSV file. Skipping this entry.")
        continue

    if not G.has_edge(source, target):
        G.add_edge(source, target, weight=amount)
    else:
        G[source][target]["weight"] += amount

# Create the plot
fig, ax = plt.subplots(figsize=(8, 6))

# Define the update function for animation
def update(frame):
    ax.clear()

    # Display the graph
    pos = nx.spring_layout(G)
    nx.draw(G, pos, with_labels=True, font_weight="bold", ax=ax)

    # Display edge labels (amount)
    edge_labels = nx.get_edge_attributes(G, 'weight')
    nx.draw_networkx_edge_labels(G, pos, edge_labels=edge_labels, ax=ax)

    # Display node labels (addresses)
    labels = {node: node for node in G.nodes}
    nx.draw_networkx_labels(G, pos, labels=labels, ax=ax)

    # Set plot title
    ax.set_title(f'Bitcoin Transaction Graph - Frame {frame + 1}')

# Create the animation
ani = animation.FuncAnimation(fig, update, frames=15, repeat=False)

# Enable hovering over nodes to display additional information
mplcursors.cursor(hover=True)

plt.show()
