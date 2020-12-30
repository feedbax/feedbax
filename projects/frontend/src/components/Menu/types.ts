export type MenuItem = {
  key: string;

  icon?: React.ReactNode;
  content: string | React.ReactNode;

  items?: MenuItem[];
};
