# Kudos demo app

## Prerequisites

Install NodeJs: [Download link](https://nodejs.org/en/download/) 

Install the Node.js based Ethereum client for easy development & testing
```
npm install -g ethereumjs-testrpc
```

Install the Truffle Ethereum development framework by Consensys
```
npm install -g truffle
```

Clone the Kudos GitHub repository locally in your folder of choice
```
git clone https://github.com/djbart/Kudos.git
```

## Running the demo

Launch the Ethereum test rpc client with 5 accounts
```
testrpc -a 5
```

Build the Kudos app (make sure you use the correct working folder)
```
truffle build
```

Deploy the Kudos contracts on the Ethereum test instance
```
truffle migrate
```

Run the local Truffle web server to test the app
```
truffle serve
```

Browse to the app on [http://localhost:8080](http://localhost:8080)