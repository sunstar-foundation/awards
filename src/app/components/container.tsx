export function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen p-4 pt-8 sm:pt-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] flex justify-center">
      <main className="flex flex-col gap-[30px] row-start-2 sm:items-start w-full max-w-[560px]">
        {children}
      </main>
    </div>
  );
}
