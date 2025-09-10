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
    console.log('Text generation successful!')
    console.log('Text result length:', typeof textResult === 'string' ? textResult.length : JSON.stringify(textResult).length)
    
    // Test sentiment analysis
    console.log('Testing sentiment analysis...')
    const sentimentResult = await huggingFaceService.analyzeSentiment('I love this product!')
    console.log('Sentiment analysis successful!')
    console.log('Sentiment result:', JSON.stringify(sentimentResult, null, 2))
    
    console.log('Hugging Face API tests completed successfully!')
    return true
  } catch (error) {
    console.error('Hugging Face API test failed:', error)
    return false
  }
}

async function main() {
  if (process.env.HUGGING_FACE_API_KEY) {
    const success = await testHuggingFace()
    if (success) {
      console.log('✅ Hugging Face API is working correctly with the new key!')
    } else {
      console.log('❌ Hugging Face API test failed. Falling back to mock implementations.')
    }
  } else {
    console.log('No Hugging Face API key found, using mock implementations.')
  }
}

main()