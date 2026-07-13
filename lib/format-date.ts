/**
 * 記事の日付文字列を "YYYY.MM.DD" 形式にフォーマットする
 */
export function formatDate(date: string): string {
  return new Date(date)
    .toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .replaceAll('/', '.')
}
