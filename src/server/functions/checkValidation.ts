import { PrismaClient } from '@prisma/client';
import { User, ValidationCode } from '@prisma/client';
type PerformValidationOpts = {
  userId: User['id'];
  codeId: ValidationCode['id'];
  code: string;
};

export default async function checkValidation(
  options: PerformValidationOpts,
  prisma: PrismaClient
) {
  const { userId, codeId, code } = options;

  const where = { id: codeId, userId, used: false, code };

  const validationCode = await prisma.validationCode.findFirstOrThrow({
    where,
    select: { code: true, used: true },
  });

  if (validationCode) {
    return await prisma.user.update({
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
  }
}
