export function LayoutTopContent({ Top, Content }) {
  return (
    <div className="flex vertical">
      <Top />
      <Content />
    </div>
  );
}
