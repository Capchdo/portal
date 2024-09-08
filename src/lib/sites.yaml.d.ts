declare const sites: {
  title: string;
  img_url?: string;
  description?: string;
  url: {
    // 简短，人类已读
    human?: string;
    // 校内
    campus: string;
    // 校外
    external: string;
  };
}[];

export default sites;
