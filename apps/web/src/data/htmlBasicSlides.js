// HTML Basic Elements - Presentation Slides
// Each slide contains minimal content with nested subtopics for detailed explanation

export const htmlBasicSlides = [
  // Slide 1: Introduction
  {
    title: "HTML Basic Elements",
    subtitle: "Introduction to HTML",
    content: "HTML (HyperText Markup Language) is the foundation of web development. It structures content on web pages using elements and tags.",
    bullets: [
      "HTML stands for HyperText Markup Language",
      "It's the standard markup language for creating web pages",
      "HTML elements are the building blocks of web pages",
      "Each element has a specific purpose and meaning"
    ],
    subtopic: {
      title: "What is HTML?",
      explanation: "HTML is not a programming language, but a markup language that tells browsers how to structure and display content. It uses tags to define elements like headings, paragraphs, images, and links.",
      example: "<p>This is a paragraph element</p>"
    }
  },

  // Slide 2: HTML Document Structure
  {
    title: "HTML Document Structure",
    subtitle: "Basic HTML Template",
    content: "Every HTML document follows a standard structure with essential elements that define the page.",
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My First Web Page</title>
</head>
<body>
  <h1>Welcome to HTML</h1>
  <p>This is my first web page!</p>
</body>
</html>`,
    bullets: [
      "<!DOCTYPE html> - Declares the document type",
      "<html> - Root element of the page",
      "<head> - Contains metadata and page information",
      "<body> - Contains visible content"
    ],
    subtopic: {
      title: "Document Type Declaration",
      explanation: "The DOCTYPE declaration tells the browser which version of HTML you're using. HTML5 uses the simple <!DOCTYPE html> declaration.",
      example: "<!DOCTYPE html>"
    }
  },

  // Slide 3: Headings
  {
    title: "HTML Headings",
    subtitle: "h1 to h6 Elements",
    content: "Headings define the hierarchy and structure of your content. Use h1 for the main title and h2-h6 for subheadings.",
    code: `<h1>Main Heading (Largest)</h1>
<h2>Subheading</h2>
<h3>Section Heading</h3>
<h4>Subsection Heading</h4>
<h5>Minor Heading</h5>
<h6>Smallest Heading</h6>`,
    output: `<h1>Main Heading (Largest)</h1>
<h2>Subheading</h2>
<h3>Section Heading</h3>`,
    realWorldExample: {
      description: "Headings are used everywhere on websites - from article titles to navigation menus. For example, a news website uses h1 for the main article title, h2 for section headers, and h3 for subsections.",
      example: `<h1>Breaking News: Technology Update</h1>
<h2>Latest Developments</h2>
<h3>Tech Industry Trends</h3>`
    },
    subtopic: {
      title: "Heading Hierarchy",
      explanation: "Always maintain proper heading hierarchy. Don't skip levels (e.g., don't use h3 after h1). This helps with SEO and accessibility.",
      example: "<h1>Main Title</h1>\n<h2>First Section</h2>\n<h3>Subsection</h3>"
    }
  },

  // Slide 4: Paragraphs
  {
    title: "Paragraph Element",
    subtitle: "<p> Tag",
    content: "The paragraph element is used to display blocks of text. It automatically adds spacing before and after the content.",
    code: `<p>This is a paragraph of text. 
It can contain multiple sentences and 
will wrap automatically.</p>

<p>This is another paragraph. 
Each paragraph is separated by 
default spacing.</p>`,
    output: `<p>This is a paragraph of text. It can contain multiple sentences and will wrap automatically.</p>

<p>This is another paragraph. Each paragraph is separated by default spacing.</p>`,
    realWorldExample: {
      description: "Paragraphs are used in blog posts, articles, and any text content. For example, a blog post about cooking uses multiple paragraph elements to separate different sections of the recipe instructions.",
      example: `<p>Today we'll learn how to make the perfect pasta.</p>
<p>Start by boiling water in a large pot.</p>
<p>Add salt to the water for flavor.</p>`
    },
    subtopic: {
      title: "Text Formatting",
      explanation: "You can format text inside paragraphs using inline elements like <strong> for bold, <em> for italic, and <br> for line breaks.",
      example: "<p>This is <strong>bold</strong> and this is <em>italic</em>.</p>"
    }
  },

  // Slide 5: Links
  {
    title: "Anchor Element",
    subtitle: "<a> Tag - Creating Links",
    content: "The anchor element creates hyperlinks that connect pages together. It's the foundation of web navigation.",
    code: `<a href="https://www.example.com">Visit Example</a>
<a href="/about.html">About Us</a>
<a href="#section1">Jump to Section</a>
<a href="mailto:contact@example.com">Email Us</a>`,
    output: `<a href="https://www.example.com">Visit Example</a>
<a href="/about.html">About Us</a>
<a href="#section1">Jump to Section</a>
<a href="mailto:contact@example.com">Email Us</a>`,
    realWorldExample: {
      description: "Links are everywhere on websites - navigation menus, social media buttons, 'Read More' links in articles, and footer links. For example, Amazon uses links for product navigation, category browsing, and account pages.",
      example: `<nav>
  <a href="/products">Products</a>
  <a href="/about">About</a>
  <a href="/contact">Contact</a>
</nav>`
    },
    subtopic: {
      title: "Link Attributes",
      explanation: "The href attribute specifies the destination URL. You can also use target='_blank' to open links in a new tab, and rel='nofollow' for SEO purposes.",
      example: `<a href="https://example.com" target="_blank" rel="noopener">Open in New Tab</a>`
    }
  },

  // Slide 6: Images
  {
    title: "Image Element",
    subtitle: "<img> Tag",
    content: "The image element displays pictures on your web page. Always include alt text for accessibility.",
    code: `<img src="photo.jpg" alt="Beautiful sunset">
<img src="logo.png" alt="Company Logo" width="200" height="100">
<img src="https://example.com/image.jpg" alt="Remote Image">`,
    realWorldExample: {
      description: "Images are used throughout websites - product photos on e-commerce sites, hero images on landing pages, profile pictures on social media, and icons in navigation menus. For example, Instagram's entire interface is built around image elements.",
      example: `<img src="product-photo.jpg" alt="Blue T-Shirt" width="300">
<img src="user-avatar.jpg" alt="User Profile Picture" width="50">`
    },
    subtopic: {
      title: "Image Attributes",
      explanation: "The src attribute specifies the image source (file path or URL). The alt attribute provides alternative text for screen readers and when images fail to load. Width and height attributes control image dimensions.",
      example: `<img src="image.jpg" alt="Description" width="400" height="300">`
    }
  },

  // Slide 7: Lists - Unordered
  {
    title: "Unordered Lists",
    subtitle: "<ul> and <li> Tags",
    content: "Unordered lists create bulleted lists for items without a specific order or sequence.",
    code: `<ul>
  <li>First item</li>
  <li>Second item</li>
  <li>Third item</li>
</ul>`,
    output: `<ul>
  <li>First item</li>
  <li>Second item</li>
  <li>Third item</li>
</ul>`,
    realWorldExample: {
      description: "Unordered lists are used for navigation menus, feature lists, shopping cart items, and any collection of related items. For example, a restaurant menu uses unordered lists for appetizers, main courses, and desserts.",
      example: `<ul>
  <li>Margherita Pizza</li>
  <li>Caesar Salad</li>
  <li>Chocolate Cake</li>
</ul>`
    },
    subtopic: {
      title: "Nested Lists",
      explanation: "You can nest lists inside other lists to create hierarchical structures. This is useful for subcategories and multi-level navigation.",
      example: `<ul>
  <li>Main Item
    <ul>
      <li>Sub Item 1</li>
      <li>Sub Item 2</li>
    </ul>
  </li>
</ul>`
    }
  },

  // Slide 8: Lists - Ordered
  {
    title: "Ordered Lists",
    subtitle: "<ol> and <li> Tags",
    content: "Ordered lists create numbered lists for items that follow a specific sequence or order.",
    code: `<ol>
  <li>First step</li>
  <li>Second step</li>
  <li>Third step</li>
</ol>`,
    output: `<ol>
  <li>First step</li>
  <li>Second step</li>
  <li>Third step</li>
</ol>`,
    realWorldExample: {
      description: "Ordered lists are perfect for step-by-step instructions, rankings, recipes, and any sequential information. For example, a recipe website uses ordered lists for cooking instructions, and a tutorial site uses them for step-by-step guides.",
      example: `<ol>
  <li>Preheat oven to 350°F</li>
  <li>Mix ingredients in a bowl</li>
  <li>Pour into baking pan</li>
  <li>Bake for 30 minutes</li>
</ol>`
    },
    subtopic: {
      title: "List Types",
      explanation: "You can customize ordered lists using the type attribute (1, A, a, I, i) to change numbering style. The start attribute allows you to begin numbering from a specific number.",
      example: `<ol type="A">
  <li>Option A</li>
  <li>Option B</li>
</ol>`
    }
  },

  // Slide 9: Div and Span
  {
    title: "Div and Span",
    subtitle: "Container Elements",
    content: "Div and span are generic container elements used for grouping and styling content. Div is block-level, span is inline.",
    code: `<div>
  <h2>Section Title</h2>
  <p>This is a block-level container.</p>
</div>

<p>This is <span style="color: red;">inline</span> text.</p>`,
    output: `<div style="border: 2px solid blue; padding: 10px;">
  <h2>Section Title</h2>
  <p>This is a block-level container.</p>
</div>

<p>This is <span style="color: red;">inline</span> text.</p>`,
    realWorldExample: {
      description: "Div elements are used to create sections, layouts, and containers throughout websites. For example, a news website uses divs to separate header, main content, sidebar, and footer sections. Span is used for styling specific words or phrases within text.",
      example: `<div class="header">Website Header</div>
<div class="content">Main Content Area</div>
<div class="footer">Footer Information</div>

<p>Price: <span class="price">$29.99</span></p>`
    },
    subtopic: {
      title: "Block vs Inline",
      explanation: "Div is a block-level element that takes full width and creates a new line. Span is an inline element that only takes the space it needs and stays on the same line.",
      example: `<div>Block element (full width)</div>
<span>Inline element (only needed width)</span>`
    }
  },

  // Slide 10: Forms - Input
  {
    title: "Form Input Elements",
    subtitle: "Text, Email, Password",
    content: "Input elements allow users to enter data. Different input types serve different purposes.",
    code: `<form>
  <input type="text" placeholder="Enter your name">
  <input type="email" placeholder="Enter your email">
  <input type="password" placeholder="Enter password">
  <input type="submit" value="Submit">
</form>`,
    output: `<form>
  <input type="text" placeholder="Enter your name" style="padding: 8px; margin: 5px;">
  <input type="email" placeholder="Enter your email" style="padding: 8px; margin: 5px;">
  <input type="password" placeholder="Enter password" style="padding: 8px; margin: 5px;">
  <input type="submit" value="Submit" style="padding: 8px 20px; margin: 5px;">
</form>`,
    realWorldExample: {
      description: "Input elements are used in login forms, registration forms, search bars, contact forms, and checkout processes. For example, when you sign up for a social media account, you use text inputs for your name, email input for your email, and password input for your password.",
      example: `<form>
  <input type="text" placeholder="Full Name">
  <input type="email" placeholder="Email Address">
  <input type="password" placeholder="Password">
  <button type="submit">Create Account</button>
</form>`
    },
    subtopic: {
      title: "Input Types",
      explanation: "HTML5 introduced many input types: text, email, password, number, date, checkbox, radio, file, and more. Each type provides appropriate validation and user interface.",
      example: `<input type="text" placeholder="Text">
<input type="number" placeholder="Number">
<input type="date" placeholder="Date">`
    }
  },

  // Slide 11: Buttons
  {
    title: "Button Element",
    subtitle: "<button> Tag",
    content: "Buttons trigger actions when clicked. They're essential for user interactions on web pages.",
    code: `<button>Click Me</button>
<button type="submit">Submit Form</button>
<button type="reset">Reset</button>
<button disabled>Disabled Button</button>`,
    output: `<button style="padding: 10px 20px; margin: 5px; background: #3b82f6; color: white; border: none; border-radius: 5px; cursor: pointer;">Click Me</button>
<button style="padding: 10px 20px; margin: 5px; background: #10b981; color: white; border: none; border-radius: 5px; cursor: pointer;">Submit Form</button>
<button style="padding: 10px 20px; margin: 5px; background: #ef4444; color: white; border: none; border-radius: 5px; cursor: pointer;">Reset</button>
<button style="padding: 10px 20px; margin: 5px; background: #9ca3af; color: white; border: none; border-radius: 5px; cursor: not-allowed;" disabled>Disabled Button</button>`,
    realWorldExample: {
      description: "Buttons are used for actions like 'Add to Cart' on shopping sites, 'Like' and 'Share' on social media, 'Subscribe' on newsletters, and 'Download' for files. For example, YouTube uses buttons for play, pause, subscribe, and like actions.",
      example: `<button>Add to Cart</button>
<button>Subscribe</button>
<button>Download</button>
<button>Share</button>`
    },
    subtopic: {
      title: "Button Types",
      explanation: "Buttons can have different types: button (default), submit (submits form), and reset (resets form). You can also disable buttons and add click handlers with JavaScript.",
      example: `<button type="button">Regular Button</button>
<button type="submit">Submit Button</button>`
    }
  },

  // Slide 12: Tables
  {
    title: "Table Element",
    subtitle: "<table>, <tr>, <td>, <th>",
    content: "Tables organize data into rows and columns. Perfect for displaying structured information.",
    code: `<table border="1">
  <tr>
    <th>Name</th>
    <th>Age</th>
    <th>City</th>
  </tr>
  <tr>
    <td>John</td>
    <td>25</td>
    <td>New York</td>
  </tr>
  <tr>
    <td>Sarah</td>
    <td>30</td>
    <td>London</td>
  </tr>
</table>`,
    output: `<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <th style="background: #3b82f6; color: white; padding: 10px;">Name</th>
    <th style="background: #3b82f6; color: white; padding: 10px;">Age</th>
    <th style="background: #3b82f6; color: white; padding: 10px;">City</th>
  </tr>
  <tr>
    <td style="padding: 8px; border: 1px solid #ddd;">John</td>
    <td style="padding: 8px; border: 1px solid #ddd;">25</td>
    <td style="padding: 8px; border: 1px solid #ddd;">New York</td>
  </tr>
  <tr>
    <td style="padding: 8px; border: 1px solid #ddd;">Sarah</td>
    <td style="padding: 8px; border: 1px solid #ddd;">30</td>
    <td style="padding: 8px; border: 1px solid #ddd;">London</td>
  </tr>
</table>`,
    realWorldExample: {
      description: "Tables are used for data comparison, pricing plans, schedules, product specifications, and financial data. For example, e-commerce sites use tables to compare product features, and sports websites use them to display match schedules and statistics.",
      example: `<table>
  <tr>
    <th>Product</th>
    <th>Price</th>
    <th>Rating</th>
  </tr>
  <tr>
    <td>Laptop</td>
    <td>$999</td>
    <td>4.5/5</td>
  </tr>
</table>`
    },
    subtopic: {
      title: "Table Structure",
      explanation: "Tables consist of <table> (container), <tr> (table row), <th> (table header), and <td> (table data/cell). Use <thead>, <tbody>, and <tfoot> for better structure.",
      example: `<table>
  <thead>
    <tr><th>Header</th></tr>
  </thead>
  <tbody>
    <tr><td>Data</td></tr>
  </tbody>
</table>`
    }
  },

  // Slide 13: Semantic HTML
  {
    title: "Semantic HTML Elements",
    subtitle: "Meaningful Structure",
    content: "Semantic elements clearly describe their meaning to both browsers and developers. They improve accessibility and SEO.",
    code: `<header>Page Header</header>
<nav>Navigation Menu</nav>
<main>
  <article>Main Article</article>
  <section>Section Content</section>
</main>
<aside>Sidebar</aside>
<footer>Page Footer</footer>`,
    bullets: [
      "<header> - Page or section header",
      "<nav> - Navigation links",
      "<main> - Main content area",
      "<article> - Independent content",
      "<section> - Thematic grouping",
      "<aside> - Sidebar content",
      "<footer> - Page or section footer"
    ],
    realWorldExample: {
      description: "Semantic HTML is used in modern websites for better structure. For example, a blog website uses <header> for the site header, <nav> for the menu, <article> for blog posts, <aside> for related articles, and <footer> for site information.",
      example: `<header>Website Logo and Navigation</header>
<main>
  <article>
    <h1>Blog Post Title</h1>
    <p>Blog content...</p>
  </article>
</main>
<footer>Copyright Information</footer>`
    },
    subtopic: {
      title: "Why Semantic HTML?",
      explanation: "Semantic HTML improves accessibility for screen readers, helps with SEO (search engines understand content better), makes code more maintainable, and provides better structure for styling.",
      example: "Use <article> instead of <div> for blog posts"
    }
  },

  // Slide 14: Summary
  {
    title: "HTML Elements Summary",
    subtitle: "Key Takeaways",
    content: "You've learned the fundamental HTML elements needed to build web pages. Practice using these elements to create your own pages!",
    bullets: [
      "HTML structures content using elements and tags",
      "Headings (h1-h6) create content hierarchy",
      "Paragraphs (<p>) display text blocks",
      "Links (<a>) connect pages together",
      "Images (<img>) display pictures",
      "Lists (<ul>, <ol>) organize information",
      "Forms (<form>, <input>) collect user data",
      "Tables organize structured data",
      "Semantic elements improve structure and accessibility"
    ],
    subtopic: {
      title: "Next Steps",
      explanation: "Continue learning HTML attributes, CSS for styling, and JavaScript for interactivity. Practice by building simple web pages using these elements.",
      example: "Try creating a personal webpage with headings, paragraphs, images, and links!"
    }
  }
];
