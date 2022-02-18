/* 曲风榜 */
const qf = [
  "云音乐电音榜",
  "云音乐ACG榜",
  "云音乐说唱榜",
  "云音乐摇滚榜",
  "云音乐民谣榜",
  "云音乐国电榜",
  "云音乐古典榜",
  "云音乐古风榜",
  "中文DJ榜",
];
/* 全球榜 */
const qq = [
  "美国Bi",
  "UK排行",
  "日本Or",
  "法国",
  "俄罗斯top",
  "云音乐欧美",
  "云音乐日语",
  "云音乐韩语",
  "俄语榜",
  "越南语榜",
  "泰语榜",
];
/* 榜单分类器 */
export function indexOf(item: any, arr: Array<string>) {
  for (const value of arr) {
    if (item.name.indexOf(value) !== -1) {
      return item;
    }
  }
}
export { qf, qq };
