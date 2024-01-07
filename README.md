ganache is run with node v18.2.0

use "ethereumjs-abi": "^0.6.7", insetad of latest because latest repo has an issue with hdwallet-provider

npm install with node v18.2.0
everything works with node v18.2.0 except deployment to ropsten
deployment to ropsten works with node v14.17.3

How to start client in server:

create build "npm run build"

install serve globally "npm install -g serve"

install pm2 globally "npm install -g pm2"

start client by running "pm2 start v0-hackathon-app.sh"

*Client will listen on port 3010

## Truffle Run command
"postinstall": "npx truffle compile && npm run generate-types",
