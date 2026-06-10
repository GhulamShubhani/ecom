import clsx from "clsx";
import { FunctionComponent } from "react";

interface TextProps {
  html: string;
  className?: string;
}

const Prose: FunctionComponent<TextProps> = ({ html, className }) => {
  return (
    <div
      className={clsx(
        "prose mx-auto max-w-6xl font-jakarta text-base leading-relaxed text-brand-night/80 prose-headings:mt-8 prose-headings:font-cormorant prose-headings:font-medium prose-headings:tracking-tight prose-headings:text-brand-burgundy prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg prose-a:text-brand-clay prose-a:no-underline hover:prose-a:text-brand-burgundy prose-strong:text-brand-burgundy prose-ol:mt-8 prose-ol:list-decimal prose-ol:pl-6 prose-ul:mt-8 prose-ul:list-disc prose-ul:pl-6",
        className,
      )}
      dangerouslySetInnerHTML={{ __html: html as string }}
    />
  );
};

export default Prose;
