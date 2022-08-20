import { PrismaClient } from '@prisma/client';
import { User } from '@prisma/client';
type PerformValidationOpts = {
  userId: User['id'];
  code: string;
};

const markUserAsValidated = (prisma: PrismaClient, userId: User['id']) => {
  return prisma.user.update({
    data: {
      validated: true,
      ValidationCode: {
        deleteMany: {
          userId,
        },
      },
      role: 'MEMBER',
    },
    where: { id: userId },
  });
};

export default async function checkValidation(
  options: PerformValidationOpts,
  prisma: PrismaClient
) {
  const { userId, code } = options;

  const where = { userId, used: false, code };

  const validationCode = await prisma.validationCode.findFirstOrThrow({
    where,
    select: { code: true, used: true },
  });

  if (validationCode) {
    return await markUserAsValidated(prisma, userId);
  }
}
