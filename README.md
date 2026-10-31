# [Codeliver](https://codeliver.tonymac.net)

![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-3178c6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

![Website homepage screenshot](/banner.png)

Codeliever: sharing code, chatting, and collaborating made simple.

## Features

- Realtime chatting
- Profile customization
- Channel management
- Message editing
- Reaction creation
- User management
- Public API for accessing data
- Self-hosted application
- Light and dark modes
- Account system

## Tech stack

- Next.js with TypeScript and Tailwind for the frontend
- Express.js and Socket.io for backend and realtime components
- Prisma and Postgres for general user and chat data stroage
- Next.js and Better Auth for auth
- Docker for dockerizing the entire app and easy deployment

## Quick start

To self-host Codeliver on your own server or for other purposes, simply follow these steps below:

1. Clone the GitHub [repository](https://github.com/tonymac129/codeliver) using the command
   ```bash
   git clone https://github.com/tonymac129/codeliver.git
   ```
2. Open it with your favorite code editor or through the terminal
3. Create the `.env` file using the `.env.example` templates and replace the variables with your secrets:

   ```bash
   cp .env.example .env
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env
   ```

4. Start both the frontend and backend services with Docker compose:

   ```bash
   docker compose up -d
   ```

5. Alternatively, if you want to run the production build of the app, uncomment the frontend production service then comment out the original frontend development service in `compose.yaml` and run:

   ```bash
   docker compose up -d
   ```

6. Navigate to http://localhost:3000 to use the fully functional web interface and access the backend API at http://localhost:3001

## API endpoints

### `GET /api/channels`

Public, returns public channels or private channels the user is a part of. Optional `q` search param filters the channels using a case insensitive query.

### `GET /api/users`

Public, returns list of Codeliver users. Required search param `q` searches through users using the query. Optional `c`, `i`, and `d` search params filters users by channel, channel joined status, and whether the current user has a direct message with the user, respectively.

### `GET 3001/count` (express backend on port 3001)

Fetches current count of online users connected to the Socket.io backend.

### `socket join {channelId}`

Joins the current user's realtime socket context channel to the selected channel.

### `socket leave {channelId}`

Disconnects the current user's realtime socket context from the selected channel.

### `socket message {message, chatId, replyId?, original?}`

Creates and sends a realtime `message` to the channel with ID `chatId`, optional `replyId` and `original` parameters specify the ID of the message it's replying to and an original message object for a forwarded message, respectively.

### `socket edit {messageId, edit}`

Edits the message text of message with ID `messageId` to `edit` if the current user is the message owner.

### `socket delete {messageId}`

Deletes message with ID `messageId` if the current user is the message owner.

### `socket react {messageId, emoji}`

Either adds a new user reaction `emoji` to message with ID `messageId` or removes a reaction if the current user already reacted it.

### `socket disconnect`

Disconnects current user from Socket.io's realtime connection and decreases online user count.

## Contribution

Any kind of contribution is welcome, but please follow the guideline below!

- Submit an issue if there's a bug/issue or if you want to suggest new features/subscriptions to be added.
- Submit a pull request if you want to add or improve the code base!
- Commit messages should be specific and address the issue
- Please don't submit random issues that aren't specific
- Please don't submit pull requests that "fix typo" or "improve formatting"
