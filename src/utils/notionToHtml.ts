import type { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export function notionBlockToHtml(block: BlockObjectResponse): string {
  if ('paragraph' in block) {
    const text = block.paragraph.rich_text
      .map(text => {
        let content = text.plain_text;
        if (text.annotations.bold) content = `<strong>${content}</strong>`;
        if (text.annotations.italic) content = `<em>${content}</em>`;
        if (text.annotations.strikethrough) content = `<del>${content}</del>`;
        if (text.annotations.code) content = `<code>${content}</code>`;
        if (text.href) content = `<a href="${text.href}" target="_blank" rel="noopener noreferrer">${content}</a>`;
        return content;
      })
      .join('');
    return `<p>${text}</p>`;
  }

  if ('heading_1' in block) {
    const text = block.heading_1.rich_text.map(text => text.plain_text).join('');
    return `<h1>${text}</h1>`;
  }

  if ('heading_2' in block) {
    const text = block.heading_2.rich_text.map(text => text.plain_text).join('');
    return `<h2>${text}</h2>`;
  }

  if ('heading_3' in block) {
    const text = block.heading_3.rich_text.map(text => text.plain_text).join('');
    return `<h3>${text}</h3>`;
  }

  if ('bulleted_list_item' in block) {
    const text = block.bulleted_list_item.rich_text.map(text => text.plain_text).join('');
    return `<li>${text}</li>`;
  }

  if ('numbered_list_item' in block) {
    const text = block.numbered_list_item.rich_text.map(text => text.plain_text).join('');
    return `<li>${text}</li>`;
  }

  if ('code' in block) {
    const code = block.code.rich_text.map(text => text.plain_text).join('');
    const language = block.code.language || 'plaintext';
    return `<pre><code class="language-${language}">${code}</code></pre>`;
  }

  if ('quote' in block) {
    const text = block.quote.rich_text.map(text => text.plain_text).join('');
    return `<blockquote>${text}</blockquote>`;
  }

  if ('divider' in block) {
    return '<hr>';
  }

  if ('image' in block) {
    const caption = block.image.caption?.map(text => text.plain_text).join('') || '';
    const url = block.image.type === 'external' ? block.image.external.url : block.image.file.url;
    return `<figure><img src="${url}" alt="${caption}" />${caption ? `<figcaption>${caption}</figcaption>` : ''}</figure>`;
  }

  return '';
}
