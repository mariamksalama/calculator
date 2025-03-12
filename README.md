Part 1: SEO Improvement
Below, I will be discussing my top 3 suggestions for improving SEO, taking into account the time it would take for each one and the importance.
I have used Screaming Frog, Neil Patel, and SEMrush to reach these conclusions and will mention the data I obtained from each tool and how that affected my decision:

1. Fixing Broken Links
There are a couple of broken links on the page:

Luton Airport Storage
Delivery Page
I was able to obtain these links using Screaming Frog and manually tested them myself. The Luton storage link can be accessed from the "Can I store my luggage at the airports in London?" question and the "Airline baggage allowance" in the footer.

After some research on the effect of broken links, I learned that they can lead to a poor user experience, negatively impact rankings, and reduce crawler efficiency. I then checked the status of the page and found that several sections have not been crawled.

Since this is a quick fix that requires minimal time, I believe it’s worth doing right away.

2. Pagination URL Not in Anchor Tags
This appeared as a high-priority issue on Screaming Frog.

Some webpages include rel="next" and rel="prev" attributes to indicate pagination, but the actual paginated URLs are not present as clickable links (<a> tags) on the page.

Why This Matters:
It affects user navigation and could lead to crawler problems, as Google might struggle to crawl and index these pages properly.
Solution:
Ensure that the paginated pages include proper <a> tags linking to the next and previous pages.
Since this is also a quick fix, I believe it’s worth investing time in.
3. Changing Page Titles
This affects over 20% of the Stasher website, which leads me to believe that it could be a great opportunity for growth.

Page titles over 60 characters or 561 pixels can be truncated.
Titles below 200 pixels or 30 characters allow for an opportunity to add more keywords, affecting search results.
I’ve also carried out a Neil Patel analysis of the Stasher website, which indicated that Stasher’s H1s don’t necessarily include its most popular keywords.

Example:
The London Luggage Storage page has a 20-character title, meaning there’s room for more keyword usage!

Since Stasher’s growth is mainly organic, rethinking the titles could directly impact SEO and lead to great growth.

Additional Findings: Page Speed
I’ve also run a PageSpeed test, and the results concluded that the website is at:

36 performance on mobile 📱
44 performance on desktop 🖥️
This, to me, speaks high priority, but it would require planning and dedicated time to fix, so I’d put it as a goal rather than an immediate task.

Part 2: Calculator App
This is my calculator app.
I’ve added a couple of extra buttons, as I noticed we didn’t have an "=" button. There’s also a burger menu, which shows the history.

I thought this would be a fun feature, as it allows you to directly make changes to the previous operation rather than having to re-enter all the values again if you make a mistake!

This calculator supports:
✅ Basic arithmetic operations: +, -, *, /, % (both percentage & modulus).
✅ Works on mouse, keyboard, and touch screens.
✅ Screen reader-friendly!

Live Demo:
🔗 Try the app here!

Development Details:
During development, I used cursor for autocomplete, created inclusive test cases, and documented my code.

I’ve also deployed my app, so you can try it out without having to run it locally.

Features
*Basic arithmetic operations (+, -, /, , %)
Modern, responsive design
Built with React and TypeScript
Vite for fast development
Tech Stack
🔹 React
🔹 TypeScript
🔹 Vite
🔹 Material-UI

How to Run the Project Locally
sh
Copy
Edit
npm install
npm run dev
Now your text is formatted properly with bolded titles, bullet points, and spacing, making it easier to read and visually structured. Let me know if you need any modifications! 🚀
