# Decentragram <img src="https://user-images.githubusercontent.com/67114280/218386745-44d544ac-8fa0-4c1c-b924-19de2f4e685e.png" alt="logo" width="35px" height="35px" align="center" />

<img width="1600" alt="credit" src="https://user-images.githubusercontent.com/67114280/218385011-1c1c231b-ddf1-408c-896d-52e7d61dfd75.png">

### Functionalities

- [x] Upload Posts
- [x] Search Post
- [x] Send Comments
- [x] Profile Posts

### Stack

- Language : [TypeScript](https://www.typescriptlang.org/)
- Frontend : [Next Js](https://nextjs.org/)
- Smart Contract Lang : [Solidity](https://docs.soliditylang.org/en/v0.8.17/)
- Indexing :  [The Graph](https://thegraph.com/en/)
- Dev Environment for ETH Software: [Hardhat](https://hardhat.org/)
- Testing: [Chaijs](https://www.chaijs.com/)
- File Storage : [Arweave](https://www.arweave.org/)
- Scaling Permenant Storage - [Bundlr](https://bundlr.network/)
- Network : [Polygon Mumbai](https://polygon.technology/)
- Style : [Tailwind CSS](https://tailwindcss.com/)
- State management : [GraphQL Apollo Client](https://www.apollographql.com/)
- Toast: [React Toastify](https://fkhadra.github.io/react-toastify/introduction/)
- Fonts - [Google Fonts](https://fonts.google.com/)
- Icons : [Iconsax React](https://iconsax-react.pages.dev/)
- Design : [Figma](https://www.figma.com/)

### Installation

####  Fork The Repo 

Click on the Right Side of the Top Bar to After the Watch button. <img src="https://upload.wikimedia.org/wikipedia/commons/3/38/GitHub_Fork_Button.png" width="120px" />

Now It will be available in GitHub Account.

#### OR

#### Clone

- Clone this repo with url

```shell
git clone https://github.com/Aakrut/decentragram
```

##### Setup

> Install npm dependencies using npm install

```shell
cd decentragram && npm install
```

> Create a .env file in the root directory.

> Set up required environment variables.

```
URL="POLYGON_TESTNET_URI"
PRIVATE_KEY="METAMASK_PRIVATE_KEY"
```

> In the Root Directory First Compile Your Smart Contract with This Following Command.

```shell
npx hardhat compile
```

> After Deploy Smart Contract to the Polygon Mumbai Testnet with this command.

```shell
npx hardhat run scripts/deploy.js --network mumbai
```

> After move into client

```shell
cd client && npm install
```

> Create a .env file in the root directory.

> Set up required environment variables.

```
NEXT_PUBLIC_RPC_URL="POLYGON_TESTNET_URI"
NEXT_PUBLIC_CONTRACT_ADDRESS="CONTRACT_ADDRESS"
NEXT_PUBLIC_GRAPHQL_URI="GRAPHQL_URL"
```

> Copy Smart Contract Address and replace it in with your "CONTRACT_ADDRESS"

```
NEXT_PUBLIC_CONTRACT_ADDRESS="CONTRACT_ADDRESS"
```

## For Setting up Graph Protocol - [The Graph](https://thegraph.com/en/)

now replace the graph url with 
```
NEXT_PUBLIC_GRAPHQL_URI="GRAPHQL_URL"
```

Let's Run this command for dev

```shell
# use npm if you prefer
$ npm run dev

# or yarn
$ yarn dev
```

### Screenshots

<img width="1600" alt="decentragram" src="https://user-images.githubusercontent.com/67114280/218385028-c5854c62-5547-4828-81b4-285b4a4ce741.png">

<img width="1600" alt="dashboard" src="https://user-images.githubusercontent.com/67114280/218385021-1103b765-6520-4924-8b5c-0ad08c15fe09.png">

<img width="1600" alt="search" src="https://user-images.githubusercontent.com/67114280/218385058-10693fba-df94-4e23-b51d-35d3bed439a9.png">

<img width="1600" alt="upload" src="https://user-images.githubusercontent.com/67114280/202843772-90e47d21-53bc-4f3f-87d1-ba4ff6b3182f.png">

<img width="1600" alt="post and comments" src="https://user-images.githubusercontent.com/67114280/218385041-57953853-3133-4737-8ad4-6c2cb0a817e6.png">

<img width="1600" alt="profile" src="https://user-images.githubusercontent.com/67114280/218385046-855126ed-5d88-496f-973a-a5ebd953de55.png">

<img width="1600" alt="error" src="https://user-images.githubusercontent.com/67114280/218385036-61c3b88d-4851-4f4a-976b-b4b78feb9b05.png">

<img width="1600" alt="responsive" src="https://user-images.githubusercontent.com/67114280/218385053-856bed0c-ad48-4162-a90f-552d1dbac35b.png">
