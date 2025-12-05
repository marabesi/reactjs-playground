'use server'

import createPersistence from "@/persistence/factory";

const repository = createPersistence();

export default async function ItemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await repository.getItemById(id);

  if (!item) {
    return <div>Item not found</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Item Details</h1>
      <div className="border rounded-lg p-4" data-testid="item-details">
        <p><strong>ID:</strong> {item.id}</p>
        <p><strong>Name:</strong> {item.name}</p>
        <p><strong>Enabled:</strong> {item.isEnabled ? 'Yes' : 'No'}</p>
        {item.createdAt && (
          <p><strong>Created:</strong> {new Date(item.createdAt).toLocaleString()}</p>
        )}
      </div>
    </div>
  );
}