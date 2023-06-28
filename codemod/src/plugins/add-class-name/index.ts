function addClassName(code: string, className: string) {
  // Define the regular expression pattern to match class names
  const pattern = /class="([^"]*)"/g;

  // Find all occurrences of the class attribute using regex
  const matches = code.match(pattern);

  // Iterate over the matches and add the new class name
  if (matches) {
    matches.forEach(match => {
      const newClass = match.replace(/class="/, `class="$1 ${className} `);
      code = code.replace(match, newClass);
    });
  }

  return code;
}

// Example usage
const htmlCode = `
<div class="element">Content</div>
<span class="another-element">Text</span>
`;

const modifiedCode = addClassName(htmlCode);
console.log(modifiedCode);
