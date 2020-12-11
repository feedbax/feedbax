export type MenuItem = {
  key: string;
  content: string | React.ReactNode;
  items?: MenuItem[];
};
