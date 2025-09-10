// Test script to check how content is parsed and displayed
const creatives = [
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

console.log('Testing content parsing...\n');

creatives.forEach((creative, index) => {
  console.log(`Creative ${index + 1}:`);
  console.log(`  Type: ${creative.type}`);
  console.log(`  Status: ${creative.status}`);
  console.log(`  Raw content: ${creative.content}`);
  
  try {
    const parsedContent = JSON.parse(creative.content);
    console.log(`  Parsed content:`, parsedContent);
    
    if (parsedContent.imageUrl) {
      console.log(`  Image URL: ${parsedContent.imageUrl}`);
    }
    
    if (parsedContent.text) {
      console.log(`  Text content: ${parsedContent.text}`);
    }
    
    if (parsedContent.title) {
      console.log(`  Title: ${parsedContent.title}`);
    }
  } catch (error) {
    console.log(`  Parse error: ${error.message}`);
  }
  
  console.log('---\n');
});