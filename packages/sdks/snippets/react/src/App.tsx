/**
 * Quickstart snippet
 * snippets/react/App.tsx
 */
import {
  Content,
  fetchOneEntry,
  isPreviewing,
  getBuilderSearchParams,
  type BuilderContent,
} from '@builder.io/sdk-react';
import { useEffect, useState } from 'react';

const BUILDER_API_KEY = 'f1a790f8c3204b3b8c5c1795aeac4660';
const MODEL_NAME = 'page';

// set whether you're using the Visual Editor,
// whether there are changes,
// and render the content if found
export default function App() {
  const [notFound, setNotFound] = useState(false);
  const [content, setContent] = useState<BuilderContent | null>(null);

  // get the page content from Builder
  useEffect(() => {
    fetchOneEntry({
      model: MODEL_NAME,
      apiKey: BUILDER_API_KEY,
      userAttributes: {
        urlPath: window.location.pathname,
      },
      options: getBuilderSearchParams(new URL(location.href).searchParams),
    })
      .then((content) => {
        if (content) {
          setContent(content);
        }
        setNotFound(!content);
      })
      .catch((err) => {
        console.log('Oops: ', err);
      });
  }, []);

  // If no page is found, return
  // a 404 page from your code.
  if (notFound && !isPreviewing()) {
    return <div>404</div>;
  }

  // return the page when found
  return (
    <Content content={content} model={MODEL_NAME} apiKey={BUILDER_API_KEY} />
  );
}
