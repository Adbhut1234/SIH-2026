const fs = require('fs');

const html = fs.readFileSync('home/code.html', 'utf8');

// extract content between <body ...> and </body>
let bodyContent = html.match(/<body[^>]*>([\s\S]*?)<\/body>/)[1];

// replace class=" with className="
bodyContent = bodyContent.replace(/class="/g, 'className="');
// replace <!-- with {/* and --> with */}
bodyContent = bodyContent.replace(/<!--/g, '{/*');
bodyContent = bodyContent.replace(/-->/g, '*/}');
// Replace self closing tags
bodyContent = bodyContent.replace(/<img([^>]*?)(?<!\/)>/g, '<img$1 />');
bodyContent = bodyContent.replace(/<br([^>]*?)(?<!\/)>/g, '<br$1 />');
bodyContent = bodyContent.replace(/<input([^>]*?)(?<!\/)>/g, '<input$1 />');
bodyContent = bodyContent.replace(/<hr([^>]*?)(?<!\/)>/g, '<hr$1 />');
// SVG attributes
bodyContent = bodyContent.replace(/stroke-width/g, 'strokeWidth');
bodyContent = bodyContent.replace(/stroke-linecap/g, 'strokeLinecap');
bodyContent = bodyContent.replace(/stroke-linejoin/g, 'strokeLinejoin');
bodyContent = bodyContent.replace(/fill-rule/g, 'fillRule');
bodyContent = bodyContent.replace(/clip-rule/g, 'clipRule');
bodyContent = bodyContent.replace(/stroke-dasharray/g, 'strokeDasharray');
bodyContent = bodyContent.replace(/stroke-dashoffset/g, 'strokeDashoffset');
bodyContent = bodyContent.replace(/stroke-miterlimit/g, 'strokeMiterlimit');
bodyContent = bodyContent.replace(/patternunits/g, 'patternUnits');
bodyContent = bodyContent.replace(/viewbox/g, 'viewBox');
bodyContent = bodyContent.replace(/patternUnits/g, 'patternUnits'); // Just in case it was already camelCase
bodyContent = bodyContent.replace(/viewBox/g, 'viewBox');

// Add next/link for login and fix duplicate hrefs
bodyContent = bodyContent.replace(/<a([^>]*?)href="[^"]*"([^>]*?)data-path="launch-portal"([^>]*?)>([\s\S]*?)<\/a>/g, '<Link$1href="/login"$2$3>$4</Link>');
bodyContent = bodyContent.replace(/<a([^>]*?)data-path="launch-portal"([^>]*?)href="[^"]*"([^>]*?)>([\s\S]*?)<\/a>/g, '<Link$1href="/login"$2$3>$4</Link>');
// Also fix any regular <a> tags that should be links (e.g. href="#")
bodyContent = bodyContent.replace(/<a([^>]*?)href="#"([^>]*?)>([\s\S]*?)<\/a>/g, '<a$1href="/"$2>$3</a>');

const reactComponent = `
import Link from 'next/link';

export default function Home() {
  return (
    <div className="bg-background font-body-md text-on-surface antialiased min-h-screen flex flex-col selection:bg-secondary-container selection:text-on-secondary-container">
      ${bodyContent}
    </div>
  );
}
`;

fs.writeFileSync('src/app/page.tsx', reactComponent);
console.log('Conversion complete');
