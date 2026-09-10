import { Children, isValidElement, type ReactNode } from 'react';
import ReactMarkdown, { defaultUrlTransform } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Components } from 'react-markdown';

function urlTransform(url: string): string {
  if (url.startsWith('data:') || url.startsWith('blob:')) return url;
  return defaultUrlTransform(url);
}

function textFromChildren(children: ReactNode): string {
  return Children.toArray(children)
    .map((child) => {
      if (typeof child === 'string' || typeof child === 'number') return String(child);
      if (isValidElement(child)) return textFromChildren(child.props.children);
      return '';
    })
    .join('');
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const components: Components = {
  p({ children }) {
    const items = Children.toArray(children);
    if (items.length === 1 && isValidElement(items[0]) && items[0].type === 'figure') {
      return items[0];
    }
    return <p>{children}</p>;
  },
  h2({ children }) {
    const id = slugify(textFromChildren(children));
    return <h2 id={id}>{children}</h2>;
  },
  h3({ children }) {
    const id = slugify(textFromChildren(children));
    return <h3 id={id}>{children}</h3>;
  },
  a({ href, children }) {
    const external = Boolean(href && /^https?:\/\//.test(href));
    return (
      <a
        href={href}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    );
  },
  img({ src, alt, title }) {
    return (
      <figure>
        <img src={src} alt={alt ?? ''} loading="lazy" decoding="async" />
        {title ? <figcaption>{title}</figcaption> : null}
      </figure>
    );
  },
  pre({ children }) {
    return <pre>{children}</pre>;
  },
};

type MarkdownContentProps = {
  content: string;
};

const MarkdownContent = ({ content }: MarkdownContentProps) => (
  <div className="blog-prose">
    <ReactMarkdown remarkPlugins={[remarkGfm]} urlTransform={urlTransform} components={components}>
      {content}
    </ReactMarkdown>
  </div>
);

export default MarkdownContent;
