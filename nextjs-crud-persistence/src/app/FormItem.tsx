'use client'
import {Item} from "@/app/types";
import {useState} from "react";

export function FormItem(props: { formAction: (formData: FormData) => Promise<void>, item?: Item }) {
  const [data, setData] = useState<Item | undefined>(props.item);
  const onSubmit = async (formData: FormData) => {
      await props.formAction(formData);
      setData(undefined);
  }
  return (
    <form action={onSubmit} className="mb-6 p-4 border rounded-lg" data-testid="form-item">
      {data?.id && (
        <input type="hidden" name="id" value={data.id} />
      )}
      <div className="mb-4">
        <label htmlFor="name" className="block mb-2 font-medium">
          Name:
        </label>
        <input
          data-testid="name"
          type="text"
          id="name"
          name="name"
          required
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={data?.name || ''}
          onChange={event => setData({ ...data, name: event.target.value } as Item)}
        />
      </div>

      <div className="mb-4 flex items-center">
        <input
          data-testid="is_enabled"
          type="checkbox"
          id="isEnabled"
          name="isEnabled"
          className="w-4 h-4 mr-2"
          checked={!!data?.isEnabled}
          onChange={event => setData({ ...data, isEnabled: event.target.checked } as Item)}
        />
        <label htmlFor="isEnabled" className="font-medium">
          Is Enabled
        </label>
      </div>

      <button
        data-testid="submit"
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Submit
      </button>
    </form>
  )
}
