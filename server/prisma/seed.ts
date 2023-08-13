import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data:{
      name: 'John Doe',
      email:'johndoe@gmail.com',
      avatarUrl: 'https://github.com/parazinshow.png'
    }
  })

  const pool = await prisma.pool.create({
    data:{
      title: 'Example Pool',
      code:'Bol123',
      ownerID: user.id,

      participants:{
        create:{
          userId: user.id
        }
      }
    }
  })

  await prisma.game.create({
    data:{
      date: '2023-09-20T12:00:00.214Z',
      firstTeamCountryCode: 'DE',
      secondTeamCountryCode: 'BR'
    }
  })

  await prisma.game.create({
    data:{
      date: '2023-09-25T12:00:00.214Z',
      firstTeamCountryCode: 'AR',
      secondTeamCountryCode: 'BR',

      guesses:{
        create:{
          firstTeamPoints: 1,
          secondTeamPoints: 2,
          participant:{
            connect: {
              userId_poolId:{
                userId: user.id,
                poolId: pool.id
              }
            }
          }
        }
      }
    }
  })
}

main()