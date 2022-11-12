export function coerceTags(tags: { value: string }): Array<string> {
  return tags.value.split(' ').map(v => v.trim()).filter(v => !!v);
}