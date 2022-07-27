export const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    const error: Error & { info?: string; status?: number } = new Error(
      'An error occurred while fetching the data.'
    );
    error.info = await response.json();
    error.status = response.status;
    throw error;
  }
  const { data } = await response.json();
  return data;
};
