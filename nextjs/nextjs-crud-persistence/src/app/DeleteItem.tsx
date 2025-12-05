'use client';

import {Item} from "@/app/types";

export function DeleteItem(props: { item: Item; deleteAction: (formData: FormData) => void }) {
  return (
    <form action={props.deleteAction}>
      <input type="hidden" name="id" value={props.item.id} />
      <button
        data-testid={`delete-${props.item.name}`}
        type="submit"
        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
      >
        Delete
      </button>
    </form>
  );
}