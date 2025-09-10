import { config } from 'dotenv'
config({ path: '.env' })

import { huggingFaceService } from './src/lib/huggingface-service'

console.log('Hugging Face API Key:', process.env.HUGGING_FACE_API_KEY ? 'Loaded' : 'Not loaded')
console.log('API Key value:', process.env.HUGGING_FACE_API_KEY || 'undefined')

async function testHuggingFace() {
  console.log('Testing Hugging Face API with new key...')
  
  try {
    // Test text generation
    console.log('Testing text generation...')
    const textResult = await huggingFaceService.generateMarketingCopy('Write a short marketing slogan for a tech product')
    console.log('Text generation result:', JSON.stringify(textResult, null, 2))
    
    console.log('Hugging Face API tests completed successfully!')
  } catch (error) {
    console.error('Hugging Face API test failed:', error)
  }
}

if (process.env.HUGGING_FACE_API_KEY) {
  testHuggingFace()
} else {
  console.log('No Hugging Face API key found, skipping tests')
}