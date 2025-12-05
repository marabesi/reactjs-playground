'use server'
import {DeleteItem} from "@/app/DeleteItem";
import {FormItem} from "@/app/FormItem";
import {Item} from "@/app/types";
import createPersistence from "@/persistence/factory";

const repository = createPersistence();

async function createItem(formData: FormData) {
  'use server';

  const name = formData.get('name') as string;
  const isEnabled = !!formData.get('isEnabled');

  const item: Item = {
    id: '',
    name: name,
    isEnabled: isEnabled,
    createdAt: new Date().toISOString(),
  };

  await repository.createItem(item);

  const { revalidatePath } = await import('next/cache');
  revalidatePath('/');
}

export async function deleteItem(formData: FormData) {
  'use server';
  await repository.deleteItem(formData.get('id') as string);
  const { revalidatePath } = await import('next/cache');
  revalidatePath('/');
}

export default async function Home() {
  const items = await repository.getTableEntries();

  return (
    <>
      <FormItem formAction={createItem} />
      <table width="100%">
        <thead>
        <tr>
          <th align="left" className="p-2">ID</th>
          <th align="left" className="p-2">Name</th>
          <th align="left" className="p-2">Is Enabled</th>
          <th align="left" className="p-2">Created At</th>
          <th align="left" className="p-2">Updated At</th>
          <th align="left" className="p-2">Actions</th>
        </tr>
        </thead>
        <tbody>
        {items.map((item) => (
          <tr key={item.id} className="border-b">
            <td align="left" className="p-2">{item.id}</td>
            <td align="left" className="p-2">{item.name}</td>
            <td align="left" className="p-2">{item.isEnabled ? "yes": "no"}</td>
            <td align="left" className="p-2">{item.createdAt}</td>
            <td align="left" className="p-2">{item.updatedAt}</td>
            <td align="left" className="p-2">
              <div className="flex items-center space-x-5">
                <a href={`/${item.id}/edit`} data-testid={`edit-${item.name}`} className="text-blue-500 hover:underline">Edit</a>
                <a href={`/${item.id}/view`} data-testid={`view-${item.name}`} className="text-blue-500 hover:underline">View</a>
                <DeleteItem item={item} deleteAction={deleteItem} />
              </div>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </>
  );
}
