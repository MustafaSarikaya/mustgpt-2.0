import { BlogPostContent } from './BlogPostContent';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const resolvedParams = await params;
  return {
    title: `Blog - ${resolvedParams.slug}`,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const resolvedParams = await params;
  return <BlogPostContent slug={resolvedParams.slug} />;
}
