export type NavItem = {
  name: string;
  href: string;
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
};

export type User = {
  name?: string | null;
  imageUrl?: string | null;
  email?: string | null;
};
