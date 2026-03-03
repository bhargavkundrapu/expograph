function sec(type, data) { return { type, data }; }

const MODULES_4_7 = [
  /* ================================================================
     MODULE 4 — APIs + Webhooks
     ================================================================ */
  {
    title: "APIs + Webhooks",
    slug: "m4-apis-webhooks",
    lessons: [
      /* ---------- M4-L1: What is an API ---------- */
      {
        title: "What is an API (The Restaurant Analogy)",
        slug: "what-is-api",
        goal: "Understand what an API is and how apps talk to each other so you can connect any two tools together.",
        summary: "APIs are messengers that let apps share data. You learned the restaurant analogy, explored real API examples, and made your first API call.",
        sections: [
          sec("AA-01_TODAYS_WIN", {
            headline: "You will make your first real API call today",
            description: "By the end of this lesson you will understand how apps communicate behind the scenes and you will call a live API yourself using a free tool."
          }),
          sec("AA-02_WHY_CARE", {
            benefit: "Every automation you build will use at least one API. Understanding them is the single most important skill for connecting tools.",
            real_example: "When you book an Uber, the app calls a Maps API for your route, a Payments API to charge your card, and a Notifications API to text your driver. Three APIs, one tap."
          }),
          sec("AA-03_SIMPLE_MEANING", {
            term: "API (Application Programming Interface)",
            explanation: "An API is a set of rules that lets one app ask another app for data or tell it to do something. You send a request, and you get a response back.",
            analogy: "Think of a restaurant. You (the app) give your order to the waiter (the API). The waiter takes it to the kitchen (the server), and brings back your food (the response). You never go into the kitchen yourself."
          }),
          sec("AA-04_WHERE_USED", {
            examples: [
              { company: "Stripe", use: "Online stores call the Stripe API to charge credit cards without building their own payment system." },
              { company: "Twilio", use: "Apps call the Twilio API to send SMS messages and make phone calls programmatically." },
              { company: "Google Maps", use: "Ride-sharing and delivery apps call the Maps API to calculate routes and display maps." },
              { company: "OpenAI", use: "Thousands of apps call the ChatGPT API to add AI-powered text generation to their products." }
            ]
          }),
          sec("AA-05_FLOW", {
            input: "You type a city name into a weather app",
            steps: [
              "The weather app builds an API request with the city name",
              "The request travels over the internet to the weather server",
              "The server looks up current conditions and formats the data",
              "The server sends back a JSON response with temperature, humidity, etc."
            ],
            output: "The app displays today's weather for that city"
          }),
          sec("AA-06_TOOL_SETUP", {
            items: [
              { tool: "Postman (free)", action: "Download from postman.com and create a free account. This is where you will send API requests." },
              { tool: "JSONPlaceholder", action: "Open jsonplaceholder.typicode.com in your browser. This is a free fake API for practice." },
              { tool: "Browser DevTools", action: "Open Chrome, press F12, go to the Network tab. You will watch real API calls happen." }
            ]
          }),
          sec("AA-07_BUILD_STEPS", {
            steps: [
              { title: "Open Postman", instruction: "Launch Postman and click the + button to create a new request tab.", tip: "You can also use the web version at web.postman.co if you don't want to install anything." },
              { title: "Set the method to GET", instruction: "In the dropdown next to the URL bar, make sure it says GET.", tip: "GET means you are asking for data, not sending data." },
              { title: "Enter the URL", instruction: "Paste this URL: https://jsonplaceholder.typicode.com/posts/1", tip: "This asks for blog post number 1 from the fake API." },
              { title: "Hit Send", instruction: "Click the blue Send button and wait for the response.", tip: "You should see a JSON object with userId, id, title, and body fields." },
              { title: "Read the response", instruction: "Look at the Body tab below. You will see JSON data with a title and body. That is the API's answer to your request.", tip: "Notice the Status says 200 OK. That means success." },
              { title: "Try another endpoint", instruction: "Change the URL to https://jsonplaceholder.typicode.com/users/1 and hit Send again.", tip: "This time you get user data — name, email, address. Same API, different endpoint." },
              { title: "Watch it in the browser", instruction: "Open Chrome, press F12, go to Network tab, then visit jsonplaceholder.typicode.com/posts/1 in the address bar.", tip: "You can see the exact same request and response in the browser's Network tab." }
            ]
          }),
          sec("AA-08_TEST", {
            checks: [
              { test: "Send GET to /posts/1", expected: "Status 200 with a JSON object containing userId, id, title, and body" },
              { test: "Send GET to /users/1", expected: "Status 200 with user data including name, email, and address" },
              { test: "Send GET to /posts/9999", expected: "Status 404 or an empty object — the post does not exist" },
              { test: "Check response time", expected: "Under 500ms for all requests (JSONPlaceholder is fast)" }
            ]
          }),
          sec("AA-09_MISTAKES", {
            mistakes: [
              { mistake: "Typing the URL with a typo or missing the /", fix: "Copy-paste the URL exactly. APIs are picky about every character." },
              { mistake: "Using POST instead of GET when you just want to read data", fix: "GET = read data, POST = send data. Always pick the right method." },
              { mistake: "Thinking you need to code to use APIs", fix: "Tools like Postman let you call APIs without writing a single line of code." },
              { mistake: "Ignoring the status code in the response", fix: "Always check the status: 200 = success, 404 = not found, 500 = server error." },
              { mistake: "Not reading the API documentation first", fix: "Every API has docs that tell you what endpoints exist and what data you can request." },
              { mistake: "Confusing an API with a website", fix: "A website is for humans to look at. An API is for apps to exchange data. Same server, different format." }
            ]
          }),
          sec("AA-10_UPGRADE", {
            ideas: [
              "Try calling the OpenWeatherMap free API to get real weather data",
              "Use Postman Collections to save and organize your API calls",
              "Explore the GitHub API to fetch your own profile data",
              "Chain two API calls: get a user, then get their posts"
            ],
            challenge: "Call the JSONPlaceholder API to get all posts by user 1 (hint: /posts?userId=1), then get user 1's details, and combine the info in your head."
          }),
          sec("AA-11_MINI_TASK", {
            task: "Use Postman to call three different endpoints on JSONPlaceholder (/posts, /comments, /users) and write down what data each one returns.",
            deliverable: "A screenshot of all three responses in Postman, plus a one-sentence description of what each endpoint gives you.",
            time: "15 minutes"
          }),
          sec("AA-12_MONEY_ANGLE", {
            service: "API Integration Setup",
            price_range: "$200–$600 per integration",
            pitch: "Many small businesses need their tools connected — Shopify to their email platform, payment system to their accounting software. You set up the API connections so data flows automatically."
          }),
          sec("AA-13_KEY_NOTES", {
            notes: [
              "An API is a messenger that lets apps talk to each other using requests and responses.",
              "Every API call has a method (GET, POST, etc.), a URL (endpoint), and returns a response with a status code.",
              "JSON is the most common data format APIs use — it looks like organized text with curly braces and key-value pairs.",
              "You do not need to code to use APIs. Tools like Postman and Make let you call APIs visually.",
              "Status codes tell you what happened: 200 = OK, 404 = not found, 401 = unauthorized, 500 = server error."
            ]
          }),
          sec("AA-14_QUICK_QUIZ", {
            questions: [
              { question: "In the restaurant analogy, what does the waiter represent?", options: ["The database", "The API", "The frontend", "The user"], correct: 1, explanation: "The waiter (API) takes your order (request) to the kitchen (server) and brings back food (response)." },
              { question: "What HTTP status code means the request was successful?", options: ["404", "500", "200", "301"], correct: 2, explanation: "200 OK means the server understood your request and sent back the data you asked for." },
              { question: "What data format do most modern APIs return?", options: ["XML", "CSV", "JSON", "HTML"], correct: 2, explanation: "JSON (JavaScript Object Notation) is the standard format. It is lightweight, readable, and easy for both humans and machines to work with." }
            ]
          })
        ]
      },

      /* ---------- M4-L2: GET vs POST Requests ---------- */
      {
        title: "GET vs POST Requests",
        slug: "get-vs-post",
        goal: "Master the two most common API methods so you know when to read data and when to send data.",
        summary: "GET retrieves data, POST sends data. You practiced both methods, understood when to use each, and created a new resource via API.",
        sections: [
          sec("AA-01_TODAYS_WIN", {
            headline: "You will send data to an API and create something new",
            description: "Today you move beyond just reading data. You will send a POST request to create a brand-new blog post on a server — all from Postman."
          }),
          sec("AA-02_WHY_CARE", {
            benefit: "Every automation either reads data or writes data. Knowing GET vs POST is the difference between watching data and controlling it.",
            real_example: "When you submit a contact form on a website, your browser sends a POST request with your name and message. When you refresh your inbox, your email app sends a GET request to fetch new messages."
          }),
          sec("AA-03_SIMPLE_MEANING", {
            term: "GET and POST HTTP Methods",
            explanation: "GET asks the server to send you data. POST asks the server to accept and store new data you are sending. GET is like reading a book from the library. POST is like donating a new book to the library.",
            analogy: "GET is asking a librarian to find a book for you. POST is handing the librarian a new book and saying please add this to the shelf."
          }),
          sec("AA-04_WHERE_USED", {
            examples: [
              { company: "Twitter/X", use: "GET requests fetch your timeline, POST requests publish new tweets." },
              { company: "Shopify", use: "GET retrieves product listings, POST creates new products in a store." },
              { company: "Slack", use: "GET fetches channel messages, POST sends a new message to a channel." },
              { company: "Mailchimp", use: "GET pulls subscriber lists, POST adds a new subscriber to a list." }
            ]
          }),
          sec("AA-05_FLOW", {
            input: "You want to add a new contact to your CRM",
            steps: [
              "Your automation prepares the contact data (name, email, phone) as JSON",
              "It sends a POST request to the CRM's API endpoint like /api/contacts",
              "The CRM server validates the data and creates the contact record",
              "The server responds with the new contact's ID and confirmation"
            ],
            output: "A new contact now exists in your CRM, created entirely by your automation"
          }),
          sec("AA-06_TOOL_SETUP", {
            items: [
              { tool: "Postman", action: "Open the same Postman workspace from the previous lesson." },
              { tool: "JSONPlaceholder", action: "We will use the same free API — it accepts POST requests too." },
              { tool: "JSON Formatter", action: "Install the JSON Formatter Chrome extension to view JSON responses nicely in your browser." }
            ]
          }),
          sec("AA-07_BUILD_STEPS", {
            steps: [
              { title: "Start with a GET request", instruction: "In Postman, send a GET to https://jsonplaceholder.typicode.com/posts to see all 100 posts.", tip: "This is your baseline. You are reading data that already exists." },
              { title: "Create a new POST request", instruction: "Click the + tab in Postman. Change the dropdown from GET to POST.", tip: "The method dropdown is the most important choice you make for each request." },
              { title: "Set the URL", instruction: "Enter https://jsonplaceholder.typicode.com/posts as the URL.", tip: "Same URL, different method. GET reads from /posts, POST creates on /posts." },
              { title: "Add the request body", instruction: "Click the Body tab, select raw, choose JSON from the dropdown, and paste: {\"title\": \"My First API Post\", \"body\": \"I created this using Postman!\", \"userId\": 1}", tip: "The body is the data you are sending. It must be valid JSON." },
              { title: "Add the Content-Type header", instruction: "Go to the Headers tab and add: Key = Content-Type, Value = application/json", tip: "This tells the server you are sending JSON data, not plain text or HTML." },
              { title: "Send the POST request", instruction: "Click Send and look at the response.", tip: "You should get status 201 Created with your new post data, including an id of 101." },
              { title: "Compare GET vs POST responses", instruction: "Open both tabs side by side. GET gave you existing data, POST created new data and gave you a confirmation.", tip: "Notice GET returns 200 OK, POST returns 201 Created. Different status codes for different actions." },
              { title: "Try PUT to update", instruction: "Create a new tab, set method to PUT, URL to /posts/1, and send a body with an updated title. This updates an existing post.", tip: "PUT is like POST but for updating. GET reads, POST creates, PUT updates, DELETE removes." }
            ]
          }),
          sec("AA-08_TEST", {
            checks: [
              { test: "GET /posts returns data", expected: "Status 200 with an array of 100 post objects" },
              { test: "POST /posts with JSON body", expected: "Status 201 Created with the new post data including id: 101" },
              { test: "POST without Content-Type header", expected: "The server may misinterpret your data or return an error" },
              { test: "POST with empty body", expected: "The server returns the created object with null/empty fields" },
              { test: "PUT /posts/1 with updated title", expected: "Status 200 with the updated post data" }
            ]
          }),
          sec("AA-09_MISTAKES", {
            mistakes: [
              { mistake: "Using GET when you need to send data to the server", fix: "GET cannot carry a request body reliably. Use POST to send data." },
              { mistake: "Forgetting the Content-Type header on POST requests", fix: "Always set Content-Type: application/json when sending JSON data." },
              { mistake: "Sending invalid JSON in the body (missing quotes, trailing commas)", fix: "Use Postman's built-in JSON validator — it highlights errors in red." },
              { mistake: "Thinking POST responses always return the created object", fix: "Some APIs return just an ID or a success message. Always check the docs." },
              { mistake: "Not knowing the difference between POST and PUT", fix: "POST creates new records. PUT updates existing records. Use the right one." },
              { mistake: "Sending sensitive data in a GET URL parameter", fix: "GET parameters appear in URLs and logs. Send sensitive data in POST body over HTTPS." }
            ]
          }),
          sec("AA-10_UPGRADE", {
            ideas: [
              "Use PATCH instead of PUT to update only specific fields",
              "Try sending a DELETE request to remove a post",
              "Build a Postman Collection with GET, POST, PUT, and DELETE requests organized together"
            ],
            challenge: "Create a full CRUD sequence in Postman: GET all posts, POST a new one, PUT to update it, then DELETE it. Save all four as a collection."
          }),
          sec("AA-11_MINI_TASK", {
            task: "Create three new posts using POST requests, each with a different title and body. Then GET all posts to see them.",
            deliverable: "Screenshots of your three POST responses (all showing 201 Created) and the final GET response.",
            time: "10 minutes"
          }),
          sec("AA-12_MONEY_ANGLE", {
            service: "Custom API Data Sync",
            price_range: "$300–$800 per sync workflow",
            pitch: "Businesses often need data pushed from one system to another — new orders from Shopify POSTed to their warehouse system, new leads from their website POSTed to their CRM. You build the sync."
          }),
          sec("AA-13_KEY_NOTES", {
            notes: [
              "GET reads data from a server. POST sends new data to a server.",
              "POST requests need a body (the data you are sending) and a Content-Type header.",
              "Status 200 = success (GET), 201 = created (POST), 204 = deleted successfully.",
              "PUT updates an entire record, PATCH updates only specific fields, DELETE removes a record.",
              "In automations, you will use GET to pull data from one tool and POST to push it to another."
            ]
          }),
          sec("AA-14_QUICK_QUIZ", {
            questions: [
              { question: "Which HTTP method should you use to create a new record?", options: ["GET", "POST", "DELETE", "HEAD"], correct: 1, explanation: "POST is used to send data and create new resources on the server." },
              { question: "What status code means a new resource was successfully created?", options: ["200", "201", "204", "404"], correct: 1, explanation: "201 Created is the standard response when a POST request successfully creates a new resource." },
              { question: "Where does the data go in a POST request?", options: ["In the URL", "In the headers", "In the request body", "In the status code"], correct: 2, explanation: "POST data is sent in the request body, typically as JSON. GET parameters go in the URL, but POST data belongs in the body." }
            ]
          })
        ]
      },

      /* ---------- M4-L3: Webhook Basics ---------- */
      {
        title: "Webhook Basics (Instant Triggers)",
        slug: "webhook-basics",
        goal: "Learn how webhooks push data to you instantly so your automations trigger the second something happens.",
        summary: "Webhooks are reverse APIs — instead of you asking for data, the data comes to you. You set up a webhook receiver and watched data arrive in real time.",
        sections: [
          sec("AA-01_TODAYS_WIN", {
            headline: "You will receive live data pushed to your own webhook URL",
            description: "By the end of this lesson, you will have a working webhook endpoint that catches data the instant it is sent — no polling, no delays."
          }),
          sec("AA-02_WHY_CARE", {
            benefit: "Without webhooks, your automations would have to check for new data every few minutes. Webhooks make them instant — something happens, your automation runs immediately.",
            real_example: "When someone pays you on Stripe, Stripe sends a webhook to your server within one second. Your system can instantly send a receipt email, update the database, and grant access — all triggered by that one webhook."
          }),
          sec("AA-03_SIMPLE_MEANING", {
            term: "Webhook",
            explanation: "A webhook is a URL that receives data automatically when an event happens. Instead of your app asking is there anything new every 5 minutes, the other service pushes the news to your URL the moment it happens.",
            analogy: "APIs are like checking your mailbox every hour. Webhooks are like having a doorbell — you get notified the instant mail arrives."
          }),
          sec("AA-04_WHERE_USED", {
            examples: [
              { company: "Stripe", use: "Sends webhooks when payments succeed, fail, or get refunded — so your app can react instantly." },
              { company: "GitHub", use: "Sends webhooks on push, pull request, or issue events — triggering CI/CD pipelines automatically." },
              { company: "Shopify", use: "Sends webhooks when orders are placed, fulfilled, or cancelled — keeping inventory systems updated." },
              { company: "Typeform", use: "Sends a webhook with form responses the instant someone submits — triggering lead nurture sequences." }
            ]
          }),
          sec("AA-05_FLOW", {
            input: "A customer places an order on your Shopify store",
            steps: [
              "Shopify detects the new order event",
              "Shopify sends an HTTP POST request to your webhook URL with order data as JSON",
              "Your webhook receiver catches the data and parses it",
              "Your automation processes it — sends confirmation email, updates spreadsheet, notifies team"
            ],
            output: "The entire post-order workflow runs automatically within seconds of the purchase"
          }),
          sec("AA-06_TOOL_SETUP", {
            items: [
              { tool: "Webhook.site", action: "Go to webhook.site. It gives you a unique URL instantly. Any data sent to that URL shows up live on the page." },
              { tool: "Make.com (free tier)", action: "Create a free account at make.com. You will use it to build a real webhook trigger." },
              { tool: "Postman", action: "Open Postman to simulate webhook sends by POSTing data to your webhook.site URL." }
            ]
          }),
          sec("AA-07_BUILD_STEPS", {
            steps: [
              { title: "Get your webhook URL", instruction: "Open webhook.site in your browser. Copy the unique URL shown at the top (it looks like https://webhook.site/abc-123-def).", tip: "This URL is your personal webhook receiver. Anything sent to it appears on the page." },
              { title: "Send a test webhook", instruction: "In Postman, create a POST request to your webhook.site URL. Set the body to raw JSON: {\"event\": \"order.created\", \"customer\": \"John Doe\", \"amount\": 49.99}", tip: "This simulates what Stripe or Shopify would send to your webhook." },
              { title: "Watch it arrive", instruction: "Switch back to webhook.site. You should see your POST request appear instantly with the full JSON body.", tip: "Notice it shows the headers, body, and timestamp. This is exactly what real webhooks look like." },
              { title: "Set up Make.com webhook", instruction: "In Make.com, create a new scenario. Add a Webhook trigger module and choose Custom webhook. Click Create a webhook and copy the URL.", tip: "Make.com gives you a real webhook URL that can trigger entire automation workflows." },
              { title: "Send data to Make", instruction: "In Postman, POST the same JSON body to your Make.com webhook URL.", tip: "After sending, go back to Make and click OK. It will show the data structure it received." },
              { title: "Add an action", instruction: "After the webhook module in Make, add a Google Sheets module to log the data, or an Email module to send a notification.", tip: "This is a real automation: data arrives via webhook, and Make does something with it automatically." }
            ]
          }),
          sec("AA-08_TEST", {
            checks: [
              { test: "Send POST to webhook.site URL", expected: "The request appears on webhook.site within 1 second with full headers and body" },
              { test: "Send the same data to Make.com webhook", expected: "Make.com receives and displays the JSON structure correctly" },
              { test: "Send a GET request to webhook.site", expected: "It still shows up — webhook.site captures all HTTP methods" },
              { test: "Send malformed JSON", expected: "Webhook.site still captures it but the body may show as plain text instead of formatted JSON" }
            ]
          }),
          sec("AA-09_MISTAKES", {
            mistakes: [
              { mistake: "Confusing APIs with webhooks", fix: "APIs = you ask for data (pull). Webhooks = data is sent to you (push). Both use HTTP but the direction is different." },
              { mistake: "Not responding with 200 OK to incoming webhooks", fix: "When you receive a webhook, your server must reply 200 OK. If it doesn't, the sender will retry and you get duplicates." },
              { mistake: "Exposing your webhook URL publicly without validation", fix: "Always verify webhook signatures. Stripe, GitHub, and others sign their webhooks so you can confirm they are legit." },
              { mistake: "Assuming webhooks are guaranteed to arrive once", fix: "Webhooks can be sent multiple times (retries). Make your processing idempotent — handle duplicates gracefully." },
              { mistake: "Not logging incoming webhook data", fix: "Always log raw webhook payloads. If something breaks, you need the original data to debug." },
              { mistake: "Using your webhook.site URL in production", fix: "Webhook.site is for testing only. In production, use your own server or a platform like Make.com or Zapier." }
            ]
          }),
          sec("AA-10_UPGRADE", {
            ideas: [
              "Set up a GitHub webhook that triggers when you push code to a repository",
              "Create a Stripe test webhook using Stripe's webhook testing tool",
              "Build a Make.com scenario where a webhook triggers a Slack notification"
            ],
            challenge: "Set up a Make.com scenario with a webhook trigger that receives order data and logs it to a Google Sheet with columns for customer name, amount, and timestamp."
          }),
          sec("AA-11_MINI_TASK", {
            task: "Create a webhook receiver on webhook.site, then send it five different POST requests from Postman with different event types (order.created, payment.received, user.signed_up, etc.).",
            deliverable: "A screenshot of webhook.site showing all five received webhooks with their different payloads.",
            time: "15 minutes"
          }),
          sec("AA-12_MONEY_ANGLE", {
            service: "Webhook Integration Setup",
            price_range: "$250–$700 per webhook workflow",
            pitch: "Many SaaS tools support webhooks but businesses don't know how to use them. You configure webhook triggers that instantly sync data between their tools — no more manual data entry or delayed updates."
          }),
          sec("AA-13_KEY_NOTES", {
            notes: [
              "Webhooks push data to your URL the instant an event happens. No polling needed.",
              "A webhook is just an HTTP POST request sent automatically by another service.",
              "Always respond to webhooks with 200 OK to prevent retries and duplicates.",
              "Verify webhook signatures in production to make sure the data is from a trusted source.",
              "Webhook.site and Make.com are great for testing and building webhook-powered automations."
            ]
          }),
          sec("AA-14_QUICK_QUIZ", {
            questions: [
              { question: "What is the key difference between an API call and a webhook?", options: ["APIs are faster than webhooks", "APIs pull data, webhooks push data", "Webhooks require coding, APIs do not", "There is no difference"], correct: 1, explanation: "With APIs you request data (pull). With webhooks, data is automatically sent to you when an event happens (push)." },
              { question: "What should your server respond when it receives a valid webhook?", options: ["202 Accepted", "200 OK", "301 Redirect", "404 Not Found"], correct: 1, explanation: "Responding with 200 OK tells the sender the webhook was received successfully. Otherwise it may retry." },
              { question: "Why should you verify webhook signatures?", options: ["To make webhooks faster", "To reduce data size", "To confirm the data is from a trusted source", "Signatures are optional and not important"], correct: 2, explanation: "Webhook signatures prove the data actually came from the expected service and was not forged by an attacker." }
            ]
          })
        ]
      },

      /* ---------- M4-L4: API Authentication ---------- */
      {
        title: "API Authentication (Keys and OAuth)",
        slug: "api-authentication",
        goal: "Learn how APIs verify your identity so you can securely connect to any service that requires a key or login.",
        summary: "API authentication proves who you are. You learned about API keys, Bearer tokens, and OAuth, and used real credentials to make authenticated API calls.",
        sections: [
          sec("AA-01_TODAYS_WIN", {
            headline: "You will make an authenticated API call using a real API key",
            description: "Today you learn the three main ways APIs verify who you are, and you will use a real API key to fetch data that only authenticated users can access."
          }),
          sec("AA-02_WHY_CARE", {
            benefit: "Almost every useful API requires authentication. Without understanding keys and tokens, you cannot connect to Stripe, OpenAI, Google, Slack, or any paid API.",
            real_example: "When Make.com connects to your Gmail, it uses OAuth to get permission. When your automation calls OpenAI, it sends an API key in every request. Both are authentication — different methods, same purpose."
          }),
          sec("AA-03_SIMPLE_MEANING", {
            term: "API Authentication",
            explanation: "Authentication is how an API knows who is making the request. You prove your identity by sending a secret key, a token, or going through a login flow. Without it, the API rejects your request.",
            analogy: "An API key is like a gym membership card. You swipe it at the door to prove you are a member. No card, no entry. OAuth is like a hotel key card — the front desk verifies your ID once, then gives you a card that opens your room."
          }),
          sec("AA-04_WHERE_USED", {
            examples: [
              { company: "OpenAI", use: "Uses API keys (Bearer tokens) — every request must include your secret key in the Authorization header." },
              { company: "Google APIs", use: "Uses OAuth 2.0 — users grant permission through a Google login popup, and your app gets a time-limited access token." },
              { company: "Stripe", use: "Uses API keys — a publishable key for the frontend and a secret key for the backend." },
              { company: "GitHub", use: "Supports both Personal Access Tokens (simple) and OAuth Apps (for third-party integrations)." }
            ]
          }),
          sec("AA-05_FLOW", {
            input: "Your automation needs to send a message via Slack API",
            steps: [
              "You create a Slack App and generate an OAuth token with the right permissions",
              "Your automation includes the token in the Authorization header: Bearer xoxb-your-token",
              "Slack's server checks the token — is it valid? Does it have permission to post messages?",
              "If valid, Slack posts the message and returns a success response"
            ],
            output: "The message appears in the Slack channel, posted by your automation"
          }),
          sec("AA-06_TOOL_SETUP", {
            items: [
              { tool: "OpenWeatherMap API", action: "Sign up at openweathermap.org/api and get a free API key from your dashboard. Takes 2 minutes." },
              { tool: "Postman", action: "Open Postman. You will add your API key to requests using the Authorization tab." },
              { tool: "A text file for keys", action: "Create a local text file to store your API keys. Never share this file or commit it to git." }
            ]
          }),
          sec("AA-07_BUILD_STEPS", {
            steps: [
              { title: "Get your API key", instruction: "Log into openweathermap.org, go to API Keys in your profile, and copy your default key.", tip: "New keys can take up to 10 minutes to activate. If your first call fails, wait and try again." },
              { title: "Make an unauthenticated call", instruction: "In Postman, GET https://api.openweathermap.org/data/2.5/weather?q=London — without any key.", tip: "You will get a 401 Unauthorized error. This proves the API requires authentication." },
              { title: "Add your API key", instruction: "Append your key to the URL: https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_KEY_HERE", tip: "This is query parameter authentication — the simplest method. The key goes right in the URL." },
              { title: "Send the authenticated request", instruction: "Click Send. You should now get a 200 OK response with London's weather data in JSON.", tip: "Look for temp in the main object. By default it is in Kelvin — add &units=metric for Celsius." },
              { title: "Try header-based auth", instruction: "Create a new request. In the Authorization tab, choose Bearer Token and paste a sample token.", tip: "This is how OpenAI, Slack, and most modern APIs handle authentication — the token goes in the header, not the URL." },
              { title: "Store keys in Postman variables", instruction: "Go to Postman Environments, create a new environment, add a variable called weather_key with your key as the value. Use {{weather_key}} in your requests.", tip: "This keeps your keys out of shared collections. Never hardcode keys in URLs you share." }
            ]
          }),
          sec("AA-08_TEST", {
            checks: [
              { test: "Call weather API without a key", expected: "401 Unauthorized response with an error message" },
              { test: "Call weather API with a valid key", expected: "200 OK with JSON weather data for the requested city" },
              { test: "Call weather API with an invalid key", expected: "401 Unauthorized — the API rejects fake keys" },
              { test: "Use Postman environment variable for the key", expected: "The request works the same, but the key is stored securely in the environment" }
            ]
          }),
          sec("AA-09_MISTAKES", {
            mistakes: [
              { mistake: "Hardcoding API keys in your code or sharing them on GitHub", fix: "Store keys in environment variables (.env files) and add .env to your .gitignore." },
              { mistake: "Using your secret key on the frontend where users can see it", fix: "Secret keys go on the server only. Use publishable/public keys on the frontend." },
              { mistake: "Not understanding the difference between API keys and OAuth", fix: "API keys are static secrets. OAuth involves a login flow and gives time-limited tokens." },
              { mistake: "Ignoring key permissions and scopes", fix: "Give each key only the permissions it needs. A read-only key should not have write access." },
              { mistake: "Using the same API key for all your projects", fix: "Create separate keys for each project so you can revoke one without affecting others." },
              { mistake: "Not rotating expired or compromised keys", fix: "If a key leaks, regenerate it immediately. Set reminders to rotate keys periodically." }
            ]
          }),
          sec("AA-10_UPGRADE", {
            ideas: [
              "Set up a Google OAuth flow using the Google API Console",
              "Create a GitHub Personal Access Token and use it to access your private repos via API",
              "Use Postman pre-request scripts to auto-refresh expired OAuth tokens"
            ],
            challenge: "Get a free API key from NewsAPI.org and build a Postman request that fetches today's top tech headlines using Bearer token authentication."
          }),
          sec("AA-11_MINI_TASK", {
            task: "Sign up for two free APIs (OpenWeatherMap and NewsAPI), get their keys, and make authenticated calls to both using Postman.",
            deliverable: "Screenshots of successful authenticated responses from both APIs, with a note about which authentication method each uses.",
            time: "20 minutes"
          }),
          sec("AA-12_MONEY_ANGLE", {
            service: "Secure API Key Configuration",
            price_range: "$150–$400 per project",
            pitch: "Businesses often have API keys scattered in code, shared docs, and emails. You audit their keys, set up proper environment variables, configure key rotation, and lock down permissions."
          }),
          sec("AA-13_KEY_NOTES", {
            notes: [
              "API authentication proves who you are. Without it, most APIs will reject your requests.",
              "The three main methods are: API keys (simple), Bearer tokens (header-based), and OAuth (login flow).",
              "Never expose secret keys in frontend code, public repos, or shared URLs.",
              "Use environment variables to store keys securely and keep them out of your codebase.",
              "Always give keys the minimum permissions needed — the principle of least privilege."
            ]
          }),
          sec("AA-14_QUICK_QUIZ", {
            questions: [
              { question: "Where should you store API keys in a real project?", options: ["In the HTML file", "In a public GitHub repo", "In environment variables (.env file)", "In the URL for every request"], correct: 2, explanation: "Environment variables keep keys out of your codebase and are loaded at runtime. Always add .env to .gitignore." },
              { question: "What is the main advantage of OAuth over a simple API key?", options: ["OAuth is faster", "OAuth lets users grant limited, time-based access without sharing passwords", "OAuth does not need the internet", "OAuth keys never expire"], correct: 1, explanation: "OAuth lets users authorize your app through a secure login flow, giving you a time-limited token without ever sharing their password." }
            ]
          })
        ]
      },

      /* ---------- M4-L5: Build a Webhook-to-Sheets Pipeline ---------- */
      {
        title: "Build a Webhook-to-Sheets Pipeline",
        slug: "webhook-to-sheets",
        goal: "Build a complete automation where webhook data lands in a Google Sheet automatically — your first real integration.",
        summary: "You built a full pipeline: webhook receives data, processes it, and logs it to Google Sheets in real time. This is a pattern you will reuse in dozens of future automations.",
        sections: [
          sec("AA-01_TODAYS_WIN", {
            headline: "You will build a live automation that writes data to Google Sheets",
            description: "Today everything comes together. You will set up a webhook that catches incoming data and automatically logs it to a Google Sheet — a real, working automation you can show off."
          }),
          sec("AA-02_WHY_CARE", {
            benefit: "Webhook-to-spreadsheet is the most requested automation pattern for small businesses. Learning it opens the door to dozens of freelance projects.",
            real_example: "A real estate agency gets leads from their website form. Instead of checking email, a webhook catches each submission and adds it to a Google Sheet with name, phone, property interest, and timestamp. Agents see new leads in real time."
          }),
          sec("AA-03_SIMPLE_MEANING", {
            term: "Webhook-to-Sheets Pipeline",
            explanation: "A pipeline is a series of steps that data flows through automatically. In this case: data arrives via webhook, gets processed, and lands in a Google Sheet. No human involvement needed.",
            analogy: "Think of a factory conveyor belt. Raw materials (webhook data) enter at one end, get shaped and sorted (processing), and arrive as finished products (rows in your spreadsheet) at the other end."
          }),
          sec("AA-04_WHERE_USED", {
            examples: [
              { company: "Freelance agencies", use: "Every form submission on a client's website triggers a webhook that adds leads to a tracking spreadsheet." },
              { company: "E-commerce stores", use: "New orders trigger a webhook that logs order details to a Sheet for the fulfillment team." },
              { company: "Event organizers", use: "Eventbrite registration webhooks feed attendee data directly into a planning spreadsheet." },
              { company: "SaaS companies", use: "Payment webhooks from Stripe log every transaction to a Sheet for bookkeeping before the CPA reviews it." }
            ]
          }),
          sec("AA-05_FLOW", {
            input: "A new form submission arrives from a website contact form",
            steps: [
              "The form sends a POST request to your Make.com webhook URL with the form data",
              "Make.com receives the data and extracts the fields (name, email, message)",
              "Make.com maps each field to a column in your Google Sheet",
              "A new row is added to the Sheet with all the data plus a timestamp"
            ],
            output: "The Google Sheet updates with a new row containing the lead's information within seconds"
          }),
          sec("AA-06_TOOL_SETUP", {
            items: [
              { tool: "Google Sheets", action: "Create a new Google Sheet with columns: Timestamp, Name, Email, Message, Source. Name it Webhook Leads." },
              { tool: "Make.com", action: "Log into Make.com (free plan works). Create a new scenario." },
              { tool: "Postman", action: "Open Postman to simulate form submissions by sending POST requests to your webhook." },
              { tool: "Google account", action: "Make sure you can connect Make.com to your Google account (you will authorize Google Sheets access)." }
            ]
          }),
          sec("AA-07_BUILD_STEPS", {
            steps: [
              { title: "Create the Google Sheet", instruction: "Open Google Sheets and create a new sheet. In row 1, add headers: Timestamp, Name, Email, Message, Source. Name the sheet Webhook Leads.", tip: "Headers must be in row 1. Make.com uses them to map data to the right columns." },
              { title: "Create a new Make.com scenario", instruction: "In Make.com, click Create a new scenario. Search for Webhooks and add the Custom webhook module as your trigger.", tip: "This creates a unique URL that will receive incoming data." },
              { title: "Create the webhook", instruction: "Click the webhook module, click Create a webhook, name it Lead Capture Webhook, and copy the URL.", tip: "This URL is live immediately. Any POST request sent here will trigger your scenario." },
              { title: "Send test data", instruction: "In Postman, POST this JSON to your webhook URL: {\"name\": \"Jane Smith\", \"email\": \"jane@example.com\", \"message\": \"I need help with my website\", \"source\": \"contact_form\"}", tip: "After sending, go back to Make.com and click OK. It will map out the data structure." },
              { title: "Add Google Sheets module", instruction: "Click the + after your webhook module, search for Google Sheets, and choose Add a Row. Connect your Google account, select your spreadsheet, and select the Webhook Leads sheet.", tip: "Make.com will ask for permission to access your Google Sheets. Click Allow." },
              { title: "Map the fields", instruction: "For Timestamp, use the Now function. For Name, map the name field from the webhook. Do the same for Email, Message, and Source.", tip: "Click inside each column field and select the matching webhook data from the dropdown." },
              { title: "Run the scenario", instruction: "Click Run once, then send another POST from Postman. Check your Google Sheet — a new row should appear.", tip: "If it works, toggle the scenario ON and set the schedule to Immediately." },
              { title: "Test with multiple entries", instruction: "Send 3-4 different POST requests from Postman with different names and messages. Verify each one appears as a new row in your Sheet.", tip: "Check that the timestamp is accurate and all fields are in the correct columns." }
            ]
          }),
          sec("AA-08_TEST", {
            checks: [
              { test: "Send one test webhook", expected: "A new row appears in Google Sheets within 5 seconds with all fields correctly mapped" },
              { test: "Send five webhooks quickly", expected: "Five new rows appear in order, no data is lost or duplicated" },
              { test: "Send webhook with missing fields", expected: "The row is still created with empty cells for the missing fields (no errors)" },
              { test: "Check the timestamp column", expected: "Each row has an accurate, auto-generated timestamp from Make.com" },
              { test: "Turn the scenario off and send a webhook", expected: "No row is added — the scenario must be ON to process webhooks" }
            ]
          }),
          sec("AA-09_MISTAKES", {
            mistakes: [
              { mistake: "Not sending test data before connecting Google Sheets", fix: "Always send a test POST first so Make.com can detect the data structure for field mapping." },
              { mistake: "Headers missing in the Google Sheet", fix: "Make.com needs headers in row 1 to know which column is which. Add them before connecting." },
              { mistake: "Mapping fields to the wrong columns", fix: "Double-check each mapping. Click the field and verify the webhook variable name matches the column." },
              { mistake: "Leaving the scenario in Run once mode", fix: "After testing, toggle the scenario ON and set scheduling to Immediately so it runs automatically." },
              { mistake: "Not handling empty or malformed webhook data", fix: "Add a filter after the webhook module to skip entries where required fields like email are missing." },
              { mistake: "Forgetting to authorize Google Sheets access", fix: "If the Google Sheets module shows an error, reconnect your Google account and re-authorize permissions." }
            ]
          }),
          sec("AA-10_UPGRADE", {
            ideas: [
              "Add an email notification step that sends you an alert for each new lead",
              "Add a filter that only logs leads with a company email (skip gmail, yahoo, etc.)",
              "Create a second Sheet tab for high-value leads based on the message content",
              "Add a Slack notification that pings your team channel for every new lead"
            ],
            challenge: "Extend the pipeline: after adding a row to Sheets, send a Slack message to a channel with the lead's name and message. Then add an email auto-reply thanking the lead."
          }),
          sec("AA-11_MINI_TASK", {
            task: "Build the complete webhook-to-Sheets pipeline from scratch using Make.com and test it with at least 5 simulated form submissions from Postman.",
            deliverable: "A screenshot of your Make.com scenario and the Google Sheet with at least 5 rows of test data.",
            time: "30 minutes"
          }),
          sec("AA-12_MONEY_ANGLE", {
            service: "Form-to-Sheet Automation Setup",
            price_range: "$200–$500 per form",
            pitch: "Every business with a website form needs leads captured automatically. You build the webhook pipeline that takes their form submissions and drops them straight into a spreadsheet their sales team already uses."
          }),
          sec("AA-13_KEY_NOTES", {
            notes: [
              "The webhook-to-Sheets pattern is one of the most common and requested automations.",
              "Always set up headers in row 1 of your Google Sheet before connecting it to Make.com.",
              "Send test data through the webhook first so your automation platform can detect the data structure.",
              "Add filters and error handling to skip invalid submissions instead of logging bad data.",
              "This same pattern works for any destination: CRM, database, Slack, email — just swap the last step."
            ]
          }),
          sec("AA-14_QUICK_QUIZ", {
            questions: [
              { question: "Why do you need to send test data before mapping fields in Make.com?", options: ["To check your internet speed", "So Make.com can detect the data structure for field mapping", "To verify your Google account", "Test data is optional"], correct: 1, explanation: "Make.com needs to see actual incoming data to know what fields are available for mapping to your Google Sheet columns." },
              { question: "What happens if your Make.com scenario is set to OFF when a webhook arrives?", options: ["The data is queued for later", "The data is lost — the webhook is not processed", "Make.com saves it automatically", "The webhook is sent back to the sender"], correct: 1, explanation: "When the scenario is OFF, incoming webhooks are not processed. The data may be lost unless the sending service retries." },
              { question: "What is the first row of your Google Sheet used for in this pipeline?", options: ["Test data", "Column headers that Make.com uses for mapping", "Instructions for the team", "It should be left empty"], correct: 1, explanation: "Row 1 contains headers like Name, Email, Message. Make.com reads these to know where each piece of webhook data should go." }
            ]
          })
        ]
      }
    ]
  },

  /* ================================================================
     MODULE 5 — AI Inside Automations
     ================================================================ */
  {
    title: "AI Inside Automations",
    slug: "m5-ai-in-automations",
    lessons: [
      /* ---------- M5-L1: Adding ChatGPT to Your Workflows ---------- */
      {
        title: "Adding ChatGPT to Your Workflows",
        slug: "chatgpt-in-workflows",
        goal: "Connect ChatGPT's API to your automations so every workflow gets an AI brain that reads, writes, and decides.",
        summary: "You connected the OpenAI API to Make.com and built a workflow where AI processes text automatically. This opens the door to hundreds of AI-powered automations.",
        sections: [
          sec("AA-01_TODAYS_WIN", {
            headline: "You will make an automation that uses ChatGPT to generate text automatically",
            description: "By the end of this lesson, your automation will send a prompt to ChatGPT and use the AI response in your workflow — all without opening a chat window."
          }),
          sec("AA-02_WHY_CARE", {
            benefit: "Adding AI to automations turns simple data-movers into smart decision-makers. Your workflows can now summarize, classify, write, and analyze — all automatically.",
            real_example: "A marketing agency runs a Make.com automation that takes each new blog draft from Google Docs, sends it to ChatGPT for a meta description, and posts it to WordPress. What took 15 minutes per post now takes zero."
          }),
          sec("AA-03_SIMPLE_MEANING", {
            term: "OpenAI API (ChatGPT API)",
            explanation: "The OpenAI API lets you send a text prompt to ChatGPT from your code or automation and get a text response back. It works just like chatting, but instead of typing in a browser, your automation sends the message programmatically.",
            analogy: "Using ChatGPT in the browser is like calling a consultant on the phone. Using the API is like having that consultant sit in your office, ready to answer questions from anyone on your team automatically."
          }),
          sec("AA-04_WHERE_USED", {
            examples: [
              { company: "Jasper AI", use: "Uses the OpenAI API behind the scenes to generate marketing copy at scale for businesses." },
              { company: "Notion AI", use: "Calls AI APIs to summarize pages, generate action items, and answer questions about your notes." },
              { company: "Intercom", use: "Uses AI APIs to auto-draft replies to customer support tickets before agents review them." },
              { company: "Zapier", use: "Built-in AI step lets users add ChatGPT to any Zap without writing code." }
            ]
          }),
          sec("AA-05_FLOW", {
            input: "A new customer review arrives in your Google Sheet",
            steps: [
              "Make.com detects the new row and reads the review text",
              "The review text is sent to the OpenAI API with a prompt like: Summarize this review in one sentence and rate the sentiment as positive, neutral, or negative",
              "ChatGPT returns the summary and sentiment rating",
              "Make.com writes the AI response back into the Sentiment and Summary columns of the Sheet"
            ],
            output: "Every new review is automatically summarized and sentiment-tagged without any human work"
          }),
          sec("AA-06_TOOL_SETUP", {
            items: [
              { tool: "OpenAI Account", action: "Go to platform.openai.com, sign up, and add $5 credit. Go to API Keys and create a new secret key. Copy it." },
              { tool: "Make.com", action: "Open your Make.com workspace. You will connect the OpenAI module." },
              { tool: "Google Sheets", action: "Create a sheet with columns: Input Text, AI Summary, Sentiment. Add 3-4 sample product reviews in the Input Text column." }
            ]
          }),
          sec("AA-07_BUILD_STEPS", {
            steps: [
              { title: "Get your OpenAI API key", instruction: "Go to platform.openai.com/api-keys and click Create new secret key. Name it make-automation. Copy the key immediately.", tip: "You can only see the key once. Paste it somewhere safe before closing the dialog." },
              { title: "Create the scenario in Make.com", instruction: "Create a new scenario. Add a Google Sheets trigger: Watch Rows. Connect your Google account and select your reviews spreadsheet.", tip: "Set the trigger to check for new rows every 15 minutes or use Immediately if on a paid plan." },
              { title: "Add the OpenAI module", instruction: "Click + after the Google Sheets trigger. Search for OpenAI and select Create a Chat Completion. Connect your OpenAI account using the API key.", tip: "Choose the gpt-4o-mini model for cost efficiency — it is great for summaries and classification." },
              { title: "Write the prompt", instruction: "In the Messages field, add a User message: Summarize this customer review in one sentence. Then rate the sentiment as Positive, Neutral, or Negative. Format: Summary: [summary] | Sentiment: [rating]. The review: {{Input Text}}", tip: "Use the {{}} to insert the Input Text column from the Google Sheets data. This makes each prompt dynamic." },
              { title: "Set parameters", instruction: "Set Max tokens to 150 and Temperature to 0.3.", tip: "Low temperature (0.3) makes the output more consistent and predictable — perfect for automated workflows." },
              { title: "Add Google Sheets Update Row", instruction: "Click + again, add Google Sheets > Update a Row. Map the AI output to the AI Summary and Sentiment columns.", tip: "You may need to parse the AI response to split Summary and Sentiment. Use Make.com's text functions or a simple split." },
              { title: "Test the full scenario", instruction: "Click Run once. Add a new row to your Sheet with a sample review. Watch the automation process it.", tip: "Check that the AI summary appears in the right column and the sentiment rating makes sense." },
              { title: "Activate and monitor", instruction: "Toggle the scenario ON. Add 5 more reviews to your Sheet and verify they all get processed.", tip: "Check the scenario history in Make.com to see each execution's details and any errors." }
            ]
          }),
          sec("AA-08_TEST", {
            checks: [
              { test: "Add a positive review to the Sheet", expected: "AI summary appears in the next column and sentiment is rated Positive" },
              { test: "Add a negative review", expected: "AI correctly identifies the sentiment as Negative with an accurate summary" },
              { test: "Add a vague/neutral review", expected: "AI rates it as Neutral and provides a fair summary" },
              { test: "Add 5 reviews at once", expected: "All 5 are processed sequentially without errors" },
              { test: "Check OpenAI usage dashboard", expected: "You can see the API calls and token usage at platform.openai.com/usage" }
            ]
          }),
          sec("AA-09_MISTAKES", {
            mistakes: [
              { mistake: "Using GPT-4 when GPT-4o-mini would work fine", fix: "GPT-4o-mini is 20x cheaper and fast enough for summaries and classification. Save GPT-4 for complex reasoning." },
              { mistake: "Not setting max_tokens, leading to expensive long responses", fix: "Always set a max_tokens limit. For summaries, 100-200 tokens is plenty." },
              { mistake: "Using high temperature for factual tasks", fix: "Use temperature 0.2-0.4 for consistent, factual outputs. High temperature (0.8+) is for creative writing." },
              { mistake: "Forgetting to handle API errors in the automation", fix: "Add an error handler in Make.com that catches API failures and retries or logs the error." },
              { mistake: "Sending too much text in a single prompt", fix: "GPT-4o-mini handles 128K tokens, but sending less is cheaper. Trim unnecessary text before sending." },
              { mistake: "Not specifying the output format in the prompt", fix: "Always tell the AI exactly how to format the response. Otherwise parsing it in your automation becomes a nightmare." }
            ]
          }),
          sec("AA-10_UPGRADE", {
            ideas: [
              "Add a step that translates the summary into another language",
              "Create a conditional branch: if sentiment is Negative, send a Slack alert to the support team",
              "Use JSON mode to get structured output instead of parsing plain text",
              "Add a second AI step that suggests a response to negative reviews"
            ],
            challenge: "Build a Make.com scenario that watches a Google Sheet of customer feedback, uses ChatGPT to classify each entry as Bug, Feature Request, or Praise, and sorts them into three different Sheet tabs."
          }),
          sec("AA-11_MINI_TASK", {
            task: "Create a Make.com scenario with an OpenAI module that takes any text input (via webhook or Google Sheets) and returns a one-sentence summary.",
            deliverable: "Screenshot of the Make.com scenario and at least 3 processed entries showing the AI-generated summaries.",
            time: "25 minutes"
          }),
          sec("AA-12_MONEY_ANGLE", {
            service: "AI-Powered Review Analysis",
            price_range: "$400–$1,000 setup + $50/month maintenance",
            pitch: "Restaurants, e-commerce stores, and agencies get hundreds of reviews. You build an automation that reads every review, summarizes it, tags the sentiment, and flags negative ones for immediate attention."
          }),
          sec("AA-13_KEY_NOTES", {
            notes: [
              "The OpenAI API lets you add ChatGPT's intelligence to any automation — no chat window needed.",
              "Use GPT-4o-mini for most automation tasks. It is fast, cheap, and accurate for summaries and classification.",
              "Always specify output format in your prompt so the AI response is easy to parse in your automation.",
              "Set temperature low (0.2-0.4) for consistency and max_tokens to control cost.",
              "Add error handling for API failures — rate limits, timeouts, and invalid responses can happen."
            ]
          }),
          sec("AA-14_QUICK_QUIZ", {
            questions: [
              { question: "Why should you use a low temperature (0.2-0.4) in automated workflows?", options: ["It makes the AI faster", "It produces more creative output", "It makes the output more consistent and predictable", "It reduces the cost per request"], correct: 2, explanation: "Low temperature reduces randomness, so the AI gives similar output for similar inputs. This is critical for reliable automations." },
              { question: "Which OpenAI model is most cost-effective for simple tasks like summarization?", options: ["GPT-4", "GPT-4o-mini", "DALL-E", "Whisper"], correct: 1, explanation: "GPT-4o-mini is optimized for speed and cost while still being highly capable for tasks like summarization and classification." },
              { question: "What should you always include in an AI prompt for automations?", options: ["A greeting", "A specific output format", "Your API key", "A long backstory"], correct: 1, explanation: "Specifying the output format (like JSON or a specific template) makes it easy for your automation to parse and use the AI response." }
            ]
          })
        ]
      },

      /* ---------- M5-L2: Auto-Summarize Incoming Emails ---------- */
      {
        title: "Auto-Summarize Incoming Emails",
        slug: "auto-summarize-emails",
        goal: "Build an automation that reads your incoming emails and creates AI-powered summaries so you never miss what matters.",
        summary: "You built an email summarizer that uses ChatGPT to condense long emails into key points and action items, saving hours of reading time each week.",
        sections: [
          sec("AA-01_TODAYS_WIN", {
            headline: "Your inbox will summarize itself by the end of this lesson",
            description: "You will build an automation that reads incoming emails, sends them to ChatGPT for summarization, and logs the summaries to a clean Google Sheet you can scan in seconds."
          }),
          sec("AA-02_WHY_CARE", {
            benefit: "The average professional receives 120+ emails per day. AI summarization cuts reading time by 80% and ensures you never miss important action items.",
            real_example: "A project manager receives 50+ emails daily from clients, vendors, and team members. An automation summarizes each email into 2-3 bullet points and flags any that need urgent replies. She reviews the summary sheet in 5 minutes instead of spending an hour reading."
          }),
          sec("AA-03_SIMPLE_MEANING", {
            term: "Email Summarization Pipeline",
            explanation: "An email summarization pipeline automatically reads new emails, sends the content to an AI model, and stores a short summary. It turns a wall of text into a quick bullet list.",
            analogy: "It is like having a personal assistant who reads all your mail, highlights the important parts, and gives you a one-page brief instead of a stack of letters."
          }),
          sec("AA-04_WHERE_USED", {
            examples: [
              { company: "Superhuman", use: "Uses AI to generate one-line email summaries so users can scan their inbox faster." },
              { company: "Microsoft Copilot", use: "Summarizes long email threads in Outlook, pulling out action items and decisions." },
              { company: "Law firms", use: "Automate summarization of lengthy legal correspondence to save associate reading time." },
              { company: "Executive assistants", use: "Use email AI tools to prepare daily briefings for CEOs from hundreds of incoming messages." }
            ]
          }),
          sec("AA-05_FLOW", {
            input: "A new email arrives in your Gmail inbox",
            steps: [
              "Make.com's Gmail module detects the new email and extracts subject, sender, and body",
              "The email body is sent to OpenAI with a prompt to summarize and extract action items",
              "ChatGPT returns a 2-3 line summary and any action items found",
              "Make.com writes the summary, action items, sender, and subject to a Google Sheet"
            ],
            output: "A clean spreadsheet with one row per email: sender, subject, AI summary, action items, and timestamp"
          }),
          sec("AA-06_TOOL_SETUP", {
            items: [
              { tool: "Gmail", action: "You need a Gmail account. Make sure you allow third-party app access in your Google security settings." },
              { tool: "Make.com", action: "Open Make.com. You will use the Gmail module and OpenAI module together." },
              { tool: "Google Sheets", action: "Create a new sheet called Email Summaries with columns: Date, From, Subject, Summary, Action Items, Priority." },
              { tool: "OpenAI API key", action: "Use the same API key from the previous lesson. Make sure it is connected in Make.com." }
            ]
          }),
          sec("AA-07_BUILD_STEPS", {
            steps: [
              { title: "Create the Google Sheet", instruction: "Make a sheet called Email Summaries. Add headers: Date, From, Subject, Summary, Action Items, Priority.", tip: "Keep the column names simple and consistent. Make.com will use them for mapping." },
              { title: "Create the Make.com scenario", instruction: "Start a new scenario. Add Gmail > Watch Emails as the trigger. Connect your Gmail account.", tip: "Set the folder to INBOX and the limit to 10 emails per run during testing." },
              { title: "Add a text filter (optional)", instruction: "Add a filter after Gmail that only continues if the email body length is greater than 100 characters.", tip: "This skips tiny auto-notifications and focuses on real emails worth summarizing." },
              { title: "Add the OpenAI module", instruction: "Add OpenAI > Create a Chat Completion. Use this prompt: Summarize this email in 2-3 bullet points. List any action items separately. Rate priority as High, Medium, or Low. Format: Summary: [bullets] | Actions: [list] | Priority: [level]. Email from {{sender}}: {{body}}", tip: "Include the sender name in the prompt — it helps ChatGPT understand context (e.g., boss vs newsletter)." },
              { title: "Parse the AI response", instruction: "Add a Text Parser module or use Make.com's split function to separate Summary, Actions, and Priority from the AI output.", tip: "If parsing is tricky, change the prompt to return JSON and use the Parse JSON module instead." },
              { title: "Write to Google Sheets", instruction: "Add Google Sheets > Add a Row. Map Date to the email date, From to sender, Subject to email subject, and the parsed AI fields to Summary, Action Items, and Priority.", tip: "Use Make.com's formatDate function to make the date column clean and consistent." },
              { title: "Test with real emails", instruction: "Click Run once, then send yourself a test email with a long body. Watch it flow through the automation.", tip: "Send different types of emails — a meeting request, a project update, and a newsletter — to test the AI's flexibility." }
            ]
          }),
          sec("AA-08_TEST", {
            checks: [
              { test: "Receive a long project update email", expected: "Summary captures key points in 2-3 bullets. Action items are extracted correctly." },
              { test: "Receive a short one-line email", expected: "The filter skips it (under 100 characters) or AI provides a brief summary" },
              { test: "Receive a newsletter email", expected: "Priority is rated Low and summary captures the main topic" },
              { test: "Receive an urgent email from a boss", expected: "Priority is rated High and action items are clearly listed" }
            ]
          }),
          sec("AA-09_MISTAKES", {
            mistakes: [
              { mistake: "Sending the entire email including HTML tags to the AI", fix: "Strip HTML from the email body first. Use Make.com's strip HTML function or a regex replace." },
              { mistake: "Not limiting which emails get processed", fix: "Add filters: skip emails from no-reply addresses, newsletters, or automated notifications." },
              { mistake: "Using too many tokens on long email threads", fix: "Truncate emails to the first 2000 characters. Most important info is at the top." },
              { mistake: "Not handling emails with attachments", fix: "Your summary should note if there are attachments. Add a step to log attachment names." },
              { mistake: "Forgetting about email thread context", fix: "Include the email subject and sender in the prompt so AI can understand the context better." }
            ]
          }),
          sec("AA-10_UPGRADE", {
            ideas: [
              "Add a Slack notification for any email rated High priority",
              "Create a daily digest email that compiles all summaries into one message",
              "Auto-label emails in Gmail based on the AI's priority rating",
              "Add language detection — if email is not in English, translate then summarize"
            ],
            challenge: "Build a daily email digest: at 8 AM, compile all unread email summaries from the Sheet into one formatted email sent to your inbox."
          }),
          sec("AA-11_MINI_TASK", {
            task: "Build the full email summarizer in Make.com. Send yourself 5 test emails of different types and verify the Sheet is populated with accurate summaries.",
            deliverable: "Screenshot of the Make.com scenario flow and the Google Sheet with 5 summarized emails showing AI-generated summaries and priority ratings.",
            time: "30 minutes"
          }),
          sec("AA-12_MONEY_ANGLE", {
            service: "AI Email Summarization System",
            price_range: "$500–$1,200 setup",
            pitch: "Executives and agencies drown in emails. You build an AI-powered system that summarizes every email, flags urgent ones, and delivers a daily brief — saving them 1-2 hours daily."
          }),
          sec("AA-13_KEY_NOTES", {
            notes: [
              "Email summarization is one of the highest-impact AI automations for busy professionals.",
              "Always strip HTML from email bodies before sending to the AI — raw HTML wastes tokens and confuses the model.",
              "Include sender and subject in your AI prompt for better context-aware summaries.",
              "Add filters to skip newsletters, auto-notifications, and spam to reduce noise and API costs.",
              "Start with GPT-4o-mini — it handles email summarization well at a fraction of GPT-4 cost."
            ]
          }),
          sec("AA-14_QUICK_QUIZ", {
            questions: [
              { question: "Why should you strip HTML from emails before sending to ChatGPT?", options: ["HTML makes emails longer and wastes API tokens", "ChatGPT cannot read HTML at all", "HTML makes the response slower", "It is not necessary to strip HTML"], correct: 0, explanation: "HTML tags add a lot of extra text that is not useful for summarization. Stripping them reduces token usage and gives the AI cleaner text to work with." },
              { question: "What should you include in the prompt alongside the email body?", options: ["Your API key", "The email sender and subject for context", "The email's HTML source code", "Previous email summaries"], correct: 1, explanation: "Including sender and subject helps the AI understand who wrote the email and what it's about, leading to more accurate summaries." }
            ]
          })
        ]
      },

      /* ---------- M5-L3: AI Content Categorizer ---------- */
      {
        title: "AI Content Categorizer",
        slug: "ai-content-categorizer",
        goal: "Build an automation that uses AI to sort and tag incoming content into categories so everything is organized without manual effort.",
        summary: "You built a content categorizer that uses ChatGPT to classify text into predefined categories. This pattern works for support tickets, feedback, leads, and any unstructured data.",
        sections: [
          sec("AA-01_TODAYS_WIN", {
            headline: "You will build an AI that sorts content into categories automatically",
            description: "Today you build a system where incoming text — support tickets, feedback, leads — gets automatically classified by AI into the right category and routed accordingly."
          }),
          sec("AA-02_WHY_CARE", {
            benefit: "Manual categorization is slow and inconsistent. AI categorization is instant, consistent, and scales to thousands of items without hiring more people.",
            real_example: "A SaaS company receives 200 support tickets daily. An AI categorizer reads each one and tags it as Billing, Technical, Feature Request, or Bug Report. Each category routes to the right team automatically. Response time dropped from 4 hours to 30 minutes."
          }),
          sec("AA-03_SIMPLE_MEANING", {
            term: "AI Content Categorizer",
            explanation: "A content categorizer is an automation that reads text, understands what it is about, and assigns it to a predefined category. The AI acts as a smart sorter that never gets tired or inconsistent.",
            analogy: "It is like a mail sorter at a post office. Letters arrive, the sorter reads the zip code, and puts each letter in the right bin. Except your AI reads the entire content to sort by meaning, not just a code."
          }),
          sec("AA-04_WHERE_USED", {
            examples: [
              { company: "Zendesk", use: "Uses AI to auto-tag support tickets by category, urgency, and sentiment before agents see them." },
              { company: "HubSpot", use: "AI categorizes incoming leads by industry, company size, and intent to prioritize sales outreach." },
              { company: "News organizations", use: "Auto-categorize incoming articles into sections like Sports, Politics, Tech, Business." },
              { company: "E-commerce", use: "Categorize product reviews as relating to Quality, Shipping, Customer Service, or Pricing." }
            ]
          }),
          sec("AA-05_FLOW", {
            input: "A customer submits a support ticket: I was charged twice for my subscription last month",
            steps: [
              "The automation receives the ticket text via webhook or form submission",
              "The text is sent to ChatGPT with categories: Billing, Technical, Feature Request, Bug Report, Account, Other",
              "ChatGPT analyzes the text and responds with: Category: Billing, Confidence: High",
              "The automation tags the ticket and routes it to the Billing support team"
            ],
            output: "The ticket is instantly tagged as Billing and assigned to the right team — no human triage needed"
          }),
          sec("AA-06_TOOL_SETUP", {
            items: [
              { tool: "Google Sheets", action: "Create a sheet called Content Categorizer with columns: Input Text, Category, Confidence, Timestamp. Add 10 sample entries." },
              { tool: "Make.com", action: "Open your Make.com workspace for building the scenario." },
              { tool: "OpenAI API", action: "Use your existing API key. We will use GPT-4o-mini with JSON mode for structured output." }
            ]
          }),
          sec("AA-07_BUILD_STEPS", {
            steps: [
              { title: "Prepare sample data", instruction: "In your Google Sheet, add 10 sample texts: mix of billing complaints, technical issues, feature requests, and bug reports.", tip: "Write realistic examples: I can't log in, Charge me wrong amount, Can you add dark mode, The export button crashes my browser." },
              { title: "Create the scenario", instruction: "In Make.com, add Google Sheets > Watch Rows as the trigger. Select your Content Categorizer sheet.", tip: "This will process each new row as it is added to the sheet." },
              { title: "Add OpenAI classification", instruction: "Add OpenAI > Create a Chat Completion. Use this system message: You are a content classifier. Categorize the input into exactly one category: Billing, Technical, Feature_Request, Bug_Report, Account, Other. Respond in JSON: {\"category\": \"...\", \"confidence\": \"High/Medium/Low\", \"reason\": \"...\"}", tip: "Using JSON mode gives you structured output that is easy to parse. Set response_format to json_object." },
              { title: "Set the user message", instruction: "In the user message field, map the Input Text from the Google Sheet row.", tip: "Keep the user message simple — just the text to classify. All instructions go in the system message." },
              { title: "Parse the JSON response", instruction: "Add a JSON > Parse JSON module after OpenAI. Feed it the AI response text to extract category and confidence as separate fields.", tip: "If the AI occasionally returns invalid JSON, add an error handler that defaults to category: Other." },
              { title: "Update the Sheet", instruction: "Add Google Sheets > Update a Row. Map the parsed category to the Category column and confidence to the Confidence column.", tip: "Also add a Now() timestamp so you know when each item was classified." },
              { title: "Test with varied inputs", instruction: "Run the scenario and add different types of text. Check that the AI correctly classifies each one.", tip: "Pay attention to edge cases — messages that could fit multiple categories. The AI should pick the best one." },
              { title: "Add routing (optional)", instruction: "After classification, add a Router module. Create routes for each category that take different actions (e.g., Billing goes to Slack #billing, Technical goes to Jira).", tip: "This turns a simple categorizer into a full auto-routing system." }
            ]
          }),
          sec("AA-08_TEST", {
            checks: [
              { test: "Submit a clear billing complaint", expected: "Classified as Billing with High confidence" },
              { test: "Submit a technical support request", expected: "Classified as Technical with High confidence" },
              { test: "Submit an ambiguous message", expected: "Classified with Medium confidence and a reasonable reason" },
              { test: "Submit 10 different items at once", expected: "All 10 are classified correctly within a few minutes" },
              { test: "Check for consistency", expected: "Similar messages get the same category every time" }
            ]
          }),
          sec("AA-09_MISTAKES", {
            mistakes: [
              { mistake: "Having too many categories, making classification unreliable", fix: "Start with 4-6 clear, distinct categories. You can add more later once the base system works." },
              { mistake: "Not providing category definitions in the system prompt", fix: "Define what each category means. Example: Billing = anything about charges, invoices, refunds, payment methods." },
              { mistake: "Expecting 100% accuracy from AI classification", fix: "Target 90-95% accuracy. Add a confidence score and send Low confidence items to a human for review." },
              { mistake: "Not handling the Other category", fix: "Always include an Other/Unknown category as a catch-all. Review items in this category weekly to spot new patterns." },
              { mistake: "Using high temperature for classification", fix: "Set temperature to 0.1-0.2 for classification tasks. You want consistency, not creativity." },
              { mistake: "Ignoring the confidence score", fix: "Route low-confidence items to a human reviewer instead of blindly trusting the classification." }
            ]
          }),
          sec("AA-10_UPGRADE", {
            ideas: [
              "Add sub-categories: Technical > Login Issue, Technical > Performance, Technical > Data Loss",
              "Track classification accuracy by adding a Human Verified column and comparing weekly",
              "Use the classification to auto-assign priority: Bug Report = High, Feature Request = Low"
            ],
            challenge: "Build a multi-label classifier that can assign multiple tags to a single item (e.g., a message about a billing bug gets both Billing and Bug_Report tags)."
          }),
          sec("AA-11_MINI_TASK", {
            task: "Build the content categorizer in Make.com. Add 15 sample items to your Sheet covering all categories and verify the AI classifies at least 12 correctly.",
            deliverable: "Screenshot of the categorized Google Sheet showing all 15 items with their AI-assigned categories and confidence scores.",
            time: "25 minutes"
          }),
          sec("AA-12_MONEY_ANGLE", {
            service: "AI Ticket Routing System",
            price_range: "$600–$1,500 setup + $100/month maintenance",
            pitch: "Support teams waste hours manually sorting tickets. You build an AI system that instantly categorizes and routes every ticket to the right team, cutting response time in half."
          }),
          sec("AA-13_KEY_NOTES", {
            notes: [
              "AI content categorization replaces manual sorting with instant, consistent classification.",
              "Use JSON mode with clear category definitions in the system prompt for reliable output.",
              "Always include a confidence score and an Other category for edge cases.",
              "Set temperature to 0.1-0.2 for maximum consistency in classification tasks.",
              "Start with 4-6 categories and expand once you prove the system works accurately."
            ]
          }),
          sec("AA-14_QUICK_QUIZ", {
            questions: [
              { question: "Why should you use JSON mode for AI classification?", options: ["It is faster", "It gives structured, parseable output for your automation", "It is cheaper", "JSON mode is required by OpenAI"], correct: 1, explanation: "JSON mode ensures the AI returns data in a consistent, structured format that your automation can easily parse and use." },
              { question: "What temperature should you use for content classification?", options: ["0.9-1.0 for creativity", "0.1-0.2 for consistency", "0.5 for balance", "Temperature does not matter"], correct: 1, explanation: "Low temperature (0.1-0.2) minimizes randomness, so the same type of input gets the same classification every time." },
              { question: "What should you do with low-confidence classifications?", options: ["Delete them", "Route them to a human reviewer", "Classify them again with GPT-4", "Ignore the confidence score"], correct: 1, explanation: "Low confidence items should be reviewed by a human to ensure accuracy. This creates a feedback loop that improves the system over time." }
            ]
          })
        ]
      },

      /* ---------- M5-L4: Smart Lead Scoring with AI ---------- */
      {
        title: "Smart Lead Scoring with AI",
        slug: "ai-lead-scoring",
        goal: "Build an AI-powered lead scoring system that rates incoming leads so your sales team focuses on the ones most likely to buy.",
        summary: "You built a lead scorer that uses ChatGPT to analyze lead data and assign a score from 1-100. Hot leads get instant alerts, cold leads go to nurture sequences.",
        sections: [
          sec("AA-01_TODAYS_WIN", {
            headline: "You will build an AI that tells you which leads are worth calling first",
            description: "By the end of this lesson, every new lead in your CRM gets an AI-generated score and priority rating. Your sales team will know exactly who to call first."
          }),
          sec("AA-02_WHY_CARE", {
            benefit: "Sales teams waste 60% of their time on leads that will never buy. AI lead scoring surfaces the hottest leads instantly so effort goes where it matters.",
            real_example: "A B2B software company gets 50 demo requests per week. Their AI scorer analyzes company size, industry, budget signals, and message content. Leads scoring 80+ get a same-day call. Leads under 40 go into an email drip. Sales efficiency doubled."
          }),
          sec("AA-03_SIMPLE_MEANING", {
            term: "AI Lead Scoring",
            explanation: "Lead scoring assigns a number to each potential customer based on how likely they are to buy. AI lead scoring uses ChatGPT to analyze the lead's information and context to generate that score automatically.",
            analogy: "Think of a talent scout at a sports tryout. Instead of watching 100 players randomly, the scout quickly evaluates each player's stats and potential, then ranks them. Your AI does the same with leads."
          }),
          sec("AA-04_WHERE_USED", {
            examples: [
              { company: "HubSpot", use: "Built-in AI scoring analyzes engagement, demographics, and behavior to score leads automatically." },
              { company: "Salesforce Einstein", use: "Uses machine learning to predict which leads are most likely to convert based on historical patterns." },
              { company: "Digital agencies", use: "Score inbound inquiries by budget, timeline, and project scope to prioritize high-value clients." },
              { company: "Real estate", use: "AI scores buyer leads by location preferences, price range, and urgency signals from inquiry messages." }
            ]
          }),
          sec("AA-05_FLOW", {
            input: "A new lead submits a form: Name: Sarah Chen, Company: TechGrowth Inc (50 employees), Budget: $5K/month, Message: We need to automate our onboarding ASAP",
            steps: [
              "The lead data arrives via webhook or CRM trigger",
              "All lead fields are sent to ChatGPT with scoring criteria: company size, budget, urgency, fit",
              "ChatGPT returns a score (1-100), priority (Hot/Warm/Cold), and reasoning",
              "The automation writes the score back to the CRM and triggers the right follow-up action"
            ],
            output: "Lead scored 85/100 (Hot) — urgent need + good budget + right company size. Sales team gets an instant Slack alert."
          }),
          sec("AA-06_TOOL_SETUP", {
            items: [
              { tool: "Google Sheets (as CRM)", action: "Create a sheet called Lead Scoring with columns: Name, Company, Employees, Budget, Message, AI Score, Priority, Reasoning, Date." },
              { tool: "Make.com", action: "Open Make.com for building the lead scoring scenario." },
              { tool: "OpenAI API", action: "Use your existing API key with GPT-4o-mini." },
              { tool: "Slack (optional)", action: "If you want real-time alerts, connect a Slack workspace to Make.com." }
            ]
          }),
          sec("AA-07_BUILD_STEPS", {
            steps: [
              { title: "Design your scoring criteria", instruction: "Define what makes a good lead for your scenario. Example criteria: Company size (1-25 pts), Budget (1-25 pts), Urgency signals (1-25 pts), Product fit (1-25 pts).", tip: "Write these criteria down clearly. They become your AI prompt instructions." },
              { title: "Create the Sheet with sample leads", instruction: "Add 8-10 sample leads with varying quality: some with big budgets and urgency, some with no budget and vague interest.", tip: "Include a mix so you can verify the AI scores high-quality leads higher than low-quality ones." },
              { title: "Build the Make.com scenario", instruction: "Add Google Sheets > Watch Rows as the trigger to detect new leads.", tip: "Set the trigger to check frequently during testing." },
              { title: "Add the OpenAI scoring module", instruction: "Add OpenAI > Create a Chat Completion. System message: You are a lead scoring expert. Score each lead 1-100 based on: Company size (1-25), Budget (1-25), Urgency (1-25), Product fit (1-25). Return JSON: {\"score\": number, \"priority\": \"Hot/Warm/Cold\", \"reasoning\": \"...\"}. Hot = 70+, Warm = 40-69, Cold = under 40.", tip: "Include the scoring rubric in the system message so the AI applies it consistently." },
              { title: "Send lead data as user message", instruction: "Map all lead fields to the user message: Name: {{Name}}, Company: {{Company}}, Employees: {{Employees}}, Budget: {{Budget}}, Message: {{Message}}", tip: "The more data you send, the more accurate the scoring. Include everything available." },
              { title: "Parse and write results", instruction: "Add JSON parsing, then Google Sheets > Update a Row to write the score, priority, and reasoning back to the lead's row.", tip: "Use the reasoning field for transparency — your team can see why each lead got its score." },
              { title: "Add routing logic", instruction: "Add a Router after the scoring. Route Hot leads to a Slack alert, Warm leads to an email drip, and Cold leads to a low-priority list.", tip: "The router uses the priority field: if priority = Hot, go to Slack; if Warm, go to email; else, log only." },
              { title: "Test and calibrate", instruction: "Run all sample leads through the system. Check if the scores make sense. Adjust the criteria in the prompt if needed.", tip: "If the AI is scoring too high or low, adjust the rubric descriptions or add examples of what each score range looks like." }
            ]
          }),
          sec("AA-08_TEST", {
            checks: [
              { test: "Submit a high-quality lead (big company, high budget, urgent need)", expected: "Score 75-95, Priority: Hot, clear reasoning mentioning budget and urgency" },
              { test: "Submit a low-quality lead (solo freelancer, no budget, just browsing)", expected: "Score 10-35, Priority: Cold, reasoning notes lack of budget and urgency" },
              { test: "Submit a medium-quality lead", expected: "Score 45-65, Priority: Warm, balanced reasoning" },
              { test: "Submit 10 leads at once", expected: "All scored within a few minutes, scores are proportional to lead quality" },
              { test: "Verify Hot lead triggers Slack alert", expected: "Slack message appears within seconds with lead name, score, and reasoning" }
            ]
          }),
          sec("AA-09_MISTAKES", {
            mistakes: [
              { mistake: "Making the scoring criteria too vague", fix: "Be specific: instead of 'good company,' say '50+ employees in SaaS, fintech, or e-commerce = 20-25 points.'" },
              { mistake: "Not including example scores in the prompt", fix: "Add 2-3 example leads with expected scores so the AI calibrates to your standards." },
              { mistake: "Treating AI scores as absolute truth", fix: "Use AI scores as a first filter. Have your sales team validate Hot leads before investing major time." },
              { mistake: "Not accounting for missing data", fix: "Tell the AI how to handle missing fields: If budget is not provided, assume medium budget and deduct 5 points from the budget category." },
              { mistake: "Scoring based on message length instead of content", fix: "Include in the prompt: Score based on content quality and signals, not message length." },
              { mistake: "Forgetting to update scoring criteria as your business evolves", fix: "Review and update your scoring prompt monthly. What defined a hot lead 6 months ago may be different today." }
            ]
          }),
          sec("AA-10_UPGRADE", {
            ideas: [
              "Enrich leads with Clearbit or Hunter.io data before scoring for more accurate results",
              "Add a feedback loop: when a lead converts, log the original AI score to measure accuracy",
              "Create a scoring dashboard that shows score distribution and conversion rates",
              "Use historical conversion data to train the AI on what your actual best leads look like"
            ],
            challenge: "Build a two-stage scoring system: Stage 1 scores based on form data, Stage 2 enriches with company research (website visit) and rescores."
          }),
          sec("AA-11_MINI_TASK", {
            task: "Build the lead scoring automation and test it with 10 leads of varying quality. Verify that scores correlate with lead quality.",
            deliverable: "Screenshot of the Google Sheet with 10 leads, their AI scores, priorities, and reasoning. Highlight the highest and lowest scored leads.",
            time: "30 minutes"
          }),
          sec("AA-12_MONEY_ANGLE", {
            service: "AI Lead Scoring Setup for Sales Teams",
            price_range: "$800–$2,000 setup + $150/month maintenance",
            pitch: "Sales teams waste hours on bad leads. You build an AI system that scores every incoming lead in seconds, routes hot leads for immediate follow-up, and sends cold leads to automated nurture. Clients typically see 30-50% improvement in sales efficiency."
          }),
          sec("AA-13_KEY_NOTES", {
            notes: [
              "AI lead scoring automates the process of ranking leads by purchase likelihood.",
              "Define clear, weighted scoring criteria (company size, budget, urgency, fit) in your prompt.",
              "Always include the scoring rubric in the system message for consistent results.",
              "Use a feedback loop to track which scores actually converted — this improves accuracy over time.",
              "Hot leads should trigger instant alerts; cold leads go to automated nurture sequences."
            ]
          }),
          sec("AA-14_QUICK_QUIZ", {
            questions: [
              { question: "Why should you include scoring criteria in the AI system message?", options: ["To make the response longer", "So the AI applies consistent standards to every lead", "Because OpenAI requires it", "To reduce API costs"], correct: 1, explanation: "Including the rubric in the system message ensures every lead is scored against the same criteria, providing consistent and reliable results." },
              { question: "What should happen when a lead is scored as Hot (70+)?", options: ["Send to email drip", "Delete from the system", "Trigger an instant alert for the sales team", "Wait for more data"], correct: 2, explanation: "Hot leads have the highest conversion potential. An instant alert ensures the sales team reaches out quickly while the lead is still engaged." },
              { question: "How should the AI handle missing lead data?", options: ["Score the lead 0", "Skip the lead entirely", "Apply default assumptions and note the uncertainty", "Ask the lead for more info"], correct: 2, explanation: "The AI should have instructions for handling missing data — apply reasonable defaults and reduce the confidence or score slightly." }
            ]
          })
        ]
      },

      /* ---------- M5-L5: AI Image Description Generator ---------- */
      {
        title: "AI Image Description Generator",
        slug: "ai-image-descriptions",
        goal: "Build an automation that uses AI vision to generate descriptions for images so products, social posts, and content get alt text and captions automatically.",
        summary: "You built an image description generator using GPT-4o's vision capability. It generates alt text, product descriptions, and social captions from any image URL.",
        sections: [
          sec("AA-01_TODAYS_WIN", {
            headline: "Your automation will look at images and describe what it sees",
            description: "Today you build an automation that takes an image URL, sends it to GPT-4o's vision API, and gets back a detailed description — perfect for alt text, product listings, and social media captions."
          }),
          sec("AA-02_WHY_CARE", {
            benefit: "E-commerce stores have thousands of product images that need descriptions. Social media managers need captions for every post. Doing it manually is tedious. AI vision does it in seconds.",
            real_example: "An online clothing store uploads 50 new products weekly. Instead of writing descriptions for each photo, an automation sends each image to GPT-4o and generates a product description, alt text, and three hashtag suggestions. What took 5 hours now takes 10 minutes."
          }),
          sec("AA-03_SIMPLE_MEANING", {
            term: "AI Vision API",
            explanation: "AI vision lets you send an image to ChatGPT and ask questions about it. The AI can describe what it sees, read text in images, identify objects, and generate captions. It works by sending the image URL in your API call.",
            analogy: "It is like showing a photo to a friend and asking what do you see? Except your friend is an AI that can describe any image in detail, and it never gets bored or tired."
          }),
          sec("AA-04_WHERE_USED", {
            examples: [
              { company: "Shopify stores", use: "Auto-generate product descriptions and alt text from product photos for SEO and accessibility." },
              { company: "Pinterest", use: "Uses AI vision to understand what is in each pin for better search results and recommendations." },
              { company: "Insurance companies", use: "AI analyzes photos of car damage to estimate repair costs and generate claim descriptions." },
              { company: "Accessibility tools", use: "Generate descriptive alt text for images on websites so screen readers can describe them to visually impaired users." }
            ]
          }),
          sec("AA-05_FLOW", {
            input: "A new product image URL is added to a Google Sheet",
            steps: [
              "Make.com detects the new row with the image URL",
              "The image URL is sent to GPT-4o's vision API with a prompt: Describe this product image for an e-commerce listing",
              "GPT-4o analyzes the image and returns a description, alt text, and suggested tags",
              "Make.com writes the AI-generated text back to the Sheet columns"
            ],
            output: "The product now has a professional description, alt text, and tags — all generated from the photo"
          }),
          sec("AA-06_TOOL_SETUP", {
            items: [
              { tool: "Google Sheets", action: "Create a sheet called Image Descriptions with columns: Image URL, Product Name, AI Description, Alt Text, Tags, Status." },
              { tool: "Sample images", action: "Find 5-10 product image URLs online (use Unsplash or any e-commerce site). Paste the direct image URLs into your Sheet." },
              { tool: "Make.com", action: "Open Make.com. You will use the OpenAI module with the vision-capable model." },
              { tool: "OpenAI API", action: "Make sure your API key has access to GPT-4o (the vision model). Check at platform.openai.com." }
            ]
          }),
          sec("AA-07_BUILD_STEPS", {
            steps: [
              { title: "Prepare the image Sheet", instruction: "Add 5 product image URLs to your Google Sheet. Include a mix: clothing, electronics, food, furniture.", tip: "Use direct image URLs that end in .jpg or .png. Right-click any product image online and copy image address." },
              { title: "Create the Make.com scenario", instruction: "Add Google Sheets > Watch Rows as the trigger. Select your Image Descriptions sheet.", tip: "The scenario will process each new row with an image URL." },
              { title: "Add the OpenAI vision module", instruction: "Add OpenAI > Create a Chat Completion. Select the gpt-4o model. In the messages, add a user message with type image_url.", tip: "In Make.com's OpenAI module, you can add image content by selecting the image_url type in the message content array." },
              { title: "Write the prompt", instruction: "System message: You are a product copywriter. For each image, provide: 1) A 2-sentence product description for an e-commerce listing, 2) Alt text (under 125 characters) for accessibility, 3) Five relevant tags. Return JSON: {\"description\": \"...\", \"alt_text\": \"...\", \"tags\": [\"...\"]}", tip: "JSON format makes it easy to parse and map to your Sheet columns." },
              { title: "Map the image URL", instruction: "In the user message content, add an image_url item and map the Image URL field from Google Sheets.", tip: "Make sure the URL is a direct link to an image file. URLs to web pages with images will not work." },
              { title: "Parse and save results", instruction: "Add a JSON parser module, then Google Sheets > Update a Row to write description, alt_text, and tags to the correct columns.", tip: "Join the tags array with commas before writing to the Sheet: use the join() function in Make.com." },
              { title: "Test with diverse images", instruction: "Run the scenario and check each generated description against the actual image.", tip: "The AI should describe colors, materials, style, and key features visible in the image." }
            ]
          }),
          sec("AA-08_TEST", {
            checks: [
              { test: "Process a clothing product image", expected: "Description mentions the garment type, color, and style. Alt text is concise and under 125 characters." },
              { test: "Process an electronics product image", expected: "Description highlights key features and form factor. Tags include relevant product keywords." },
              { test: "Process a food/beverage image", expected: "Description captures presentation, ingredients, and appeal. Tags include food-related keywords." },
              { test: "Send an invalid URL", expected: "The scenario handles the error gracefully — logs an error status instead of crashing." },
              { test: "Check alt text length", expected: "All alt texts are under 125 characters (accessibility best practice)." }
            ]
          }),
          sec("AA-09_MISTAKES", {
            mistakes: [
              { mistake: "Using a web page URL instead of a direct image URL", fix: "The URL must point directly to an image file (.jpg, .png, .webp). Not a product page." },
              { mistake: "Not specifying alt text length constraints", fix: "Always tell the AI: alt text must be under 125 characters. Otherwise it writes paragraphs." },
              { mistake: "Generating descriptions that are too generic", fix: "Add context to the prompt: include the product name or category so descriptions are specific." },
              { mistake: "Using GPT-3.5 which does not support vision", fix: "Vision requires GPT-4o or GPT-4-turbo. Make sure you select the right model." },
              { mistake: "Not handling rate limits when processing many images", fix: "Add a delay between requests (1-2 seconds) to avoid hitting OpenAI rate limits." },
              { mistake: "Trusting AI descriptions without review for important content", fix: "AI can misidentify details. For product listings, have a human review AI-generated descriptions before publishing." }
            ]
          }),
          sec("AA-10_UPGRADE", {
            ideas: [
              "Add multi-language support: generate descriptions in English, Spanish, and French",
              "Compare multiple product images side by side and generate comparison descriptions",
              "Auto-post the generated descriptions to Shopify or WooCommerce product listings",
              "Generate social media captions with hashtags from product images"
            ],
            challenge: "Build a pipeline that takes a product image, generates an e-commerce description, creates three social media captions (Instagram, Twitter, LinkedIn), and saves all of them to a Sheet."
          }),
          sec("AA-11_MINI_TASK", {
            task: "Build the image description generator and process at least 5 different product images. Verify each description accurately reflects the image content.",
            deliverable: "Screenshot of the Google Sheet with 5 images processed, showing the AI-generated descriptions, alt text, and tags for each.",
            time: "25 minutes"
          }),
          sec("AA-12_MONEY_ANGLE", {
            service: "AI Product Description Generator",
            price_range: "$500–$1,500 setup + $100/month for ongoing processing",
            pitch: "E-commerce stores with hundreds of products need descriptions, alt text, and SEO tags for every image. You build an automation that generates all of this from product photos — saving hours of copywriting per week."
          }),
          sec("AA-13_KEY_NOTES", {
            notes: [
              "GPT-4o can analyze images and generate descriptions, alt text, tags, and captions.",
              "Always use direct image URLs (ending in .jpg, .png, etc.), not web page URLs.",
              "Constrain alt text to 125 characters for accessibility compliance.",
              "Add product context (name, category) to prompts for more specific descriptions.",
              "Vision API calls cost more than text-only calls — batch process during off-peak hours to manage costs."
            ]
          }),
          sec("AA-14_QUICK_QUIZ", {
            questions: [
              { question: "Which OpenAI model supports image analysis?", options: ["GPT-3.5-turbo", "GPT-4o-mini (text only)", "GPT-4o", "DALL-E"], correct: 2, explanation: "GPT-4o has vision capabilities that let it analyze images. DALL-E generates images but does not analyze them." },
              { question: "What is the recommended maximum length for alt text?", options: ["50 characters", "125 characters", "500 characters", "No limit"], correct: 1, explanation: "Web accessibility guidelines recommend alt text under 125 characters so screen readers can convey the description quickly." },
              { question: "Why should you add product context to the vision prompt?", options: ["To reduce API costs", "So the AI generates more specific and relevant descriptions", "Because the API requires it", "To make the image load faster"], correct: 1, explanation: "Providing context like product name and category helps the AI write descriptions tailored to the specific listing rather than generic observations." }
            ]
          })
        ]
      }
    ]
  },

  /* ================================================================
     MODULE 6 — Real Business Automations
     ================================================================ */
  {
    title: "Real Business Automations",
    slug: "m6-business-automations",
    lessons: [
      /* ---------- M6-L1: Client Onboarding Automation ---------- */
      {
        title: "Client Onboarding Automation",
        slug: "client-onboarding",
        goal: "Build a complete client onboarding automation that sends welcome emails, creates project folders, and assigns tasks — all triggered when a new client signs up.",
        summary: "You built an end-to-end onboarding system that runs automatically when a new client is added. It sends a welcome email, creates folders, generates a contract, and notifies the team.",
        sections: [
          sec("AA-01_TODAYS_WIN", {
            headline: "You will automate the entire client onboarding process",
            description: "Today you build a system where adding a client's name and email triggers a full onboarding sequence: welcome email, Google Drive folder, task assignments, and team notification."
          }),
          sec("AA-02_WHY_CARE", {
            benefit: "Manual onboarding is slow, inconsistent, and forgettable. Automated onboarding runs the same perfect sequence for every client, making your business look professional and saving hours per client.",
            real_example: "A web design agency signs 8 clients per month. Before automation, onboarding took 2 hours per client (emails, folder creation, Trello setup). After: adding the client to a Sheet triggers everything automatically in under 30 seconds."
          }),
          sec("AA-03_SIMPLE_MEANING", {
            term: "Client Onboarding Automation",
            explanation: "Client onboarding automation is a workflow that runs all the setup steps for a new client without any manual work. You trigger it once, and everything happens: emails, folders, tasks, documents.",
            analogy: "It is like checking into a hotel. You give your name at the front desk (the trigger), and everything is ready: room key, towels, minibar, wake-up call. One action sets off a whole chain of preparations."
          }),
          sec("AA-04_WHERE_USED", {
            examples: [
              { company: "Freelance agencies", use: "Automate welcome emails, contract generation, and project folder creation for every new client." },
              { company: "SaaS companies", use: "New user sign-up triggers account setup, welcome drip emails, and in-app onboarding tasks." },
              { company: "Law firms", use: "New client intake triggers case folder creation, team assignment, and document request emails." },
              { company: "Marketing agencies", use: "New client triggers brand questionnaire, shared drive folder, Slack channel creation, and kickoff meeting scheduling." }
            ]
          }),
          sec("AA-05_FLOW", {
            input: "A new client row is added to the Clients Google Sheet: Name, Email, Package, Start Date",
            steps: [
              "Make.com detects the new row and reads the client details",
              "A personalized welcome email is sent to the client with next steps",
              "A Google Drive folder is created with the client's name, containing subfolders for Contracts, Assets, and Deliverables",
              "A task is created in your project management tool with the client's onboarding checklist"
            ],
            output: "The client receives a professional welcome email, their project folder is ready, and your team has tasks assigned — all within seconds"
          }),
          sec("AA-06_TOOL_SETUP", {
            items: [
              { tool: "Google Sheets", action: "Create a sheet called Client Onboarding with columns: Client Name, Email, Package, Start Date, Status, Folder Link, Welcome Sent." },
              { tool: "Gmail", action: "Connect your Gmail to Make.com for sending welcome emails." },
              { tool: "Google Drive", action: "Create a parent folder called Clients in Google Drive. The automation will create subfolders inside it." },
              { tool: "Make.com", action: "Open Make.com. This scenario will have 4-5 modules chained together." },
              { tool: "Trello or Notion (optional)", action: "If you want task creation, connect Trello or Notion. Otherwise, skip this step." }
            ]
          }),
          sec("AA-07_BUILD_STEPS", {
            steps: [
              { title: "Set up the Google Sheet", instruction: "Create the Client Onboarding sheet with all columns. Add a test client: John Doe, john@example.com, Pro Package, 2025-02-01.", tip: "Leave Status as New and Welcome Sent as empty. The automation will update these." },
              { title: "Create the Make.com trigger", instruction: "New scenario > Google Sheets > Watch Rows. Select your Client Onboarding sheet. Set to trigger on new rows.", tip: "Test the trigger by adding a new row and clicking Run once." },
              { title: "Add the welcome email", instruction: "Add Gmail > Send an Email. To: {{Email}}. Subject: Welcome to [Your Company], {{Client Name}}! Body: Write a warm welcome message with next steps, what to expect, and a link to book a kickoff call.", tip: "Use HTML formatting in the email for a professional look. Include the client's name and package details." },
              { title: "Create the Google Drive folder", instruction: "Add Google Drive > Create a Folder. Name: {{Client Name}} - {{Package}}. Parent folder: your Clients folder. Then add three more Create a Folder modules for subfolders: Contracts, Assets, Deliverables inside the client folder.", tip: "Save the folder URL from the first module — you will write it back to the Sheet." },
              { title: "Update the Sheet", instruction: "Add Google Sheets > Update a Row. Set Status to Onboarded, Welcome Sent to Yes, Folder Link to the Google Drive folder URL.", tip: "This creates a clear record that onboarding is complete for each client." },
              { title: "Add team notification", instruction: "Add a Slack module (or another email) to notify your team: New client onboarded: {{Client Name}} ({{Package}}). Folder: {{Folder Link}}.", tip: "Include the folder link in the Slack message so the team can access it immediately." },
              { title: "Test the full flow", instruction: "Add a new test client to the Sheet and run the scenario. Check: email received, folder created with subfolders, Sheet updated, team notified.", tip: "Check each step individually. If one fails, the error log in Make.com will tell you exactly which module had the issue." },
              { title: "Activate the scenario", instruction: "Toggle the scenario ON and set it to run immediately. Add 2-3 more test clients to verify it handles multiple clients.", tip: "Monitor the first few real clients closely. Once you trust it, let it run on its own." }
            ]
          }),
          sec("AA-08_TEST", {
            checks: [
              { test: "Add a new client to the Sheet", expected: "Welcome email arrives within 1 minute with the correct name and package" },
              { test: "Check Google Drive", expected: "A new folder exists with the client's name and three subfolders" },
              { test: "Check the Sheet updates", expected: "Status = Onboarded, Welcome Sent = Yes, Folder Link is a valid Google Drive URL" },
              { test: "Check Slack/email notification", expected: "Team receives a notification with client name, package, and folder link" },
              { test: "Add a second client immediately", expected: "Both clients are processed independently without conflicts" }
            ]
          }),
          sec("AA-09_MISTAKES", {
            mistakes: [
              { mistake: "Not creating the parent Clients folder in Drive first", fix: "The automation needs a parent folder to create subfolders in. Create it manually once before running." },
              { mistake: "Sending the welcome email before the folder is ready", fix: "Order your modules correctly: create the folder first, then include its link in the welcome email." },
              { mistake: "Not handling duplicate client names", fix: "Append the start date or a unique ID to folder names: John Doe - 2025-02 to avoid conflicts." },
              { mistake: "Hardcoding your company name in the email template", fix: "Store company details in a Make.com variable or a separate settings sheet for easy updates." },
              { mistake: "Forgetting to update the Sheet status", fix: "Always update the Sheet as the last step. This is your record of what has been processed." },
              { mistake: "Not testing with a real email address you can check", fix: "Use your own email as the test client first. Only switch to test@example.com after confirming the email looks right." }
            ]
          }),
          sec("AA-10_UPGRADE", {
            ideas: [
              "Generate a PDF welcome packet or contract using a template and attach it to the email",
              "Auto-create a Slack channel for each client and invite relevant team members",
              "Schedule a kickoff call automatically using Calendly's API",
              "Add a 7-day follow-up email sequence triggered by the onboarding date"
            ],
            challenge: "Extend the automation to generate a customized welcome PDF (using a Google Docs template), attach it to the welcome email, and save a copy in the client's Google Drive folder."
          }),
          sec("AA-11_MINI_TASK", {
            task: "Build the full client onboarding automation. Test it with 3 fake clients and verify every step works: email, folder, Sheet update, notification.",
            deliverable: "Screenshot of the Make.com scenario, the updated Google Sheet with 3 onboarded clients, and the Google Drive showing 3 client folders with subfolders.",
            time: "35 minutes"
          }),
          sec("AA-12_MONEY_ANGLE", {
            service: "Automated Client Onboarding System",
            price_range: "$600–$1,800 setup",
            pitch: "Agencies, consultancies, and service businesses spend hours onboarding each client manually. You build a one-click system that sends the welcome email, creates project folders, assigns tasks, and notifies the team — all in under 30 seconds."
          }),
          sec("AA-13_KEY_NOTES", {
            notes: [
              "Client onboarding automation ensures every client gets the same professional experience.",
              "Order matters: create folders before sending emails so you can include folder links.",
              "Always update a status column in your Sheet to track which clients have been processed.",
              "Add team notifications so everyone knows when a new client arrives and where to find their files.",
              "This automation template can be customized for any service business — agencies, consultants, law firms, accountants."
            ]
          }),
          sec("AA-14_QUICK_QUIZ", {
            questions: [
              { question: "What should happen first in the onboarding sequence?", options: ["Send the welcome email", "Create the Google Drive folder", "Notify the team on Slack", "Update the Sheet status"], correct: 1, explanation: "Create the folder first so you can include the folder link in the welcome email and team notification." },
              { question: "Why should you update a Status column in the Sheet?", options: ["To track API costs", "To know which clients have been processed and avoid duplicates", "Because Make.com requires it", "To improve email delivery"], correct: 1, explanation: "The Status column is your record of processed clients. It prevents re-processing and lets you quickly see who has been onboarded." },
              { question: "What is the best way to handle two clients with the same name?", options: ["Delete one of them", "Append a unique identifier like date or ID to the folder name", "Skip the duplicate", "Use first names only"], correct: 1, explanation: "Adding a date or unique ID ensures each client gets their own folder even if names match." }
            ]
          })
        ]
      },

      /* ---------- M6-L2: Invoice and Payment Reminders ---------- */
      {
        title: "Invoice and Payment Reminders",
        slug: "invoice-payment-reminders",
        goal: "Build an automation that sends payment reminders on schedule so you get paid on time without awkward follow-up emails.",
        summary: "You built a payment reminder system that tracks invoice due dates and sends polite, escalating reminders automatically. No more chasing payments manually.",
        sections: [
          sec("AA-01_TODAYS_WIN", {
            headline: "You will never have to manually chase a late payment again",
            description: "Today you build a system that tracks every invoice and automatically sends friendly reminders at 3 days before, on due date, and 7 days late — all without you lifting a finger."
          }),
          sec("AA-02_WHY_CARE", {
            benefit: "Late payments are the number one cash flow killer for freelancers and small businesses. Automated reminders are polite, consistent, and they work — businesses using them get paid 2 weeks faster on average.",
            real_example: "A freelance designer used to spend 3 hours per week writing payment follow-up emails. She built an automated reminder sequence that sends at 3 days before, due date, 3 days late, and 7 days late. Her average payment time dropped from 45 days to 18 days."
          }),
          sec("AA-03_SIMPLE_MEANING", {
            term: "Payment Reminder Automation",
            explanation: "A payment reminder automation tracks your invoices and their due dates, then sends email reminders on a schedule you define. It escalates the tone from friendly to firm as the payment gets later.",
            analogy: "It is like a polite personal assistant who keeps track of who owes you money. They send a gentle reminder before the due date, a nudge on the due date, and a firmer follow-up if it is overdue."
          }),
          sec("AA-04_WHERE_USED", {
            examples: [
              { company: "QuickBooks", use: "Auto-sends payment reminders for overdue invoices based on customizable schedules." },
              { company: "Freelancers", use: "Use Zapier or Make.com to send automated reminders when invoices in Stripe or PayPal go past due." },
              { company: "Landlords", use: "Automate rent reminders 5 days before, on due date, and escalating notices for late payments." },
              { company: "SaaS companies", use: "Send automated billing failure notifications and payment retry reminders to reduce churn." }
            ]
          }),
          sec("AA-05_FLOW", {
            input: "An invoice in your Sheet is approaching its due date",
            steps: [
              "Make.com runs daily and checks all invoices with Status = Unpaid",
              "For each unpaid invoice, it calculates the days until or since the due date",
              "Based on the timing, it selects the right email template: upcoming, due today, or overdue",
              "It sends the email and updates the Last Reminder column in the Sheet"
            ],
            output: "The client receives a timely, professional payment reminder and you have a clear record of all reminders sent"
          }),
          sec("AA-06_TOOL_SETUP", {
            items: [
              { tool: "Google Sheets", action: "Create a sheet called Invoices with columns: Client Name, Email, Invoice Number, Amount, Due Date, Status, Last Reminder, Reminder Count." },
              { tool: "Gmail", action: "Connect Gmail to Make.com for sending reminder emails." },
              { tool: "Make.com", action: "Open Make.com. This scenario will run on a daily schedule." }
            ]
          }),
          sec("AA-07_BUILD_STEPS", {
            steps: [
              { title: "Set up the invoice Sheet", instruction: "Create the Invoices sheet and add 5 test invoices: 2 due in 3 days, 1 due today, 1 overdue by 3 days, 1 overdue by 8 days. Set all Status to Unpaid.", tip: "Use real dates relative to today so the automation triggers correctly." },
              { title: "Create a scheduled scenario", instruction: "In Make.com, create a new scenario. Instead of a webhook trigger, choose Schedule. Set it to run once daily at 9:00 AM.", tip: "Daily scheduling ensures reminders go out every morning without manual triggering." },
              { title: "Search for unpaid invoices", instruction: "Add Google Sheets > Search Rows. Filter for rows where Status = Unpaid.", tip: "This returns all unpaid invoices. The next step will check which ones need reminders today." },
              { title: "Add date logic", instruction: "Add a Router module with three routes. Route 1: Due date is 3 days away (upcoming). Route 2: Due date is today. Route 3: Due date is in the past (overdue).", tip: "Use Make.com's date functions: formatDate, addDays, and dateDifference to calculate timing." },
              { title: "Create email templates", instruction: "For each route, add a Gmail > Send Email module. Upcoming: Hey {{Client Name}}, friendly reminder that invoice {{Invoice Number}} for {{Amount}} is due on {{Due Date}}. Due today: Invoice {{Invoice Number}} is due today. Overdue: Invoice {{Invoice Number}} is now overdue by X days. Please process payment.", tip: "Keep the tone friendly but clear. Include payment instructions or a link in every email." },
              { title: "Update reminder tracking", instruction: "After each email, add Google Sheets > Update a Row. Set Last Reminder to today's date and increment Reminder Count by 1.", tip: "This prevents sending duplicate reminders and lets you track how many times each client has been reminded." },
              { title: "Add an overdue escalation", instruction: "For invoices overdue by 14+ days, add a separate route that sends a firmer email or creates a task for you to call the client directly.", tip: "At some point, automation should hand off to a human. 14 days overdue is a good threshold." },
              { title: "Test all scenarios", instruction: "Run the scenario manually and verify: upcoming invoices get a gentle reminder, due-today invoices get a nudge, and overdue invoices get a firm reminder.", tip: "Check the Sheet after each run — Last Reminder and Reminder Count should be updated." }
            ]
          }),
          sec("AA-08_TEST", {
            checks: [
              { test: "Invoice due in 3 days", expected: "Friendly upcoming reminder email sent with correct amount and due date" },
              { test: "Invoice due today", expected: "Due-today email sent with a polite urgency tone" },
              { test: "Invoice overdue by 7 days", expected: "Overdue email sent with firm but professional language" },
              { test: "Already-paid invoice", expected: "Status = Paid invoices are skipped — no reminder sent" },
              { test: "Check reminder tracking", expected: "Last Reminder and Reminder Count are updated in the Sheet" }
            ]
          }),
          sec("AA-09_MISTAKES", {
            mistakes: [
              { mistake: "Sending reminders for already-paid invoices", fix: "Always filter by Status = Unpaid. Update status immediately when payment is received." },
              { mistake: "Sending multiple reminders on the same day", fix: "Check Last Reminder date before sending. If it is today, skip the reminder." },
              { mistake: "Using aggressive language in early reminders", fix: "Start friendly and escalate gradually. The first reminder should feel helpful, not demanding." },
              { mistake: "Not including payment instructions in the email", fix: "Every reminder should include how to pay: bank details, payment link, or invoice portal URL." },
              { mistake: "Forgetting to stop reminders after payment", fix: "Mark invoices as Paid when payment is received. Add a filter that only processes Unpaid invoices." },
              { mistake: "Running the schedule too frequently", fix: "Once daily at 9 AM is enough. Hourly reminders annoy clients and can damage relationships." }
            ]
          }),
          sec("AA-10_UPGRADE", {
            ideas: [
              "Auto-detect payments via Stripe webhooks and update invoice status automatically",
              "Add late fees calculation for overdue invoices and include in the reminder",
              "Create a dashboard Sheet that shows total outstanding, upcoming, and overdue amounts",
              "Send yourself a weekly summary of all unpaid invoices"
            ],
            challenge: "Connect the invoice tracker to Stripe: when a payment is received via Stripe webhook, automatically mark the invoice as Paid and stop future reminders."
          }),
          sec("AA-11_MINI_TASK", {
            task: "Build the invoice reminder automation with 3 email templates (upcoming, due today, overdue). Test with 5 invoices at different stages.",
            deliverable: "Screenshot of the Make.com scenario, the Invoices Sheet with reminder tracking columns updated, and sample emails for each reminder type.",
            time: "30 minutes"
          }),
          sec("AA-12_MONEY_ANGLE", {
            service: "Automated Invoice Reminder System",
            price_range: "$400–$1,000 setup",
            pitch: "Freelancers and agencies lose thousands to late payments. You build a system that sends professional reminders on schedule, tracks reminder history, and escalates overdue invoices. Clients typically recover 20-40% more on-time payments."
          }),
          sec("AA-13_KEY_NOTES", {
            notes: [
              "Automated payment reminders improve cash flow by getting invoices paid 2-3 weeks faster.",
              "Use a scheduled daily trigger instead of manual runs for consistent, reliable reminders.",
              "Escalate tone gradually: friendly reminder → due today nudge → overdue follow-up → human handoff.",
              "Track every reminder sent in the Sheet (date and count) to avoid duplicates and monitor persistence.",
              "Always include clear payment instructions in every reminder email."
            ]
          }),
          sec("AA-14_QUICK_QUIZ", {
            questions: [
              { question: "How often should the payment reminder scenario run?", options: ["Every hour", "Once daily", "Once weekly", "Only when manually triggered"], correct: 1, explanation: "Daily at a set time (like 9 AM) is the sweet spot — frequent enough to catch due dates but not so frequent that it spams clients." },
              { question: "What should you do before sending a reminder?", options: ["Check if the invoice is already paid", "Send a test email first", "Wait 24 hours", "Check the weather"], correct: 0, explanation: "Always filter for Unpaid status before sending reminders. Reminding someone about a paid invoice is unprofessional." }
            ]
          })
        ]
      },

      /* ---------- M6-L3: Social Media Auto-Poster ---------- */
      {
        title: "Social Media Auto-Poster",
        slug: "social-media-poster",
        goal: "Build an automation that takes your content from a spreadsheet and posts it to social media on schedule so you never miss a posting day.",
        summary: "You built a social media auto-poster that reads scheduled posts from a Google Sheet and publishes them to Twitter/X and LinkedIn at the right time.",
        sections: [
          sec("AA-01_TODAYS_WIN", {
            headline: "Your social media will post itself from a simple spreadsheet",
            description: "Today you create a content calendar in Google Sheets and an automation that reads it daily and posts your content to social media at the scheduled time."
          }),
          sec("AA-02_WHY_CARE", {
            benefit: "Consistent social media posting is the number one growth factor for personal brands and businesses. But remembering to post daily is hard. Automating it means you batch-create content once and it posts all week.",
            real_example: "A startup founder writes 10 LinkedIn posts every Sunday. She puts them in a Google Sheet with scheduled dates. Make.com posts one each morning at 8 AM. Her LinkedIn grew from 2K to 15K followers in 6 months — all from automated consistency."
          }),
          sec("AA-03_SIMPLE_MEANING", {
            term: "Social Media Auto-Poster",
            explanation: "A social media auto-poster is an automation that takes pre-written content and publishes it to platforms like Twitter, LinkedIn, or Instagram at scheduled times. You write in advance, the robot posts on time.",
            analogy: "It is like a newspaper delivery system. You write the articles (content), set the delivery schedule (dates), and the system delivers them to every doorstep (social platform) on time."
          }),
          sec("AA-04_WHERE_USED", {
            examples: [
              { company: "Buffer", use: "Schedules and auto-posts content across multiple social platforms from a single dashboard." },
              { company: "Content creators", use: "Use Zapier or Make.com to auto-post from a spreadsheet content calendar to Twitter and LinkedIn." },
              { company: "Agencies", use: "Manage 10+ client social accounts with automated posting from shared content spreadsheets." },
              { company: "E-commerce brands", use: "Auto-post product launches, sales, and user-generated content based on a scheduled content calendar." }
            ]
          }),
          sec("AA-05_FLOW", {
            input: "A row in the content calendar has today's date and a post marked as Ready",
            steps: [
              "Make.com runs daily at 8 AM and searches the Sheet for posts with today's date and status Ready",
              "For each matching post, it reads the content, platform, and any image URL",
              "It sends the content to the appropriate platform API (Twitter, LinkedIn, etc.)",
              "The Sheet row is updated with Status = Posted and the live post URL"
            ],
            output: "Your social media post goes live at 8 AM without you touching your phone"
          }),
          sec("AA-06_TOOL_SETUP", {
            items: [
              { tool: "Google Sheets", action: "Create a sheet called Content Calendar with columns: Date, Platform, Content, Image URL, Status, Post URL." },
              { tool: "Twitter/X Developer Account", action: "Apply for a developer account at developer.twitter.com. Create a project and get API keys with read/write access." },
              { tool: "LinkedIn (via Make.com)", action: "Make.com has a LinkedIn module that handles OAuth. You will connect your LinkedIn account directly." },
              { tool: "Make.com", action: "Open Make.com. This scenario uses a scheduled trigger." }
            ]
          }),
          sec("AA-07_BUILD_STEPS", {
            steps: [
              { title: "Create your content calendar", instruction: "Add 5-7 posts to your Google Sheet. Set dates for the next 7 days. Mix platforms: some Twitter, some LinkedIn. Set all Status to Ready.", tip: "Keep Twitter posts under 280 characters. LinkedIn posts can be longer — aim for 150-300 words with line breaks." },
              { title: "Create the Make.com scenario", instruction: "Add a Schedule trigger set to run daily at 8:00 AM. Then add Google Sheets > Search Rows with filters: Date = today AND Status = Ready.", tip: "Use Make.com's formatDate(now, 'YYYY-MM-DD') to match today's date in the Sheet." },
              { title: "Add a Router for platforms", instruction: "After the search, add a Router. Create one route for Twitter and one for LinkedIn. Set each route's filter to check the Platform column.", tip: "This lets you handle each platform differently since they have different APIs and content requirements." },
              { title: "Set up Twitter posting", instruction: "On the Twitter route, add the Twitter > Create a Tweet module. Connect your Twitter developer account and map the Content field to the tweet text.", tip: "If the post includes an Image URL, add a media upload step before the tweet creation." },
              { title: "Set up LinkedIn posting", instruction: "On the LinkedIn route, add LinkedIn > Create a Post module. Connect your LinkedIn account and map the Content field.", tip: "LinkedIn posts with line breaks and emojis get more engagement. Format accordingly in your Sheet." },
              { title: "Update post status", instruction: "After each platform module, add Google Sheets > Update a Row. Set Status to Posted and write the returned post URL into the Post URL column.", tip: "The post URL lets you track performance later by clicking directly to the live post." },
              { title: "Test with one post", instruction: "Add a test post to the Sheet with today's date. Run the scenario once and check if it appears on the platform.", tip: "Test with a non-embarrassing post like Testing my auto-poster — please ignore! You can delete it after." }
            ]
          }),
          sec("AA-08_TEST", {
            checks: [
              { test: "Add a Twitter post with today's date", expected: "Tweet appears on your Twitter profile within 1 minute of scenario running" },
              { test: "Add a LinkedIn post with today's date", expected: "Post appears on your LinkedIn feed with correct content" },
              { test: "Add a post with a future date", expected: "The post is NOT published — only today's posts are processed" },
              { test: "Add a post already marked as Posted", expected: "The post is skipped — only Ready posts are processed" },
              { test: "Check the Sheet after running", expected: "Status changed to Posted and Post URL column has a valid link" }
            ]
          }),
          sec("AA-09_MISTAKES", {
            mistakes: [
              { mistake: "Posting the same content to Twitter and LinkedIn without adapting it", fix: "Twitter needs short, punchy text. LinkedIn works better with storytelling and longer format. Write platform-specific versions." },
              { mistake: "Not checking character limits before posting", fix: "Twitter is 280 characters max. Add a validation step that flags posts over the limit." },
              { mistake: "Forgetting to handle Twitter API rate limits", fix: "Twitter limits to 1,500 tweets per month on free tier. Monitor usage and add delays between posts." },
              { mistake: "Posting without images when images boost engagement", fix: "Add an Image URL column and a media upload step. Posts with images get 2-3x more engagement." },
              { mistake: "Not including a Post URL column for tracking", fix: "Always save the returned post URL. It is essential for tracking performance and fixing issues." },
              { mistake: "Running the schedule at midnight when nobody is online", fix: "Post during peak engagement hours: 8-9 AM or 12-1 PM in your audience's timezone." }
            ]
          }),
          sec("AA-10_UPGRADE", {
            ideas: [
              "Add AI content generation: use ChatGPT to generate tweet variations from a single topic",
              "Add image generation with DALL-E for posts that need visuals",
              "Track engagement by pulling like and comment counts back into the Sheet",
              "Add Instagram posting via Facebook Graph API"
            ],
            challenge: "Build a system where you write one long-form LinkedIn post, and the automation uses ChatGPT to generate 5 tweet-sized variations and schedules them throughout the week."
          }),
          sec("AA-11_MINI_TASK", {
            task: "Build the social media auto-poster and schedule 5 posts across the next 5 days. Verify at least 1 post publishes live today.",
            deliverable: "Screenshot of the content calendar Sheet, the Make.com scenario, and a live post on Twitter or LinkedIn.",
            time: "30 minutes"
          }),
          sec("AA-12_MONEY_ANGLE", {
            service: "Social Media Automation Setup",
            price_range: "$400–$1,200 per client setup + $200/month management",
            pitch: "Small businesses and creators struggle with consistent posting. You build an auto-posting system from a simple spreadsheet, train the client to fill it in, and charge monthly to maintain and optimize it."
          }),
          sec("AA-13_KEY_NOTES", {
            notes: [
              "Social media auto-posting turns a spreadsheet content calendar into a hands-free publishing system.",
              "Use a daily scheduled trigger and filter for today's date and Status = Ready.",
              "Write platform-specific content — what works on LinkedIn does not work on Twitter.",
              "Always save the post URL back to your Sheet for performance tracking.",
              "Post during peak engagement hours (8-9 AM or 12-1 PM) for maximum reach."
            ]
          }),
          sec("AA-14_QUICK_QUIZ", {
            questions: [
              { question: "Why should you use a Router module for different social platforms?", options: ["To make the scenario look cleaner", "Each platform has different APIs, content limits, and requirements", "Routers are required by Make.com", "To reduce API costs"], correct: 1, explanation: "Twitter has a 280-character limit and its own API, while LinkedIn supports long-form content with a different API. Routing lets you handle each platform appropriately." },
              { question: "What should the Schedule trigger be set to for a daily posting system?", options: ["Every 5 minutes", "Once daily at a peak engagement time", "Once weekly", "Every hour"], correct: 1, explanation: "Once daily at a peak time (like 8 AM) ensures your posts go out when your audience is most active, without over-processing." }
            ]
          })
        ]
      },

      /* ---------- M6-L4: Lead Capture to CRM Pipeline ---------- */
      {
        title: "Lead Capture to CRM Pipeline",
        slug: "lead-to-crm",
        goal: "Build an automation that captures leads from any source and feeds them into a CRM pipeline with proper tagging, assignment, and follow-up tasks.",
        summary: "You built a lead capture pipeline that takes form submissions, enriches them with AI, creates CRM contacts, and assigns follow-up tasks to your sales team.",
        sections: [
          sec("AA-01_TODAYS_WIN", {
            headline: "Every new lead will automatically appear in your CRM with context",
            description: "Today you build a complete lead pipeline: a form submission triggers lead creation in your CRM, AI tags the lead by interest and priority, and a follow-up task is assigned to the right salesperson."
          }),
          sec("AA-02_WHY_CARE", {
            benefit: "Leads that sit in an inbox for hours go cold. An automated pipeline captures, qualifies, and routes leads in seconds — ensuring fast follow-up, which is the number one factor in conversion.",
            real_example: "A digital marketing agency gets leads from 5 sources: website form, Facebook ads, LinkedIn ads, referral partners, and email inquiries. Before automation, leads were scattered. After building a centralized pipeline, all leads flow into HubSpot within 30 seconds with source tracking and AI priority tags."
          }),
          sec("AA-03_SIMPLE_MEANING", {
            term: "Lead Capture to CRM Pipeline",
            explanation: "A lead capture pipeline automatically takes incoming lead data from various sources (forms, ads, emails) and creates a proper contact record in your CRM with all relevant information, tags, and follow-up tasks.",
            analogy: "It is like an intake desk at a hospital. Every patient (lead) arrives, gets registered, triaged by urgency, assigned to the right doctor (salesperson), and a treatment plan (follow-up tasks) is created — all in minutes."
          }),
          sec("AA-04_WHERE_USED", {
            examples: [
              { company: "Real estate agencies", use: "Zillow and website leads are auto-captured into Follow Up Boss with area and budget tags." },
              { company: "B2B SaaS", use: "Demo requests from the website auto-create deals in Pipedrive with company size and use case tags." },
              { company: "Insurance brokers", use: "Quote requests from multiple comparison sites feed into Salesforce with policy type and coverage amount." },
              { company: "Coaching businesses", use: "Calendly booking + intake form data feeds into Dubsado CRM with service interest and discovery call notes." }
            ]
          }),
          sec("AA-05_FLOW", {
            input: "A prospect fills out the website's Contact Us form",
            steps: [
              "The form submission triggers a webhook to Make.com with name, email, company, and message",
              "Make.com sends the message to ChatGPT for interest categorization and priority scoring",
              "A new contact is created in the CRM (HubSpot, Pipedrive, or your Google Sheet CRM) with all data and AI tags",
              "A follow-up task is created and assigned to the appropriate team member based on the lead category"
            ],
            output: "Within 30 seconds, the lead exists in the CRM with tags, priority, and an assigned follow-up — ready for the sales team"
          }),
          sec("AA-06_TOOL_SETUP", {
            items: [
              { tool: "Google Sheets (as simple CRM)", action: "Create a sheet called CRM Pipeline with columns: Name, Email, Company, Source, Category, Priority, Assigned To, Follow-up Date, Status, Notes." },
              { tool: "Make.com", action: "Open Make.com for building the pipeline scenario." },
              { tool: "Webhook trigger", action: "You will use a Make.com webhook to simulate form submissions." },
              { tool: "OpenAI API", action: "For AI-powered lead categorization and priority scoring." },
              { tool: "Gmail or Slack", action: "For notifying the assigned team member about their new lead." }
            ]
          }),
          sec("AA-07_BUILD_STEPS", {
            steps: [
              { title: "Set up the CRM Sheet", instruction: "Create the CRM Pipeline sheet with all columns. This is your lightweight CRM.", tip: "You can replace this with HubSpot, Pipedrive, or any CRM later. The automation logic stays the same." },
              { title: "Create the webhook trigger", instruction: "In Make.com, add a Custom Webhook trigger. Name it Lead Capture Webhook and copy the URL.", tip: "This URL will receive data from your website form, landing page, or any lead source." },
              { title: "Add AI categorization", instruction: "Add OpenAI > Create a Chat Completion. System prompt: You are a lead qualifier. Based on the lead's message, categorize as: Web Design, Marketing, Consulting, or Other. Rate priority as Hot, Warm, or Cold. Return JSON.", tip: "Map the lead's message from the webhook into the user message." },
              { title: "Determine assignment", instruction: "Add a Router after the AI module. Route 1: Web Design leads → assign to Alice. Route 2: Marketing leads → assign to Bob. Route 3: Everything else → assign to Charlie.", tip: "Each route filters by the AI-returned category. This ensures leads go to the right person." },
              { title: "Create the CRM record", instruction: "On each route, add Google Sheets > Add a Row. Map all fields: Name, Email, Company from the webhook. Category, Priority from the AI. Assigned To based on the route.", tip: "Set Follow-up Date to 1 business day from now and Status to New." },
              { title: "Send assignment notification", instruction: "After creating the CRM record, add a Gmail or Slack module that notifies the assigned person: New lead assigned to you: {{Name}} from {{Company}}. Priority: {{Priority}}. Category: {{Category}}.", tip: "Include the lead's email and message summary so the rep has context for their follow-up call." },
              { title: "Test the full pipeline", instruction: "Use Postman to send test leads to your webhook with different company types and messages. Verify correct categorization and routing.", tip: "Send at least one lead per category to ensure all routes work correctly." },
              { title: "Connect a real form", instruction: "If you have a website form (Typeform, Google Forms, or custom), configure it to send submissions to your Make.com webhook URL.", tip: "Most form builders have a webhook option in their integration settings." }
            ]
          }),
          sec("AA-08_TEST", {
            checks: [
              { test: "Submit a web design inquiry", expected: "Lead is categorized as Web Design, assigned to Alice, and she receives a notification" },
              { test: "Submit a marketing inquiry", expected: "Lead is categorized as Marketing, assigned to Bob, and he receives a notification" },
              { test: "Submit a vague general inquiry", expected: "Lead is categorized as Other or Consulting, assigned to Charlie" },
              { test: "Check CRM Sheet", expected: "All test leads have complete data: name, email, AI category, priority, assigned to, and follow-up date" },
              { test: "Check notification delivery", expected: "Each assigned person received a notification within 1 minute of lead submission" }
            ]
          }),
          sec("AA-09_MISTAKES", {
            mistakes: [
              { mistake: "Not capturing the lead source", fix: "Always include a source field (website, Facebook, referral). It is critical for knowing which channels bring the best leads." },
              { mistake: "Assigning all leads to one person", fix: "Use routing logic to distribute leads by category, region, or round-robin. No one should be overwhelmed." },
              { mistake: "Not setting follow-up dates", fix: "Auto-set a follow-up date (24-48 hours). Leads without deadlines get forgotten." },
              { mistake: "Losing leads when the webhook fails", fix: "Add an error handler that sends failed leads to a backup email or Sheet so nothing is lost." },
              { mistake: "Not deduplicating leads", fix: "Before creating a new CRM record, check if the email already exists. Update instead of creating a duplicate." },
              { mistake: "Ignoring the lead's message content", fix: "The message is your best signal for intent. Use AI to extract what the lead actually wants." }
            ]
          }),
          sec("AA-10_UPGRADE", {
            ideas: [
              "Add lead enrichment: use Clearbit or Hunter.io to auto-fill company size, industry, and social profiles",
              "Build a round-robin assignment system that distributes leads evenly across the team",
              "Auto-create a draft response email personalized to the lead's inquiry using ChatGPT"
            ],
            challenge: "Connect three different lead sources (website webhook, Typeform, and manual Sheet entry) into the same CRM pipeline with source tracking for each."
          }),
          sec("AA-11_MINI_TASK", {
            task: "Build the lead capture pipeline and test with 8 leads across all categories. Verify AI categorization, correct routing, and team notifications.",
            deliverable: "Screenshot of the CRM Sheet with 8 leads, their AI categories and priorities, and a sample notification message.",
            time: "30 minutes"
          }),
          sec("AA-12_MONEY_ANGLE", {
            service: "Automated Lead Capture & CRM Pipeline",
            price_range: "$800–$2,500 setup + $200/month maintenance",
            pitch: "Businesses lose leads in scattered inboxes. You build a system that captures every lead from every source, qualifies them with AI, routes them to the right salesperson, and sets follow-up tasks. Clients typically see 30-50% faster response times."
          }),
          sec("AA-13_KEY_NOTES", {
            notes: [
              "Speed to lead is the number one factor in conversion. Automated pipelines respond in seconds, not hours.",
              "Use AI categorization to qualify and route leads to the right team member automatically.",
              "Always track lead source — it tells you which marketing channels are actually working.",
              "Set automatic follow-up dates so no lead falls through the cracks.",
              "Deduplicate by email to keep your CRM clean and avoid embarrassing double-outreach."
            ]
          }),
          sec("AA-14_QUICK_QUIZ", {
            questions: [
              { question: "Why is speed to lead so important?", options: ["Faster responses impress the lead", "Leads contacted within 5 minutes are 21x more likely to convert", "Speed is more important than quality", "It is not actually important"], correct: 1, explanation: "Research shows that leads contacted within 5 minutes of inquiry are 21x more likely to enter the sales pipeline. Automated systems ensure near-instant response." },
              { question: "What should happen when a webhook fails to process a lead?", options: ["Ignore it", "The lead data should be captured in a backup system", "Send an error message to the lead", "Retry indefinitely"], correct: 1, explanation: "An error handler should catch failures and save the lead data to a backup (email, Sheet, or Slack message) so no lead is lost." },
              { question: "Why should you deduplicate leads by email before creating CRM records?", options: ["To save storage space", "To avoid duplicate outreach that looks unprofessional", "Because CRMs require unique emails", "Deduplication is not necessary"], correct: 1, explanation: "Reaching out to the same lead twice makes your business look disorganized. Always check if the email exists before creating a new record." }
            ]
          })
        ]
      },

      /* ---------- M6-L5: Customer Support Ticket Router ---------- */
      {
        title: "Customer Support Ticket Router",
        slug: "support-ticket-router",
        goal: "Build an automation that reads support tickets, classifies them by type and urgency, and routes them to the right agent so customers get help faster.",
        summary: "You built a support ticket router that uses AI to classify, prioritize, and route tickets to the right team. Urgent issues get escalated immediately.",
        sections: [
          sec("AA-01_TODAYS_WIN", {
            headline: "Support tickets will sort and assign themselves automatically",
            description: "Today you build a system where every incoming support ticket is read by AI, classified by type and urgency, and routed to the right agent — no manual triage needed."
          }),
          sec("AA-02_WHY_CARE", {
            benefit: "Manual ticket triage is the biggest bottleneck in customer support. Auto-routing cuts first response time by 60% and ensures no ticket sits in the wrong queue.",
            real_example: "A SaaS company with 500 tickets per day used manual triage. Average first response was 4 hours. After implementing AI auto-routing, tickets are categorized and assigned in under 10 seconds. First response dropped to 45 minutes."
          }),
          sec("AA-03_SIMPLE_MEANING", {
            term: "Ticket Routing Automation",
            explanation: "Ticket routing automation reads each incoming support request, decides what it is about and how urgent it is, then assigns it to the right team member. It replaces the human dispatcher who would otherwise read every ticket and assign it manually.",
            analogy: "It is like a hospital emergency room triage nurse. Every patient (ticket) gets assessed on arrival — is it a broken arm (Technical) or a billing question? Is it urgent or routine? Then they are sent to the right department immediately."
          }),
          sec("AA-04_WHERE_USED", {
            examples: [
              { company: "Zendesk", use: "AI auto-tags and routes tickets based on content analysis, reducing manual triage by 80%." },
              { company: "Freshdesk", use: "Smart ticket assignment routes tickets to agents based on skill, workload, and ticket category." },
              { company: "Intercom", use: "AI classifies conversations and routes them to the right team or bot for handling." },
              { company: "Small businesses", use: "Use Make.com to auto-route support emails to different team members based on AI classification." }
            ]
          }),
          sec("AA-05_FLOW", {
            input: "A customer submits a support ticket: My account was charged twice this month and I want a refund",
            steps: [
              "The ticket arrives via email or form and triggers the automation",
              "AI analyzes the content and classifies: Category = Billing, Urgency = High, Sentiment = Frustrated",
              "The Router sends Billing tickets to the billing team with a High priority tag",
              "The billing agent receives a notification with the ticket, classification, and suggested response"
            ],
            output: "The ticket is in the billing queue within seconds, tagged as High priority, with the agent already notified"
          }),
          sec("AA-06_TOOL_SETUP", {
            items: [
              { tool: "Google Sheets", action: "Create a sheet called Support Tickets with columns: Ticket ID, Customer, Email, Message, Category, Urgency, Sentiment, Assigned To, Status, Created At." },
              { tool: "Make.com", action: "Open Make.com for building the routing scenario." },
              { tool: "OpenAI API", action: "For AI-powered ticket classification." },
              { tool: "Gmail or Slack", action: "For agent notifications." }
            ]
          }),
          sec("AA-07_BUILD_STEPS", {
            steps: [
              { title: "Prepare sample tickets", instruction: "Add 10 sample tickets to your Sheet with a mix: 3 billing issues, 3 technical problems, 2 feature requests, 1 account access issue, 1 general question.", tip: "Write realistic messages: Can't log in since the update, I was billed $99 instead of $49, Can you add dark mode?, etc." },
              { title: "Create the webhook trigger", instruction: "In Make.com, create a Custom Webhook for receiving tickets. Alternatively, use Google Sheets > Watch Rows if tickets are added to the Sheet.", tip: "For production, you would connect this to your actual support email or form." },
              { title: "Add AI classification", instruction: "Add OpenAI > Create a Chat Completion. System prompt: Classify this support ticket. Return JSON: {\"category\": \"Billing/Technical/Feature_Request/Account/General\", \"urgency\": \"Critical/High/Medium/Low\", \"sentiment\": \"Angry/Frustrated/Neutral/Happy\", \"summary\": \"one-sentence summary\"}", tip: "Include the urgency scale definitions in the system prompt: Critical = service down, High = money involved, Medium = feature issue, Low = general question." },
              { title: "Set up routing logic", instruction: "Add a Router module. Create 4 routes: Billing → Finance Team, Technical → Engineering Team, Feature Request → Product Team, Account/General → Support Team.", tip: "Each route filters by the AI-returned category." },
              { title: "Assign agents", instruction: "On each route, assign the ticket to a specific agent. For a simple setup, hardcode agent names. For advanced, use round-robin assignment.", tip: "In production, you would pull agent availability from a separate agent roster Sheet." },
              { title: "Handle urgent escalation", instruction: "Add a filter on each route: if urgency = Critical, send an additional Slack message to the team lead immediately.", tip: "Critical tickets should not wait. An instant alert ensures someone is on it within minutes." },
              { title: "Update the ticket Sheet", instruction: "After routing, update the ticket row with Category, Urgency, Sentiment, Assigned To, and Status = Assigned.", tip: "This creates a complete ticket log for reporting and SLA tracking." },
              { title: "Test all scenarios", instruction: "Run tickets of each type through the system. Verify correct classification, routing, and notifications.", tip: "Pay special attention to edge cases: tickets that could be two categories, very short messages, messages in different tones." }
            ]
          }),
          sec("AA-08_TEST", {
            checks: [
              { test: "Submit a billing complaint", expected: "Classified as Billing, High urgency. Routed to Finance Team." },
              { test: "Submit a technical bug report", expected: "Classified as Technical, Medium or High urgency. Routed to Engineering." },
              { test: "Submit a critical outage report", expected: "Classified as Critical urgency. Agent and team lead both notified." },
              { test: "Submit a feature request", expected: "Classified as Feature_Request, Low urgency. Routed to Product Team." },
              { test: "Submit an angry message about billing", expected: "Sentiment = Angry/Frustrated, Urgency = High. Proper escalation triggered." }
            ]
          }),
          sec("AA-09_MISTAKES", {
            mistakes: [
              { mistake: "Not defining urgency levels clearly in the prompt", fix: "Give the AI clear criteria: Critical = service down for multiple users. High = financial impact or security. Medium = functionality issue. Low = question or enhancement." },
              { mistake: "Routing all tickets to one person", fix: "Distribute by category and workload. Use round-robin or check agent availability before assigning." },
              { mistake: "Not escalating critical tickets differently", fix: "Critical tickets need instant alerts via Slack, SMS, or phone call — not just an email notification." },
              { mistake: "Ignoring sentiment analysis", fix: "Frustrated or angry customers need empathetic, fast responses. Flag their tickets for priority handling." },
              { mistake: "Not logging the AI classification for review", fix: "Save every classification to the Sheet. Review weekly to catch misclassifications and improve the prompt." },
              { mistake: "Not handling tickets that arrive outside business hours", fix: "Add an auto-reply for off-hours tickets and queue them for the morning with a priority boost." }
            ]
          }),
          sec("AA-10_UPGRADE", {
            ideas: [
              "Add an AI-generated suggested response that agents can review and send with one click",
              "Build a dashboard showing ticket volume by category, average resolution time, and sentiment trends",
              "Auto-close tickets that are clearly spam or duplicates",
              "Add SLA tracking: if a ticket is not responded to within 2 hours, escalate automatically"
            ],
            challenge: "Add SLA monitoring: create a separate scheduled scenario that checks for unresponded tickets older than 2 hours and sends escalation alerts to the team lead."
          }),
          sec("AA-11_MINI_TASK", {
            task: "Build the support ticket router and test with 10 tickets covering all categories and urgency levels. Verify correct routing and notifications.",
            deliverable: "Screenshot of the Make.com scenario, the Tickets Sheet with 10 classified and assigned tickets, and a sample agent notification.",
            time: "30 minutes"
          }),
          sec("AA-12_MONEY_ANGLE", {
            service: "AI-Powered Ticket Routing System",
            price_range: "$1,000–$3,000 setup + $200/month maintenance",
            pitch: "Support teams waste 30% of their time just triaging tickets. You build an AI system that instantly classifies, prioritizes, and routes every ticket — cutting first response time by 60% and improving customer satisfaction scores."
          }),
          sec("AA-13_KEY_NOTES", {
            notes: [
              "AI ticket routing eliminates manual triage — the biggest bottleneck in customer support.",
              "Define clear urgency criteria in the prompt so the AI classifies consistently.",
              "Critical tickets need instant alerts (Slack, SMS) — not just email notifications.",
              "Track sentiment to identify angry customers who need priority, empathetic handling.",
              "Log every AI classification and review weekly to continuously improve accuracy."
            ]
          }),
          sec("AA-14_QUICK_QUIZ", {
            questions: [
              { question: "What is the main benefit of AI ticket routing over manual triage?", options: ["It is cheaper", "It classifies and routes tickets in seconds instead of hours", "It replaces all support agents", "It only works for large companies"], correct: 1, explanation: "AI routes tickets in under 10 seconds vs. the minutes or hours it takes for a human to read, classify, and assign each ticket." },
              { question: "How should critical urgency tickets be handled differently?", options: ["Send them to the regular queue", "Send instant alerts via Slack or SMS to the team lead", "Wait until business hours", "Auto-close them"], correct: 1, explanation: "Critical tickets indicate major issues (outages, security, data loss) and need instant escalation beyond regular queue processing." },
              { question: "Why track sentiment alongside category and urgency?", options: ["Sentiment is required by AI", "Frustrated customers need faster, more empathetic responses", "Sentiment affects pricing", "It is not useful to track sentiment"], correct: 1, explanation: "A frustrated customer with a simple billing question needs different handling than a happy customer with the same question. Sentiment helps agents adjust their approach." }
            ]
          })
        ]
      }
    ]
  },

  /* ================================================================
     MODULE 7 — Reliability and Safety
     ================================================================ */
  {
    title: "Reliability and Safety",
    slug: "m7-reliability-safety",
    lessons: [
      /* ---------- M7-L1: Error Handling Best Practices ---------- */
      {
        title: "Error Handling Best Practices",
        slug: "error-handling-practices",
        goal: "Learn how to build automations that handle errors gracefully so they recover instead of silently failing.",
        summary: "You learned the three types of automation errors and built error handlers that catch, log, and recover from failures without losing data.",
        sections: [
          sec("AA-01_TODAYS_WIN", {
            headline: "Your automations will never fail silently again",
            description: "Today you learn how to catch errors, log them, and build recovery paths so your automations handle problems gracefully instead of crashing or losing data."
          }),
          sec("AA-02_WHY_CARE", {
            benefit: "An automation without error handling is a ticking time bomb. It works perfectly until it doesn't — and when it fails, you have no idea what happened or what data was lost.",
            real_example: "A freelancer built a lead capture automation that worked great for 3 months. Then the Google Sheets API had a 2-hour outage. 47 leads were lost because there was no error handling. With proper error handling, those leads would have been queued and processed after the outage."
          }),
          sec("AA-03_SIMPLE_MEANING", {
            term: "Error Handling",
            explanation: "Error handling is the practice of planning for things that can go wrong in your automation and building recovery steps. Instead of crashing, the automation catches the error, logs what happened, and either retries, uses a backup, or alerts you.",
            analogy: "It is like a pilot's emergency checklist. If an engine fails, they don't panic — they follow a practiced procedure to safely land. Error handling is your automation's emergency checklist."
          }),
          sec("AA-04_WHERE_USED", {
            examples: [
              { company: "Netflix", use: "Built Chaos Monkey to intentionally break things and test error handling — ensuring the streaming service recovers from any failure." },
              { company: "Stripe", use: "Payment processing has multiple fallback paths. If one payment processor fails, it automatically retries with another." },
              { company: "Make.com scenarios", use: "Error handler modules catch failures at each step and route to recovery paths or admin alerts." },
              { company: "Enterprise automation teams", use: "Every production automation has error logging, retry logic, and dead letter queues for failed records." }
            ]
          }),
          sec("AA-05_FLOW", {
            input: "An automation step fails — for example, Google Sheets API returns a 500 error",
            steps: [
              "The error handler catches the failure instead of crashing the entire scenario",
              "The error details (type, message, timestamp, affected data) are logged to an Errors Sheet or sent to Slack",
              "The handler checks if the error is retryable (API timeout) or permanent (invalid data)",
              "For retryable errors: wait and retry. For permanent errors: save the data to a dead letter queue for manual review"
            ],
            output: "The automation continues processing other records. The failed record is safely captured for later processing."
          }),
          sec("AA-06_TOOL_SETUP", {
            items: [
              { tool: "Make.com", action: "Open any existing scenario. You will add error handling modules to it." },
              { tool: "Google Sheets", action: "Create an Error Log sheet with columns: Timestamp, Scenario Name, Module, Error Type, Error Message, Affected Data, Status." },
              { tool: "Slack or Email", action: "For real-time error alerts when critical failures happen." }
            ]
          }),
          sec("AA-07_BUILD_STEPS", {
            steps: [
              { title: "Create the Error Log Sheet", instruction: "Set up a Google Sheet called Error Log with columns: Timestamp, Scenario Name, Module, Error Type, Error Message, Affected Data, Resolved.", tip: "This is your central error dashboard. All scenarios should log errors here." },
              { title: "Open an existing scenario", instruction: "Open any working scenario in Make.com (like the webhook-to-Sheets from Module 4).", tip: "You will add error handling to each module." },
              { title: "Add an error handler", instruction: "Right-click on a module (e.g., Google Sheets > Add a Row) and select Add error handler. Choose the Resume directive.", tip: "Make.com offers several directives: Resume (continue), Rollback (undo), Commit (save partial), and Break (stop and retry)." },
              { title: "Log the error", instruction: "In the error handler path, add Google Sheets > Add a Row to your Error Log sheet. Map the error fields: error.message, error.type, the module name, and the data that was being processed.", tip: "Include the affected data (like the lead name and email) so you can reprocess it later." },
              { title: "Add an alert for critical errors", instruction: "After logging, add a Slack or Email module that sends an alert: AUTOMATION ERROR: {{Scenario Name}} failed at {{Module Name}}. Error: {{Error Message}}.", tip: "Only alert on critical errors. Use a filter to skip minor warnings." },
              { title: "Test with intentional failures", instruction: "Temporarily break something in your scenario (wrong Sheet ID, invalid API key) and run it. Verify the error is caught, logged, and an alert is sent.", tip: "Then fix the intentional break and verify normal processing resumes." },
              { title: "Add error handlers to all modules", instruction: "Repeat steps 3-5 for every module in your scenario that could fail (API calls, database writes, external services).", tip: "Any module that depends on an external service can fail. Treat every external call as potentially unreliable." }
            ]
          }),
          sec("AA-08_TEST", {
            checks: [
              { test: "Disconnect the Google Sheets connection temporarily", expected: "Error handler catches the failure, logs it, and sends an alert" },
              { test: "Send invalid data that a module cannot process", expected: "Error is logged with the specific data that caused the failure" },
              { test: "Verify the error log Sheet", expected: "Contains a row for each error with timestamp, module, error type, and affected data" },
              { test: "Fix the error and re-run", expected: "Normal processing resumes. Previously failed data can be reprocessed from the error log." },
              { test: "Check that non-failing records still process", expected: "One record failing does not stop the rest of the batch from processing" }
            ]
          }),
          sec("AA-09_MISTAKES", {
            mistakes: [
              { mistake: "Not adding any error handling because everything works fine right now", fix: "Everything fails eventually. Add error handling before the first failure, not after." },
              { mistake: "Catching errors but not logging them", fix: "An error you cannot see is an error you cannot fix. Always log to a Sheet, database, or monitoring tool." },
              { mistake: "Using the same error handler for all error types", fix: "Network timeouts should retry. Invalid data should go to manual review. Authentication failures should alert immediately." },
              { mistake: "Alerting on every single error", fix: "Too many alerts cause alert fatigue. Alert only on critical errors. Log everything else for weekly review." },
              { mistake: "Not including the affected data in error logs", fix: "Without the data, you cannot reprocess. Always capture what was being processed when the error occurred." },
              { mistake: "Forgetting to handle partial failures in batch operations", fix: "If 3 of 10 records fail, the 7 successful ones should still be committed. Use individual error handlers, not one handler for the whole batch." }
            ]
          }),
          sec("AA-10_UPGRADE", {
            ideas: [
              "Build a weekly error report that summarizes error counts by type and scenario",
              "Create an auto-retry queue that reprocesses failed records every hour",
              "Add a Slack bot that lets you mark errors as resolved directly from the alert message"
            ],
            challenge: "Build an error monitoring dashboard in Google Sheets that auto-updates with error counts, trends, and a red/yellow/green health status for each scenario."
          }),
          sec("AA-11_MINI_TASK", {
            task: "Add error handling to one of your existing automations. Intentionally trigger 3 different types of errors and verify all are caught, logged, and alerted.",
            deliverable: "Screenshot of the Error Log Sheet with 3 logged errors and a Slack/email alert for the most critical one.",
            time: "20 minutes"
          }),
          sec("AA-12_MONEY_ANGLE", {
            service: "Automation Reliability Audit and Error Handling Setup",
            price_range: "$500–$1,500 per audit",
            pitch: "Businesses run automations that silently fail, losing leads, orders, and data. You audit their workflows, add proper error handling, set up logging and alerts, and ensure nothing falls through the cracks."
          }),
          sec("AA-13_KEY_NOTES", {
            notes: [
              "Every external API call can fail. Treat all integrations as unreliable and plan accordingly.",
              "The three error handler actions: retry (for temporary issues), fallback (use an alternative), and alert (for critical failures).",
              "Always log errors with timestamp, module, error type, message, and the affected data.",
              "Alert on critical errors immediately. Log everything else for weekly review.",
              "Include the affected data in error logs so you can reprocess failed records later."
            ]
          }),
          sec("AA-14_QUICK_QUIZ", {
            questions: [
              { question: "What should an error handler do when a Google Sheets API call fails?", options: ["Crash the entire scenario", "Catch the error, log it, and try to continue", "Delete the data that caused the error", "Ignore it and move on"], correct: 1, explanation: "A good error handler catches the failure, logs the details for debugging, and either retries or continues processing other records." },
              { question: "Why should you include affected data in error logs?", options: ["To make the log look complete", "So you can reprocess the failed records once the issue is fixed", "Because Make.com requires it", "To increase storage usage"], correct: 1, explanation: "Without the affected data, you cannot reprocess failed records. You would lose whatever data was being processed when the error occurred." },
              { question: "What is alert fatigue?", options: ["Being tired of automation work", "Getting so many non-critical alerts that you start ignoring all of them", "A type of API error", "Running out of Slack messages"], correct: 1, explanation: "When every minor error triggers an alert, people start ignoring all alerts — including critical ones. Only alert on truly important failures." }
            ]
          })
        ]
      },

      /* ---------- M7-L2: Retry Logic and Fallbacks ---------- */
      {
        title: "Retry Logic and Fallbacks",
        slug: "retry-logic-fallbacks",
        goal: "Build retry mechanisms and fallback paths so your automations recover from temporary failures automatically.",
        summary: "You learned exponential backoff, built retry loops, and configured fallback paths that keep your automations running even when services go down.",
        sections: [
          sec("AA-01_TODAYS_WIN", {
            headline: "Your automations will retry and recover on their own",
            description: "Today you build automations that automatically retry failed steps with smart delays and switch to backup paths when the primary service is down."
          }),
          sec("AA-02_WHY_CARE", {
            benefit: "Most automation failures are temporary — API timeouts, rate limits, network blips. Retry logic fixes 90% of these automatically without human intervention.",
            real_example: "An e-commerce automation sends order confirmations via SendGrid. When SendGrid had a 30-minute outage, the automation's retry logic waited and retried 3 times with exponential delays. All emails were sent successfully after the outage. Without retries, 200+ customers would have gotten no confirmation."
          }),
          sec("AA-03_SIMPLE_MEANING", {
            term: "Retry Logic and Fallbacks",
            explanation: "Retry logic automatically re-attempts a failed action after a short wait. If retries keep failing, a fallback is an alternative path — like using a backup email service when the primary one is down.",
            analogy: "Retries are like trying to call someone who did not answer. You wait a minute and try again. If they still don't answer after 3 tries, the fallback is sending a text message instead."
          }),
          sec("AA-04_WHERE_USED", {
            examples: [
              { company: "AWS", use: "All AWS SDKs have built-in exponential backoff retry logic for API calls." },
              { company: "Stripe", use: "Retries failed payment charges up to 4 times over several days with smart scheduling." },
              { company: "Slack", use: "Webhook deliveries retry with increasing delays if the receiving server returns an error." },
              { company: "Make.com", use: "Break directive pauses a scenario and retries it after a configurable delay." }
            ]
          }),
          sec("AA-05_FLOW", {
            input: "An API call to SendGrid fails with a 503 Service Unavailable error",
            steps: [
              "The error handler catches the 503 error and identifies it as retryable",
              "Wait 5 seconds, then retry the API call (attempt 2 of 3)",
              "If attempt 2 fails, wait 15 seconds and retry once more (attempt 3 of 3)",
              "If all retries fail, switch to fallback: send via Gmail SMTP instead of SendGrid"
            ],
            output: "The email is sent successfully — either via SendGrid after retry, or via Gmail as fallback. No data is lost."
          }),
          sec("AA-06_TOOL_SETUP", {
            items: [
              { tool: "Make.com", action: "Open an existing scenario with at least one API call (e.g., your email or Sheets automation)." },
              { tool: "Error Log Sheet", action: "Use the Error Log Sheet from the previous lesson to track retry attempts." },
              { tool: "Backup email (Gmail)", action: "Have a Gmail connection ready as a fallback for any email-sending modules." }
            ]
          }),
          sec("AA-07_BUILD_STEPS", {
            steps: [
              { title: "Understand retry vs fallback", instruction: "Retries re-attempt the same action. Fallbacks use a different action. Use retries for temporary errors (timeout, rate limit) and fallbacks for prolonged outages.", tip: "A good rule: retry up to 3 times. If all 3 fail, use the fallback." },
              { title: "Add Break error handling", instruction: "In Make.com, right-click a module and add an error handler with the Break directive. Set the number of retries to 3 and the interval to 60 seconds.", tip: "Break pauses the scenario execution and retries the entire scenario from the break point after the interval." },
              { title: "Configure exponential backoff", instruction: "Instead of fixed intervals, use increasing delays: 1st retry after 10 seconds, 2nd after 30 seconds, 3rd after 90 seconds.", tip: "In Make.com, you can use the Break directive with custom intervals, or build manual retry loops with Sleep modules." },
              { title: "Build a manual retry loop", instruction: "For more control, use a Repeater module set to 3 iterations with a Sleep module inside. Each iteration attempts the API call and breaks out of the loop on success.", tip: "Use the iteration number to calculate the delay: delay = 10 * (2 ^ iteration). This gives 10, 20, 40 second delays." },
              { title: "Add a fallback path", instruction: "After the retry loop, add a Router. Route 1: if the API call succeeded, continue normally. Route 2: if all retries failed, use the fallback (e.g., Gmail instead of SendGrid).", tip: "The fallback should accomplish the same goal through a different method." },
              { title: "Log retry attempts", instruction: "In each retry iteration, log the attempt number and error to your Error Log Sheet. This creates a record of what happened.", tip: "The log helps you identify which services are unreliable and need better fallbacks." },
              { title: "Test with simulated failures", instruction: "Temporarily use a wrong API key or invalid URL to force failures. Run the scenario and verify retries execute with delays and the fallback activates.", tip: "Watch the Make.com execution log to see each retry attempt, its delay, and the final outcome." }
            ]
          }),
          sec("AA-08_TEST", {
            checks: [
              { test: "Force a temporary API failure", expected: "The automation retries 3 times with increasing delays before using the fallback" },
              { test: "Force a permanent failure (wrong credentials)", expected: "All retries fail and the fallback path activates" },
              { test: "Check the Error Log", expected: "Shows each retry attempt with timestamps, proving exponential backoff is working" },
              { test: "Normal operation (no errors)", expected: "The automation runs normally without any retries or delays" },
              { test: "Verify the fallback produces the same result", expected: "The fallback (e.g., Gmail) sends the email just like the primary (e.g., SendGrid) would" }
            ]
          }),
          sec("AA-09_MISTAKES", {
            mistakes: [
              { mistake: "Retrying immediately without any delay", fix: "Immediate retries hammer the already-struggling service. Always add delays between retries." },
              { mistake: "Retrying forever instead of limiting attempts", fix: "Set a maximum retry count (3-5). After that, use a fallback or alert a human." },
              { mistake: "Using the same delay for every retry", fix: "Use exponential backoff: 10s, 30s, 90s. This gives the failing service more time to recover." },
              { mistake: "Retrying non-retryable errors like 401 Unauthorized", fix: "Only retry on 429 (rate limit), 500, 502, 503, 504 errors. Do not retry on 400 (bad request) or 401 (auth error)." },
              { mistake: "Not having a fallback when retries are exhausted", fix: "Always have a Plan B. If the primary email service is down, use a secondary. If the primary CRM is down, write to a Sheet." },
              { mistake: "Forgetting to alert when the fallback is used", fix: "Fallback usage means something is wrong. Send a notification so you can investigate the primary service." }
            ]
          }),
          sec("AA-10_UPGRADE", {
            ideas: [
              "Build a circuit breaker: if a service fails 5 times in an hour, skip it entirely and use the fallback for the next hour",
              "Create a retry queue Sheet where failed items are stored and reprocessed hourly by a separate scenario",
              "Add health checking: ping critical APIs every 5 minutes and alert if they are down before failures happen"
            ],
            challenge: "Build a circuit breaker pattern: track API failures in a Sheet. If the failure count exceeds 5 in the last hour, automatically switch to the fallback path without even trying the primary."
          }),
          sec("AA-11_MINI_TASK", {
            task: "Add retry logic with exponential backoff and a fallback path to an existing automation. Test by forcing failures.",
            deliverable: "Screenshot of the Make.com scenario with retry and fallback paths, plus the Error Log showing retry attempts with timestamps.",
            time: "25 minutes"
          }),
          sec("AA-12_MONEY_ANGLE", {
            service: "Automation Resilience Package",
            price_range: "$600–$1,500 per automation",
            pitch: "Businesses trust their automations but don't realize they break silently. You add retry logic, fallback paths, and monitoring — turning fragile automations into production-grade systems that self-heal."
          }),
          sec("AA-13_KEY_NOTES", {
            notes: [
              "Retry logic automatically re-attempts failed actions — fixing 90% of temporary failures.",
              "Use exponential backoff (10s, 30s, 90s) to give failing services time to recover.",
              "Limit retries to 3-5 attempts. After that, switch to a fallback path.",
              "Only retry on server errors (5xx) and rate limits (429). Do not retry on client errors (4xx).",
              "Always alert when the fallback activates — it means the primary service has a problem."
            ]
          }),
          sec("AA-14_QUICK_QUIZ", {
            questions: [
              { question: "What is exponential backoff?", options: ["Retrying faster each time", "Waiting longer between each retry attempt", "Retrying only once", "Skipping the retry entirely"], correct: 1, explanation: "Exponential backoff increases the wait time between retries (e.g., 10s, 30s, 90s), giving the failing service progressively more time to recover." },
              { question: "Which HTTP status code should trigger a retry?", options: ["200 OK", "401 Unauthorized", "503 Service Unavailable", "404 Not Found"], correct: 2, explanation: "503 Service Unavailable is a temporary server error that typically resolves on its own. 401 and 404 are not retryable — they require code/config fixes." },
              { question: "What should happen after all retries are exhausted?", options: ["Try one more time", "Activate the fallback path", "Delete the data", "Do nothing"], correct: 1, explanation: "When retries are exhausted, the fallback path activates — using an alternative service or method to accomplish the same goal." }
            ]
          })
        ]
      },

      /* ---------- M7-L3: Data Validation Before Actions ---------- */
      {
        title: "Data Validation Before Actions",
        slug: "data-validation",
        goal: "Learn how to validate data before your automations act on it so bad data never reaches your systems.",
        summary: "You built validation layers that check data quality before processing. Invalid data is caught, logged, and handled — never silently corrupting your systems.",
        sections: [
          sec("AA-01_TODAYS_WIN", {
            headline: "Your automations will reject bad data before it causes problems",
            description: "Today you add validation checkpoints to your automations. Invalid emails, missing fields, and wrong formats are caught and handled before they reach your CRM, emails, or spreadsheets."
          }),
          sec("AA-02_WHY_CARE", {
            benefit: "Bad data in = bad results out. An automation that processes invalid data will send emails to fake addresses, create corrupt CRM records, and generate reports with wrong numbers. Validation prevents all of this.",
            real_example: "A lead capture automation accepted any form submission without validation. 30% of leads had fake emails, missing names, or bot submissions. The sales team wasted hours calling invalid numbers. After adding validation, junk submissions dropped to 2%."
          }),
          sec("AA-03_SIMPLE_MEANING", {
            term: "Data Validation",
            explanation: "Data validation is checking that incoming data meets your requirements before processing it. Is the email a real format? Is the phone number 10 digits? Is the required name field filled in? If not, the data is rejected or flagged.",
            analogy: "It is like a bouncer at a club. Before anyone gets in (gets processed), the bouncer checks their ID (validates the data). No valid ID, no entry. It keeps the inside safe and clean."
          }),
          sec("AA-04_WHERE_USED", {
            examples: [
              { company: "Stripe", use: "Validates card numbers, expiry dates, and CVV formats before attempting any charge." },
              { company: "Gmail", use: "Validates email addresses before sending — rejects invalid formats like missing @ or invalid domains." },
              { company: "Shopify", use: "Validates product data (price > 0, title not empty, valid image URL) before publishing listings." },
              { company: "Healthcare systems", use: "Validate patient data rigorously — wrong dosage, wrong ID, or missing allergies can be life-threatening." }
            ]
          }),
          sec("AA-05_FLOW", {
            input: "A new lead arrives via webhook: {name: '', email: 'not-an-email', phone: '123'}",
            steps: [
              "The validation module checks: is the name empty? (YES — fail). Is the email a valid format? (NO — fail). Is the phone number valid? (NO — fail).",
              "All three validations failed. The lead is tagged as Invalid.",
              "The invalid lead data is logged to an Invalid Submissions Sheet with the reason for each failure.",
              "A notification is sent to the admin if invalid submission rate exceeds 20% (possible bot attack)."
            ],
            output: "The invalid lead never enters the CRM. It is safely logged for review, and valid leads continue processing normally."
          }),
          sec("AA-06_TOOL_SETUP", {
            items: [
              { tool: "Make.com", action: "Open an existing lead capture or form processing scenario." },
              { tool: "Google Sheets", action: "Create a sheet called Invalid Submissions with columns: Timestamp, Raw Data, Validation Errors, Source." },
              { tool: "Regex tester", action: "Open regex101.com. You will test email and phone validation patterns here." }
            ]
          }),
          sec("AA-07_BUILD_STEPS", {
            steps: [
              { title: "List required fields", instruction: "Write down every field your automation needs: name (required, non-empty), email (required, valid format), phone (optional, 10+ digits if provided).", tip: "Start strict — you can relax validation later. It is harder to fix corrupted data than to prevent it." },
              { title: "Add email validation", instruction: "In Make.com, after receiving data, add a Filter module. Set the condition to: email matches pattern ^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$", tip: "This regex checks for basic email format: something@something.something. It catches empty emails and obvious fakes." },
              { title: "Add required field checks", instruction: "Add another filter: name is not empty AND name length > 1.", tip: "Single-character names are usually spam. Require at least 2 characters." },
              { title: "Handle invalid data", instruction: "Create a Fallback route for records that fail validation. Route them to Google Sheets > Add a Row in your Invalid Submissions sheet.", tip: "Include the raw data and which specific validation(s) failed so you can analyze patterns." },
              { title: "Add phone validation (optional fields)", instruction: "If phone is provided, check it has at least 10 digits using a regex or length check. If not provided, let it pass — it is optional.", tip: "Optional fields should only be validated when they have a value. Empty is fine; wrong format is not." },
              { title: "Add duplicate detection", instruction: "Before creating a CRM record, use Google Sheets > Search Rows to check if the email already exists. If it does, update instead of creating a duplicate.", tip: "Deduplication is a form of validation — it prevents the same lead from appearing twice." },
              { title: "Test with good and bad data", instruction: "Send 5 valid leads and 5 invalid leads (empty names, fake emails, wrong formats). Verify valid ones are processed and invalid ones are caught.", tip: "Check both paths: the happy path (valid data) and the error path (invalid data). Both must work correctly." },
              { title: "Monitor invalid submission rates", instruction: "Add a check: if more than 5 invalid submissions arrive in 1 hour, send an alert. This could indicate a bot attack.", tip: "Sudden spikes in invalid data often mean your form is being targeted by bots." }
            ]
          }),
          sec("AA-08_TEST", {
            checks: [
              { test: "Submit valid data", expected: "Data passes all validations and is processed normally" },
              { test: "Submit empty name", expected: "Caught by name validation. Logged to Invalid Submissions with reason: name is empty" },
              { test: "Submit invalid email (missing @)", expected: "Caught by email validation. Logged with reason: invalid email format" },
              { test: "Submit duplicate email", expected: "Existing record is updated instead of creating a duplicate" },
              { test: "Submit 10 invalid records quickly", expected: "All logged to Invalid Submissions. Alert triggered if rate exceeds threshold." }
            ]
          }),
          sec("AA-09_MISTAKES", {
            mistakes: [
              { mistake: "Not validating at all because you trust the data source", fix: "Never trust incoming data — even from your own forms. Users make mistakes, bots submit junk, APIs send nulls." },
              { mistake: "Validating only the email and ignoring other fields", fix: "Validate every field that your downstream systems need. A missing name breaks personalized emails." },
              { mistake: "Using overly strict validation that rejects legitimate data", fix: "Allow international phone formats, hyphenated names, and non-ASCII characters. Test with diverse real data." },
              { mistake: "Silently dropping invalid data", fix: "Always log invalid submissions. They help you improve your forms and spot trends." },
              { mistake: "Not validating data types (string vs number)", fix: "A price field with the text free will break your invoice generator. Validate types, not just presence." },
              { mistake: "Checking validation only at the entry point", fix: "Add validation before any critical action (payment, CRM write, email send). Data can be corrupted mid-pipeline." }
            ]
          }),
          sec("AA-10_UPGRADE", {
            ideas: [
              "Use an email verification API (like ZeroBounce) to check if emails are real and deliverable",
              "Add CAPTCHA to your forms to block bot submissions at the source",
              "Build a data quality dashboard that tracks validation pass/fail rates over time"
            ],
            challenge: "Add a real-time email verification step using the ZeroBounce or Hunter.io API. Only process leads with verified, deliverable email addresses."
          }),
          sec("AA-11_MINI_TASK", {
            task: "Add validation to a lead capture or form processing automation. Test with 5 valid and 5 invalid submissions.",
            deliverable: "Screenshot showing 5 valid leads processed correctly and 5 invalid ones logged to the Invalid Submissions Sheet with reasons.",
            time: "20 minutes"
          }),
          sec("AA-12_MONEY_ANGLE", {
            service: "Data Quality and Validation Setup",
            price_range: "$400–$1,000 per automation",
            pitch: "Businesses waste money on bad leads, duplicate records, and corrupted data. You add validation layers that filter out junk, prevent duplicates, and ensure only clean data enters their systems."
          }),
          sec("AA-13_KEY_NOTES", {
            notes: [
              "Never trust incoming data. Validate everything before processing.",
              "Check for: required fields, valid formats (email, phone), correct data types, and duplicates.",
              "Log all invalid submissions with the reason for rejection — this data helps improve your forms.",
              "Optional fields should only be validated when they contain a value.",
              "Monitor invalid submission rates — sudden spikes can indicate bot attacks."
            ]
          }),
          sec("AA-14_QUICK_QUIZ", {
            questions: [
              { question: "What should happen when a lead submission has an invalid email?", options: ["Process it anyway", "Delete it silently", "Log it to an invalid submissions sheet with the reason", "Send an error to the lead"], correct: 2, explanation: "Invalid submissions should be logged with specific reasons. This preserves the data for review and helps identify patterns." },
              { question: "Why is deduplication considered a form of validation?", options: ["It checks email format", "It prevents the same record from being created twice, ensuring data integrity", "It is not a form of validation", "It validates phone numbers"], correct: 1, explanation: "Deduplication ensures each entity exists only once in your system, preventing duplicate outreach and maintaining clean data." }
            ]
          })
        ]
      },

      /* ---------- M7-L4: Rate Limits and Throttling ---------- */
      {
        title: "Rate Limits and Throttling",
        slug: "rate-limits-throttling",
        goal: "Understand API rate limits and build throttling into your automations so they never get blocked for sending too many requests.",
        summary: "You learned how rate limits work, built delays into batch processing, and configured your automations to respect API quotas without losing speed.",
        sections: [
          sec("AA-01_TODAYS_WIN", {
            headline: "You will process thousands of records without hitting a single rate limit",
            description: "Today you learn how APIs limit your requests and how to build smart throttling so your automations run smoothly even with large data volumes."
          }),
          sec("AA-02_WHY_CARE", {
            benefit: "Every API has rate limits. If your automation sends too many requests too fast, you get blocked — sometimes for hours. Throttling keeps you under the limit while maximizing speed.",
            real_example: "A marketing team tried to update 10,000 contacts in HubSpot at once. They hit the rate limit at 100 requests per 10 seconds. The automation crashed halfway, leaving 5,000 contacts unprocessed. With throttling, the same job finishes in 20 minutes without a single error."
          }),
          sec("AA-03_SIMPLE_MEANING", {
            term: "Rate Limits and Throttling",
            explanation: "Rate limits are restrictions APIs put on how many requests you can send in a given time period. Throttling is the technique of slowing down your requests to stay under those limits.",
            analogy: "A rate limit is like a speed limit on a highway. Throttling is your cruise control that keeps you at exactly the speed limit — fast enough to make progress, slow enough to avoid a ticket."
          }),
          sec("AA-04_WHERE_USED", {
            examples: [
              { company: "OpenAI", use: "Limits requests per minute and tokens per minute depending on your plan tier." },
              { company: "Twitter/X API", use: "Free tier allows 1,500 tweets per month and 15 read requests per 15 minutes." },
              { company: "Google Sheets API", use: "Limits to 300 requests per minute per project." },
              { company: "Shopify", use: "Uses a leaky bucket algorithm — 2 requests per second with a 40-request burst capacity." }
            ]
          }),
          sec("AA-05_FLOW", {
            input: "You need to send 500 API requests to update contacts in your CRM",
            steps: [
              "Check the API docs: the CRM allows 100 requests per minute",
              "Calculate the delay: 60 seconds / 100 requests = 0.6 seconds between requests",
              "Configure the automation to add a 0.7-second delay between each request (with safety margin)",
              "Monitor the response headers for X-RateLimit-Remaining to adjust speed dynamically"
            ],
            output: "All 500 requests complete in about 6 minutes without a single rate limit error"
          }),
          sec("AA-06_TOOL_SETUP", {
            items: [
              { tool: "Make.com", action: "Open a scenario that processes multiple records in a batch." },
              { tool: "API documentation", action: "Find the rate limit docs for any API you use (OpenAI, Google Sheets, CRM). Note the limits." },
              { tool: "Google Sheets", action: "Create a test sheet with 50+ rows to simulate batch processing." }
            ]
          }),
          sec("AA-07_BUILD_STEPS", {
            steps: [
              { title: "Find your API's rate limits", instruction: "Check the API documentation for your most-used APIs. Note: requests per minute, requests per day, and any burst limits.", tip: "Common limits: OpenAI = 60 RPM on free tier. Google Sheets = 300 RPM. Slack = 1 message per second." },
              { title: "Calculate the safe request interval", instruction: "Divide the time period by the limit: 60 seconds / 60 RPM = 1 request per second. Add 20% buffer: 1.2 seconds between requests.", tip: "The 20% buffer prevents hitting the limit due to timing variations. It is better to be slightly slower than to get blocked." },
              { title: "Add delays in Make.com", instruction: "In your batch-processing scenario, add a Sleep module between the data source and the API call. Set it to the calculated interval.", tip: "Make.com's Sleep module pauses execution for the specified duration between each iteration." },
              { title: "Process in batches", instruction: "Instead of processing all records at once, break them into batches of 50. Process each batch, wait 1 minute, then process the next.", tip: "This is useful when you have thousands of records. Batching prevents long-running scenarios from timing out." },
              { title: "Handle 429 responses", instruction: "Add an error handler that specifically catches HTTP 429 (Too Many Requests). When caught, wait for the Retry-After time specified in the response headers, then retry.", tip: "The 429 response usually includes a Retry-After header telling you exactly how long to wait." },
              { title: "Monitor rate limit headers", instruction: "After each API call, check the response headers for X-RateLimit-Remaining. If it drops below 10, add an extra delay.", tip: "Not all APIs provide these headers, but when they do, they are the best way to throttle dynamically." },
              { title: "Test with a large batch", instruction: "Load 50+ records into a Sheet and run your throttled automation. Monitor for any rate limit errors.", tip: "If you get zero 429 errors and all records process, your throttling is working correctly." }
            ]
          }),
          sec("AA-08_TEST", {
            checks: [
              { test: "Process 50 records with throttling enabled", expected: "All 50 records process successfully with zero rate limit errors" },
              { test: "Process 50 records without throttling (temporarily)", expected: "You may hit rate limits and get 429 errors — proving throttling is necessary" },
              { test: "Check execution time", expected: "50 records at 1.2 seconds each = about 60 seconds total. Confirm it matches expectations." },
              { test: "Force a 429 error by removing delays", expected: "Error handler catches it, waits the specified time, and retries successfully" }
            ]
          }),
          sec("AA-09_MISTAKES", {
            mistakes: [
              { mistake: "Ignoring rate limits because your small tests never hit them", fix: "Small tests use few requests. Production data can be 100x larger. Plan for production volumes from the start." },
              { mistake: "Adding too much delay, making the automation painfully slow", fix: "Calculate the exact interval from the rate limit docs and add only 20% buffer. Do not guess." },
              { mistake: "Not handling the 429 response code specifically", fix: "A generic error handler may retry too soon. Handle 429 specifically: read the Retry-After header and wait that exact duration." },
              { mistake: "Sending burst requests when the API uses a leaky bucket model", fix: "Some APIs like Shopify use leaky bucket: you can burst a few requests but must maintain a steady rate. Spread requests evenly." },
              { mistake: "Not tracking API usage against daily limits", fix: "Some APIs have daily caps (e.g., 10,000 requests per day). Track your daily usage in a Sheet and stop before hitting the cap." },
              { mistake: "Running multiple automations against the same API simultaneously", fix: "If two scenarios both call the same API, they share the rate limit. Coordinate timing or reduce each scenario's rate." }
            ]
          }),
          sec("AA-10_UPGRADE", {
            ideas: [
              "Build a dynamic throttler that reads rate limit headers and adjusts speed in real time",
              "Create an API usage dashboard that tracks daily and monthly request counts",
              "Implement request queuing: all API calls go through a central queue that enforces the rate limit"
            ],
            challenge: "Build a self-adjusting throttle: after each API call, read the X-RateLimit-Remaining header. If remaining > 50%, use normal speed. If < 50%, slow down. If < 10%, pause for 30 seconds."
          }),
          sec("AA-11_MINI_TASK", {
            task: "Add throttling to a batch-processing automation. Process 50 records with proper delays and verify zero rate limit errors.",
            deliverable: "Screenshot of the Make.com execution log showing all 50 records processed with consistent timing and no errors.",
            time: "20 minutes"
          }),
          sec("AA-12_MONEY_ANGLE", {
            service: "API Throttling and Optimization",
            price_range: "$400–$1,200 per automation",
            pitch: "Businesses hit rate limits and their automations break. You add smart throttling, batch processing, and 429 handling so their automations run reliably at maximum speed without ever getting blocked."
          }),
          sec("AA-13_KEY_NOTES", {
            notes: [
              "Every API has rate limits. Check the docs before building any automation that processes batches.",
              "Calculate the safe interval: time period / limit + 20% buffer.",
              "Handle HTTP 429 (Too Many Requests) specifically — read the Retry-After header and wait.",
              "Break large datasets into batches to avoid timeouts and manage rate limits.",
              "If multiple automations call the same API, they share the rate limit — coordinate accordingly."
            ]
          }),
          sec("AA-14_QUICK_QUIZ", {
            questions: [
              { question: "What does HTTP status code 429 mean?", options: ["Server error", "Not found", "Too many requests — you hit the rate limit", "Unauthorized"], correct: 2, explanation: "429 Too Many Requests means you have exceeded the API's rate limit. The response usually includes a Retry-After header telling you how long to wait." },
              { question: "If an API allows 120 requests per minute, what delay should you add between requests?", options: ["0 seconds", "0.5 seconds + 20% buffer = 0.6 seconds", "5 seconds", "60 seconds"], correct: 1, explanation: "120 requests per minute = 1 request per 0.5 seconds. Adding 20% buffer gives 0.6 seconds between requests to stay safely under the limit." },
              { question: "What is a leaky bucket rate limit?", options: ["A limit that leaks data", "A system allowing short bursts but enforcing a steady average rate", "A broken API", "A rate limit that never resets"], correct: 1, explanation: "Leaky bucket allows small bursts of requests but drains at a fixed rate. You can send a few fast requests, but must maintain a steady average pace." }
            ]
          })
        ]
      },

      /* ---------- M7-L5: Monitoring and Alerting ---------- */
      {
        title: "Monitoring and Alerting",
        slug: "monitoring-alerting",
        goal: "Set up monitoring dashboards and alerts so you know the instant something goes wrong with your automations.",
        summary: "You built a monitoring system that tracks automation health, logs performance metrics, and sends alerts when failures or anomalies are detected.",
        sections: [
          sec("AA-01_TODAYS_WIN", {
            headline: "You will know about automation problems before your clients do",
            description: "Today you set up a monitoring dashboard and alert system that watches all your automations. When something breaks, you get notified in seconds — not days later when a client complains."
          }),
          sec("AA-02_WHY_CARE", {
            benefit: "An automation that breaks silently costs more than one that never worked. Monitoring catches problems early so you can fix them before they impact clients, revenue, or data quality.",
            real_example: "An agency ran 15 automations for 8 clients. One client's lead capture automation failed on a Monday. Without monitoring, they didn't discover it until Thursday when the client called asking why there were no new leads. 4 days of lost leads. With monitoring, they would have known in 60 seconds."
          }),
          sec("AA-03_SIMPLE_MEANING", {
            term: "Monitoring and Alerting",
            explanation: "Monitoring means continuously tracking how your automations are performing — are they running, are they succeeding, how fast are they? Alerting means sending you a notification the instant something goes wrong or looks unusual.",
            analogy: "Monitoring is like a security camera system. It watches everything 24/7. Alerting is the alarm that goes off when the camera detects something unusual. You don't need to watch the cameras constantly — the alarm tells you when to look."
          }),
          sec("AA-04_WHERE_USED", {
            examples: [
              { company: "PagerDuty", use: "Industry-standard monitoring and alerting platform that notifies on-call engineers when production systems fail." },
              { company: "Datadog", use: "Monitors application performance, API response times, and error rates with customizable alerts." },
              { company: "Make.com", use: "Built-in scenario history shows execution status, but custom monitoring adds proactive alerting and dashboards." },
              { company: "Automation agencies", use: "Build custom monitoring dashboards to track all client automations from a single view." }
            ]
          }),
          sec("AA-05_FLOW", {
            input: "Your automations run throughout the day across multiple clients",
            steps: [
              "Each automation logs its execution status (success/failure), processing time, and record count to a central Monitoring Sheet",
              "A scheduled monitoring scenario runs every 30 minutes and checks for anomalies: failures, unusual processing times, or missing executions",
              "If an anomaly is detected, an alert is sent via Slack with the scenario name, error details, and severity",
              "A daily summary email is sent each morning with overall health: total runs, success rate, failures, and items processed"
            ],
            output: "You have real-time visibility into all automations plus proactive alerts and daily health reports"
          }),
          sec("AA-06_TOOL_SETUP", {
            items: [
              { tool: "Google Sheets", action: "Create a sheet called Automation Monitor with columns: Timestamp, Scenario Name, Status (Success/Failed), Records Processed, Execution Time (sec), Error Message." },
              { tool: "Make.com", action: "You will add logging to existing scenarios and build a separate monitoring scenario." },
              { tool: "Slack", action: "Create a #automation-alerts Slack channel for real-time failure notifications." },
              { tool: "Gmail", action: "For daily summary emails." }
            ]
          }),
          sec("AA-07_BUILD_STEPS", {
            steps: [
              { title: "Create the monitoring Sheet", instruction: "Set up the Automation Monitor sheet with all columns. This is your central telemetry database.", tip: "Add a second tab called Daily Summary for aggregated daily metrics." },
              { title: "Add logging to each scenario", instruction: "At the end of every existing automation, add a Google Sheets > Add a Row to the Monitor sheet. Log: timestamp, scenario name, Success, record count, execution time.", tip: "Use Make.com's built-in functions: now for timestamp and the scenario name as a static value." },
              { title: "Add error logging", instruction: "In every error handler, also log to the Monitor sheet but with Status = Failed and the error message.", tip: "Now both successes and failures are tracked in one place." },
              { title: "Build the health check scenario", instruction: "Create a new scenario with a Schedule trigger running every 30 minutes. Add Google Sheets > Search Rows to check for Failed entries in the last 30 minutes.", tip: "This scenario is your watchdog. It monitors the other scenarios." },
              { title: "Add alerting", instruction: "If the health check finds failures, send a Slack message: ALERT: {{Scenario Name}} failed at {{Timestamp}}. Error: {{Error Message}}. Records affected: {{Records Processed}}.", tip: "Include enough context in the alert so you can start debugging immediately." },
              { title: "Build the daily summary", instruction: "Create another scheduled scenario that runs at 8 AM daily. It queries the Monitor sheet for yesterday's data and calculates: total runs, success rate, total records processed, and any failures.", tip: "Send the summary as a formatted email with green (all good), yellow (some failures), or red (critical failures) indicators." },
              { title: "Add missing execution detection", instruction: "In the health check, also look for scenarios that should have run but did not. Example: if the lead capture automation has not logged a success in 6 hours, something may be wrong.", tip: "This catches the sneaky case where a scenario is stuck or disabled and not producing errors — just silence." },
              { title: "Test the full system", instruction: "Intentionally break one scenario. Verify: the error is logged, the health check catches it, Slack alert fires, and the daily summary reflects the failure.", tip: "Then fix the scenario and verify the next health check shows all green." }
            ]
          }),
          sec("AA-08_TEST", {
            checks: [
              { test: "Run a successful automation", expected: "Success entry appears in the Monitor sheet with timestamp and record count" },
              { test: "Trigger a failure", expected: "Failed entry appears in Monitor sheet AND Slack alert fires within 30 minutes" },
              { test: "Check the daily summary", expected: "Email arrives at 8 AM with correct counts for total runs, successes, and failures" },
              { test: "Disable a scenario for 6 hours", expected: "Missing execution alert fires, warning that the scenario has not run recently" },
              { test: "Verify no false alarms", expected: "Health check runs but sends no alerts when everything is working normally" }
            ]
          }),
          sec("AA-09_MISTAKES", {
            mistakes: [
              { mistake: "Not monitoring at all because automations are working fine", fix: "Monitoring exists for when things stop being fine. Set it up while everything works, so it catches the first failure." },
              { mistake: "Monitoring only failures, not successes", fix: "Tracking successes lets you calculate success rates, detect trends, and spot degrading performance before it becomes a failure." },
              { mistake: "Sending every alert to the same Slack channel", fix: "Use channels: #critical-alerts for failures, #automation-log for routine updates. Don't mix them." },
              { mistake: "Not including enough context in alerts", fix: "An alert that just says automation failed is useless. Include scenario name, timestamp, error message, and affected data." },
              { mistake: "Forgetting to monitor the monitoring scenario itself", fix: "If the watchdog crashes, who watches the watchdog? Add a simple heartbeat: the monitoring scenario sends a I'm alive message daily." },
              { mistake: "Building the dashboard but never checking it", fix: "Set up the daily summary email so the dashboard comes to you. Proactive > reactive." }
            ]
          }),
          sec("AA-10_UPGRADE", {
            ideas: [
              "Build a visual dashboard using Google Looker Studio connected to your Monitor sheet",
              "Add performance trending: track execution times over time and alert when they increase by 50%",
              "Implement heartbeat monitoring: each automation pings a health endpoint, and you alert when the ping stops",
              "Create a client-facing status page showing automation health for each client"
            ],
            challenge: "Build a Google Looker Studio dashboard connected to your Automation Monitor sheet that shows: success rate by scenario, failure trends over time, and a real-time status indicator."
          }),
          sec("AA-11_MINI_TASK", {
            task: "Add monitoring logging to 3 existing automations and build the health check scenario with Slack alerting.",
            deliverable: "Screenshot of the Monitoring Sheet with logged entries, the health check scenario in Make.com, and a test Slack alert.",
            time: "30 minutes"
          }),
          sec("AA-12_MONEY_ANGLE", {
            service: "Automation Monitoring and Alerting System",
            price_range: "$800–$2,000 setup + $200/month management",
            pitch: "Businesses run automations blind — they only know something broke when customers complain. You set up a monitoring system with dashboards, real-time alerts, and daily health reports so they catch problems in seconds, not days."
          }),
          sec("AA-13_KEY_NOTES", {
            notes: [
              "Monitoring is not optional for production automations — it is the difference between catching problems in seconds vs. days.",
              "Log both successes and failures. Success tracking enables health metrics and trend analysis.",
              "Send alerts with full context: scenario name, timestamp, error message, and affected records.",
              "Daily summary emails bring the dashboard to you — no need to remember to check it.",
              "Monitor the monitor: add a heartbeat check so you know the monitoring system itself is running."
            ]
          }),
          sec("AA-14_QUICK_QUIZ", {
            questions: [
              { question: "Why should you log successful automation runs, not just failures?", options: ["To fill up the spreadsheet", "To calculate success rates and detect degrading performance trends", "Because Make.com requires it", "To increase storage costs"], correct: 1, explanation: "Logging successes lets you calculate success rates, spot trends (like increasing execution times), and detect missing runs — all impossible with failure-only logging." },
              { question: "What should a good alert message include?", options: ["Just the word Error", "Scenario name, timestamp, error details, and affected data", "A link to the Make.com dashboard", "Nothing — alerts should be silent"], correct: 1, explanation: "A good alert includes everything you need to start investigating: which scenario, when it happened, what went wrong, and what data was affected." },
              { question: "What is a heartbeat check for monitoring?", options: ["A health check that confirms the monitoring system itself is running", "A check of your heart rate", "A rate limit check", "A daily backup"], correct: 0, explanation: "A heartbeat is a regular I'm alive signal from the monitoring system. If the heartbeat stops, you know the monitor itself has crashed — otherwise you would have no way of knowing." }
            ]
          })
        ]
      }
    ]
  }
];

module.exports = { MODULES_4_7 };
