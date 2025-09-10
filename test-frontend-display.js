// Test script to simulate frontend display logic
const rawData = [
  {
    "id": "cmfbj292300082q20yyfooenn",
    "type": "COPY",
    "content": "{\"title\":\"Track Your Progress\",\"description\":\"Monitor your health and fitness goals with precision tracking technology.\",\"cta\":\"Get Yours Today\"}",
    "prompt": "Write compelling copy for fitness tracker campaign",
    "status": "COMPLETED",
    "tenantId": "cmf4eo3wz00002q70tsi9jxj5",
    "createdAt": "2025-09-08T19:41:30.843Z"
  },
  {
    "id": "cmfbj291p00072q20eyaee28e",
    "type": "IMAGE",
    "content": "{\"imageUrl\":\"https://picsum.photos/800/600?random=10\",\"title\":\"Experience Pure Sound\",\"description\":\"Discover the ultimate audio experience with our premium wireless headphones.\",\"cta\":\"Shop Now\"}",
    "prompt": "Create an engaging ad for premium wireless headphones",
    "status": "COMPLETED",
    "tenantId": "cmf4eo3wz00002q70tsi9jxj5",
    "createdAt": "2025-09-08T19:41:30.830Z"
  }
];

// Simulate API response parsing (like in the GET route)
const creativesWithParsedContent = rawData.map(creative => {
  let content = {};
  try {
    content = JSON.parse(creative.content);
  } catch (parseError) {
    // If parsing fails, use the content as-is or provide a default
    content = typeof creative.content === 'string' ? { text: creative.content } : {};
  }
  
  return {
    ...creative,
    content
  };
});

console.log('Parsed creatives for frontend:');
console.log(JSON.stringify(creativesWithParsedContent, null, 2));

// Simulate how the frontend would display this data
console.log('\n--- Frontend Display Simulation ---\n');

creativesWithParsedContent.forEach((creative, index) => {
  console.log(`Creative ${index + 1}:`);
  console.log(`  Type: ${creative.type}`);
  console.log(`  Status: ${creative.status}`);
  
  if (creative.content.imageUrl) {
    console.log(`  Image URL: ${creative.content.imageUrl}`);
    console.log(`  Display: [Image would be shown here]`);
  }
  
  if (creative.content.title) {
    console.log(`  Title: ${creative.content.title}`);
  }
  
  if (creative.content.description) {
    console.log(`  Description: ${creative.content.description}`);
  }
  
  if (creative.content.text) {
    console.log(`  Text: ${creative.content.text}`);
  }
  
  if (creative.prompt) {
    console.log(`  Prompt: ${creative.prompt}`);
  }
  
  console.log('---\n');
});