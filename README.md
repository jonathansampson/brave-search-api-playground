# Brave Search API Playground

Deployed to <https://sampson.codes/brave-search-playground/>.

## Starting the Server

Open a terminal and navigate to the `/server/` directory. From there, run `npm run start`. This will build the project and run the _start_ script. The `configs.ts` file contains values that specify preferred ports, service path, and API parameters and settings.

## Starting the Front-end

Open a terminal to the project directory and run `npm run dev`. This will launch a development instance of the project at <localhost:5173/brave-search-playground>.

## Preview

You'll need an API key to enjoy the playground: get a free key at https://api.search.brave.com.

Below is a preview of the playground. The query is purposefully mispelled to test the 'spellcheck' flag in the Web Request Parameters.

![Demo of the playground](demo.gif)