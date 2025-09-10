const { PrismaClient } = require('@prisma/client');

async function main() {
  const prisma = new PrismaClient();
  
  try {
    const creatives = await prisma.creative.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    console.log('Creatives found:', creatives.length);
    console.log(JSON.stringify(creatives, null, 2));
  } catch (error) {
    console.error('Error fetching creatives:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();