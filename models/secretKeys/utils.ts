import cuid from 'cuid';
import bcrypt from 'bcryptjs';

const PREFIX = '$2a$10$Qil';

export const createApiKey = async () => {
  const apiKey = cuid();
  const hash = await createHash({ apiKey });
  return {
    apiKey,
    hash,
  };
};

export const createHash = async ({ apiKey }: { apiKey: string }) => {
  const hash = await bcrypt.hash(apiKey, PREFIX + process.env.SALTY);
  return hash;
};
