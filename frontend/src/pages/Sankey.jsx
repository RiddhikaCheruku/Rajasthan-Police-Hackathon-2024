  import { useEffect, useState } from 'react';

  const CsvTable = () => {
    const [csvData, setCsvData] = useState([]);

    const filePath = "../sankey/ethereum_transactions.csv"
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(filePath);
          const csvString = await response.text();
          const csvArray = csvString.split('\n').map(row => row.split(','));
          setCsvData(csvArray);
        } catch (error) {
          console.error('Error fetching the CSV file:', error);
        }
      };

      fetchData();
    }, [filePath]);

    return (
      <>
        <h1>CSV Table Viewer</h1>
        <table>
          <tbody>
            {csvData.map((rowData, rowIndex) => (
              <tr key={rowIndex}>
                {rowData.map((cellData, cellIndex) => (
                  <td key={cellIndex}>{cellData}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  };

  export default CsvTable;
