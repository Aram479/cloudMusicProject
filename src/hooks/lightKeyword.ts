/* 关键字高亮 */
export function brightenKeyword(val: string, keyword: string) {
  const Reg = new RegExp(keyword, "i");
  if (val) {
    return val.replace(Reg, `<span style="color: #409EFF;">${keyword}</span>`);
  }
}
