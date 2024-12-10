'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useEffect } from 'react';
import { FilterOption } from './types';
import Filters from './components/filters';

export default function Home() {
  const [filterOptions, setFilterOptions] = useState<FilterOption[]>([]);

  const getFilters = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return [
      {
        label: 'language',
        options: ['English', 'Spanish', 'French', 'German', 'Italian'],
      },
      {
        label: 'genre',
        options: ['Literature', 'Fantasy', 'Mystery', 'Romance', 'Sci-Fi'],
      },
      {
        label: 'format',
        options: ['Paperback', 'Hardcover', 'E-Book', 'Audiobook'],
      },
    ];
  };

  useEffect(() => {
    getFilters().then((filters) => {
      setFilterOptions(filters);
    });
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Filters filterOptions={filterOptions} />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
