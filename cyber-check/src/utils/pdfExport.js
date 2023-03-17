import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { useState } from 'react';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';

export default function App() {
  let [name, setName] = useState("");
  let reporter = "John Doe";
  let reportName = "Report 1";
  
  const html = `
  <!DOCTYPE html>
  <html>
  <head>
	  <title>My Report</title>
  </head>
  <body>
	  <h1>${reportName}</h1>
	  <p>$Reporter: ${reporter}</p>
	  <ul>
		  <li>Item 1</li>
		  <li>Item 2</li>
		  <li>Item 3</li>
	  </ul>
  </body>
  </html>  
  <style>
	body {
		font-family: Arial, sans-serif;
		color: #333;
	}
	
	h1 {
		color: #0066CC;
	}
	
	ul {
		list-style-type: disc;
		margin-left: 20px;
	}
</style>
`;

  let generatePdf = async () => {
    const file = await printToFileAsync({
      html: html,
      base64: false
    });

    await shareAsync(file.uri);
  };

  return (
    <View style={styles.container}>
      <Button title="Generate PDF" onPress={generatePdf} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: .5,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});