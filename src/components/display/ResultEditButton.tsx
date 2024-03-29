import { useAuth } from '../../state/AuthProvider';
import { useEditorStore } from '../../state/editor';

export default function ResultEditButton() {
  const { session } = useAuth();
  const { isEditing, toggleIsEditing } = useEditorStore((store) => ({
    isEditing: store.isEditing,
    toggleIsEditing: store.toggleIsEditing,
  }));

  if (!session) return <></>;

  return (
    <button
      type='button'
      onClick={toggleIsEditing}
      className='absolute px-4 py-2 text-sm font-bold text-blue-500 transition-colors rounded-md top-2 right-2 hover:bg-blue-200 hover:text-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'
    >
      {isEditing ? 'Exit Editor' : 'Enter Editor'}
    </button>
  );
}
