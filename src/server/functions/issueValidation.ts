import { PrismaClient } from '@prisma/client';

export const createValidationCode = () => {
  const chars = '0123456789';
  let strToReturn = '';
  while (strToReturn.length < 6) {
    strToReturn += chars[Math.floor(Math.random() * chars.length)];
  }
  console.log(`validation code: ${strToReturn}`);
  return strToReturn;
};

async function issueValidation(phone: string, prisma: PrismaClient) {
  let user = await prisma.user.findFirst({
    where: {
      phone,
    },
    select: {
      ValidationCode: true,
      id: true,
    },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        phone,
        ValidationCode: {
          create: {
            code: createValidationCode(),
          },
        },
      },
      select: {
        ValidationCode: true,
        id: true,
      },
    });
  } else {
    if (user.ValidationCode.length < 5) {
      await prisma.validationCode.updateMany({
        where: {
          userId: user.id,
        },
        data: {
          used: true,
        },
      });
      await prisma.user.update({
        data: {
          ValidationCode: {
            create: {
              code: createValidationCode(),
            },
          },
        },
        where: {
          phone,
        },
      });
    }
  }
}

export default issueValidation;
