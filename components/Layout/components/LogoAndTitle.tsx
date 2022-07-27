export const LogoAndTitle = ({ name = 'Link Dump' }) => {
  return (
    <div className="flex justify-start flex-shrink-0 px-4">
      <h1 className="text-2xl font-semibold text-indigo-700">{name}</h1>
    </div>
  );
};
