// Load environment variables first
import dotenv from 'dotenv';
dotenv.config();

// Import the AI creative service
import { aiCreativeService } from './src/lib/ai-creative-service';

async function testCreativeService() {
  console.log('Testing AI Creative Service...');
  
  try {
    // Test copy generation
    const copyResult = await aiCreativeService.generateCopy({
      type: 'copy',
      prompt: 'Write a marketing slogan for an AI platform',
      tone: 'professional',
      language: 'en'
    });
    
    console.log('✅ Copy generation test passed');
    console.log('Copy result:', JSON.stringify(copyResult, null, 2));
    
    // Test image generation
    const imageResult = await aiCreativeService.generateImage({
      type: 'image',
      prompt: 'A futuristic AI platform interface',
      style: 'photorealistic'
    });
    
    console.log('✅ Image generation test passed');
    console.log('Image result:', JSON.stringify(imageResult, null, 2));
    
  } catch (error: any) {
    console.log('❌ Creative service test failed');
    console.log('Error:', error.message);
  }
}

testCreativeService();