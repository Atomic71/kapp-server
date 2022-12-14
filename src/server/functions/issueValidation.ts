import { APP_STREAM_LOGGER } from './../logger/logger';
import { PrismaClient, User } from '@prisma/client';
import { createValidationCode } from '../../utils/auth.utils';

const getOrCreateUser = async (prisma: PrismaClient, phone: string) => {
  const user = await prisma.user.findFirst({
    where: {
      phone,
    },
    select: {
      ValidationCode: true,
      id: true,
    },
  });
  if (user) return user;
  return prisma.user.create({
    data: {
      phone,
    },
    select: {
      ValidationCode: true,
      id: true,
    },
  });
};

const assignNewCodeToUser = async (
  prisma: PrismaClient,
  userId: User['id'],
  phone: string
) => {
  await prisma.validationCode.updateMany({
    where: {
      userId,
    },
    data: {
      used: true,
    },
  });
  const code = createValidationCode();

  await prisma.user.update({
    data: {
      ValidationCode: {
        create: {
          code,
        },
      },
    },
    where: {
      phone,
    },
  });

  const { id: codeId } = await prisma.validationCode.findFirstOrThrow({
    where: { code },
    select: { id: true },
  });
  APP_STREAM_LOGGER.info(
    {
      code,
      phone,
    },
    'VALIDATION_CODE_ISSUED'
  );
  return {
    codeId,
    userId,
  };
};

async function issueValidation(phone: string, prisma: PrismaClient) {
  const user = await getOrCreateUser(prisma, phone);
  if (user.ValidationCode.length > 5) {
    throw new Error(
      'Max. number of validations reached. Please try something else'
    );
  } else {
    return await assignNewCodeToUser(prisma, user.id, phone);
  }
}

export default issueValidation;
