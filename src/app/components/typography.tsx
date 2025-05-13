export function H1({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="text-3xl sm:text-[42px] font-regular tracking-[-.01em] text-left text-primary text-balance sm:text-pretty">
      {children}
    </h1>
  );
}
