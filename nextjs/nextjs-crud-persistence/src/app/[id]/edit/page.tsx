'use server'

import {Item} from "@/app/types";
import {FormItem} from "@/app/FormItem";
import {redirect} from "next/navigation";
import createPersistence from "@/persistence/factory";

const repository = createPersistence();

async function updateItem(formData: FormData) {
  'use server';
  const id = formData.get('id') as string;
  const name = formData.get('name') as string;
  const isEnabled = !!formData.get('isEnabled');

  try {
    await repository.updateItem({id, name, isEnabled} as Item)
    const { revalidatePath } = await import('next/cache');
    revalidatePath('/')
    redirect('/');
  } catch (error) {
    console.error('Error updating item in DynamoDB:', error);
    throw error;
  }
}

export default async function ItemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await repository.getItemById(id);

  if (!item) {
    return <div>Item not found</div>;
  }

  return (
    <FormItem formAction={updateItem} item={item} />
  );
}