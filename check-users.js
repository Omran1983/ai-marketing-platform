const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function checkUsers() {
  try {
    console.log('🔍 Checking users in database...')
    
    const users = await prisma.user.findMany({
      include: {
        tenant: true
      }
    })
    
    console.log(`Found ${users.length} users:`)
    users.forEach(user => {
      console.log(`- ${user.email} (${user.role}) - Active: ${user.isActive}`)
    })
    
    const adminUser = await prisma.user.findUnique({
      where: { email: 'admin@example.com' }
    })
    
    const viewerUser = await prisma.user.findUnique({
      where: { email: 'viewer@example.com' }
    })
    
    console.log('\n📧 Demo users status:')
    console.log(`Admin (admin@example.com): ${adminUser ? '✅ EXISTS' : '❌ NOT FOUND'}`)
    console.log(`Viewer (viewer@example.com): ${viewerUser ? '✅ EXISTS' : '❌ NOT FOUND'}`)
    
  } catch (error) {
    console.error('Error checking users:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkUsers()