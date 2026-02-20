export default async function SeeRecipePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  console.log(id);
  return <div>page {id}</div>;
}
